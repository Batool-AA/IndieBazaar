import React from 'react';
import './homenavbar.css';

const HomeNavbar = () => {
  return (
    <div className="navbar">
      <div className="nav-left">
        <span>About us</span>
        <span>Contact</span>
      </div>
      <div className="nav-right">
        <span>Buy</span>
        <span>Sell</span>
        <span>Find in Store</span>
      </div>
    </div>
  );
};

export default HomeNavbar;
