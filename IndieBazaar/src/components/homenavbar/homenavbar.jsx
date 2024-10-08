import React from 'react';
import { useNavigate } from 'react-router-dom';

import './homenavbar.css';

const HomeNavbar = () => {
  const handleAboutClick = () => {
    document.getElementById('about-us').scrollIntoView({ behavior: 'smooth' });
  };

  const handleContactClick = () => {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  };

  const navigate = useNavigate();
  const handleBuySellClick = () => {
    navigate('/login');
  };

  const handleFindinStore = () => {
    navigate('/store');
  }


  return (
    <div className="navbar">
      <div className="nav-left">
        <span onClick={handleAboutClick}>About us</span> 
        <span onClick={handleContactClick}>Contact</span> 
      </div>
      <div className="nav-right">
        <span onClick={handleBuySellClick}>Buy</span>
        <span onClick={handleBuySellClick}>Sell</span>
        <span onClick={handleFindinStore}>Find in Store</span>
      </div>
    </div>
  );
};

export default HomeNavbar;
