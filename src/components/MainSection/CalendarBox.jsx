import React from 'react';
import { FaCalendarAlt } from 'react-icons/fa';

const CalendarBox = ({
  showCalendar,
  setShowCalendar,
  timeDirection,
  setTimeDirection,
  timeValue,
  setTimeValue,
  timeUnit,
  setTimeUnit,
  selectedLabel,
  setSelectedLabel,
  handleApply,
  calendarRef
}) => (
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
);

export default CalendarBox; 