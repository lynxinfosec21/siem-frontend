import React, { useState, useRef, useEffect } from 'react';
import './MainSection.css';
import { FaSearch, FaCalendarAlt, FaSyncAlt, FaFilter, FaPlusCircle } from 'react-icons/fa';
import MyBarChart from '../BarChart/BarChart';
import AlertLogs from '../AlertLogs/AlertLogs';
import SearchBox from './SearchBox';
import CalendarBox from './CalendarBox';
import RefreshBox from './RefreshBox';
import HitsCount from './HitsCount';
import DateRange from './DateRange';

const MainSection = ({ logs = [] }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [timeDirection, setTimeDirection] = useState('Last');
  const [timeValue, setTimeValue] = useState(24);
  const [timeUnit, setTimeUnit] = useState('Hours');
  const [selectedLabel, setSelectedLabel] = useState('Last 24 Hours');
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const calendarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (calendarRef.current && !calendarRef.current.contains(e.target)) {
        setShowCalendar(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleApply = () => {
    const label = `${timeDirection} ${timeValue} ${timeUnit}`;
    setSelectedLabel(label);
    setShowCalendar(false);
  };

  const handleRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  // Map logs to bar chart data (group by hour for example)
  const barChartData = (() => {
    if (!logs.length) return [];
    // Group logs by hour (or other time unit)
    const buckets = {};
    logs.forEach(log => {
      if (log._source && log._source.timestamp) {
        const date = new Date(log._source.timestamp);
        // Format as 'HH:00' for hour buckets
        const hour = date.getHours().toString().padStart(2, '0') + ':00';
        buckets[hour] = (buckets[hour] || 0) + 1;
      }
    });
    return Object.entries(buckets).map(([timestamp, count]) => ({ timestamp, count }));
  })();

  // Hits count
  const hitsCount = logs.length;

  // Date range
  let minDate = null, maxDate = null;
  logs.forEach(log => {
    if (log._source && log._source.timestamp) {
      const date = new Date(log._source.timestamp);
      if (!minDate || date < minDate) minDate = date;
      if (!maxDate || date > maxDate) maxDate = date;
    }
  });
  const dateRange = minDate && maxDate
    ? `${minDate.toLocaleString()} - ${maxDate.toLocaleString()}`
    : 'No data';

  return (
    <div className="main-section">
      <div className="top-boxes">
        <SearchBox />
        <CalendarBox
          showCalendar={showCalendar}
          setShowCalendar={setShowCalendar}
          timeDirection={timeDirection}
          setTimeDirection={setTimeDirection}
          timeValue={timeValue}
          setTimeValue={setTimeValue}
          timeUnit={timeUnit}
          setTimeUnit={setTimeUnit}
          selectedLabel={selectedLabel}
          setSelectedLabel={setSelectedLabel}
          handleApply={handleApply}
          calendarRef={calendarRef}
        />
        <RefreshBox handleRefresh={handleRefresh} />
      </div>
      {/* Content Section */}
      <div className="content">
        <div className="add-filter-section">
          <FaFilter className="filter-icon" />
          <FaPlusCircle className="plus-icon" />
          <span className="add-filter-text">Add filter</span>
        </div>
        <div className="Main-section">
          <HitsCount hitsCount={hitsCount} />
          <DateRange dateRange={dateRange} />
          <MyBarChart data={barChartData} />
          {/* AlertLogs Component */}
          <div className="mt-6">
            <AlertLogs refreshTrigger={refreshTrigger} maxHeight="24rem" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainSection;
