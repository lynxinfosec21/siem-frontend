import React from 'react';

const DateRange = ({ dateRange }) => (
  <div className="date-row">
    <h5 className="date-range">{dateRange}</h5>
    <select className="auto-dropdown">
      <option value="auto">auto</option>
    </select>
  </div>
);

export default DateRange; 