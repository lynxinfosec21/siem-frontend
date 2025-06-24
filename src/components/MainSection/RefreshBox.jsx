import React from 'react';
import { FaSyncAlt } from 'react-icons/fa';

const RefreshBox = ({ handleRefresh }) => (
  <div className="box small-box blue-box" onClick={handleRefresh}>
    <FaSyncAlt className="icon blue" />
    <span className="refresh-text">Refresh</span>
  </div>
);

export default RefreshBox; 