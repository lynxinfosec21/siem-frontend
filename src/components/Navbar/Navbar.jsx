import React from 'react';
import './Navbar.css';
import wIcon from '../../assets/w-icon.PNG';
import { FaQuestionCircle } from 'react-icons/fa';

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <button className="hamburger">&#9776;</button>
        <img src={wIcon} alt="w-icon" className="w-icon" />
        <div className="divider"></div>
        <button className="discover-btn">Discover</button>
      </div>

      <div className="navbar-right">
        <span className="nav-link">New</span>
        <span className="nav-link">Save</span>
        <span className="nav-link">Open</span>
        <span className="nav-link">Share</span>
        <span className="nav-link">Reporting</span>
        <span className="nav-link">Inspect</span>

        <div className="divider"></div>

         <div class="circle">a</div>

        <div className="divider"></div>

        <FaQuestionCircle className="help-icon" />
      </div>
    </div>
  );
};

export default Navbar;
