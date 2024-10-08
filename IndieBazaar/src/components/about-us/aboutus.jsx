import React from 'react';
import { useNavigate } from 'react-router-dom';
import AboutUsBox from '../../components/aboutusboxes/aboutusbox.jsx'; // Ensure the path is correct
import './aboutus.css';
import logo from  '../../assets/logo-indiebazaar.png'; // Ensure the path is correct


const AboutUs = () => {
  const navigate = useNavigate();
  const handleSetUpBusinessClick = () => {
    navigate('/login');
  };

  const handleExploreProductsClick = () => {
    navigate('/store');
  };

  return (
    <div className="about-us-container">
      <div class="big-text">
        <span class="word-1">SELL</span>
        <img src={logo} alt="Logo" class="indiebazaar-logo" />
        <span class="word-2">SHOP</span>
        <span class="word-3">ENJOY</span>
      </div>

      <div class="info-box info-box-1">
        <p><strong>Empowering Local Businesses</strong> <br/>
        Bridging the gap between small businesses and the digital marketplace.</p>
      </div>

      <div className="info-box info-box-2">
        <p><strong>Supporting Local Entrepreneurs</strong><br />
        Every purchase helps local artisans and vendors grow their brand and reputation.</p>
        </div>

        <div className="info-box info-box-3">
          <p><strong>Curated Marketplace for Buyers</strong><br />
          Discover authentic, locally-made products that support Pakistan's small business ecosystem.</p>
        </div>

        <div className="info-box info-box-4">
          <p><strong>Driving Digital Transformation</strong><br />
          Enabling small businesses to thrive in the modern economy through technology.</p>
        </div>

      <div className="button-container">
        <button className="setup-button" onClick={handleSetUpBusinessClick}>
          Set Up Your Business
        </button>
        <button className="explore-button-aboutus" onClick={handleExploreProductsClick}>
          Explore Products
        </button>
      </div>


    </div>
  );
};

export default AboutUs;



 