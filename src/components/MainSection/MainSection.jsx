import React, { useState, useRef, useEffect } from 'react';
import './MainSection.css';
import { FaSearch, FaCalendarAlt, FaSyncAlt, FaFilter, FaPlusCircle } from 'react-icons/fa';
import MyBarChart from '../BarChart/BarChart';
import AlertLogs from '../AlertLogs/AlertLogs';

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
        {/* First Box */}
        <div className="box large-box">
          <div className="box-content">
            <FaSearch className="icon" />
            <div className="divider" />
            <input className="input-field" type="text" placeholder="Search" />
            <div className="divider" />
            <span className="box-heading">DQL</span>
          </div>
        </div>

        {/* Second Box with Calendar */}
        <div className="box large-box">
          <div className="box-content">
            <div className="calendar-wrapper">
              <div
                className="calendar-icon-trigger"
                onClick={() => setShowCalendar(!showCalendar)}
              >
                <FaCalendarAlt className="icon blue" />
              </div>

              {showCalendar && (
                <div ref={calendarRef} className="calendar-popup">
                  <div className="calendar-title">Quick select</div>
                  <div className="calendar-controls">
                    <select
                      className="calendar-dropdown-select"
                      value={timeDirection}
                      onChange={(e) => setTimeDirection(e.target.value)}
                    >
                      <option>Last</option>
                      <option>Next</option>
                    </select>
                    <input
                      type="number"
                      min="1"
                      value={timeValue}
                      onChange={(e) => setTimeValue(e.target.value)}
                      className="calendar-input-number"
                    />
                    <select
                      className="calendar-dropdown-select"
                      value={timeUnit}
                      onChange={(e) => setTimeUnit(e.target.value)}
                    >
                      <option>Seconds</option>
                      <option>Minutes</option>
                      <option>Hours</option>
                      <option>Days</option>
                      <option>Weeks</option>
                      <option>Months</option>
                      <option>Years</option>
                    </select>
                    <button className="calendar-apply-button" onClick={handleApply}>
                      Apply
                    </button>
                  </div>

                  <div className="calendar-subtitle">Presets</div>
                  <div className="calendar-grid">
                    <span>Today</span>
                    <span>Last 24 hours</span>
                    <span>This week</span>
                    <span>Last 7 days</span>
                    <span>Last 30 minutes</span>
                    <span>Last 30 days</span>
                    <span>Last 1 year</span>
                    <span>Last 90 days</span>
                  </div>

                  <div className="calendar-recent">Recently used: Last 30 days</div>
                </div>
              )}
            </div>

            <div className="divider" />
            <input
              className="input-field"
              type="text"
              value={selectedLabel}
              readOnly
            />
            <span className="box-heading blue-text">Show Dates</span>
          </div>
        </div>

        {/* Refresh Box */}
        <div className="box small-box blue-box" onClick={handleRefresh}>
          <FaSyncAlt className="icon blue" />
          <span className="refresh-text">Refresh</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="content">
        <div className="add-filter-section">
          <FaFilter className="filter-icon" />
          <FaPlusCircle className="plus-icon" />
          <span className="add-filter-text">Add filter</span>
        </div>

        <div className="Main-section">
          <div className="hits-container">
            <span className="hits-number">{hitsCount} </span>
            <span className="hits-label"> hits</span>
          </div>

          <div className="date-row">
            <h5 className="date-range">{dateRange}</h5>
            <select className="auto-dropdown">
              <option value="auto">auto</option>
            </select>
          </div>

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
