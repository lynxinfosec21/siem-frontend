import React from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBox = () => (
  <div className="box large-box">
    <div className="box-content">
      <FaSearch className="icon" />
      <div className="divider" />
      <input className="input-field" type="text" placeholder="Search" />
      <div className="divider" />
      <span className="box-heading">DQL</span>
    </div>
  </div>
);

export default SearchBox; 