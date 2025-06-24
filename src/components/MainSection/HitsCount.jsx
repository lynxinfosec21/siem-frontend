import React from 'react';

const HitsCount = ({ hitsCount }) => (
  <div className="hits-container">
    <span className="hits-number">{hitsCount} </span>
    <span className="hits-label"> hits</span>
  </div>
);

export default HitsCount; 