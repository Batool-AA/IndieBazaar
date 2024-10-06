import React from 'react';
import AboutUsBox from '../../components/aboutusboxes/aboutusbox.jsx'; // Ensure the path is correct
import './aboutus.css';

const AboutUs = () => {
  const handleSetUpBusinessClick = () => {
    document.getElementById('layer').scrollIntoView({ behavior: 'smooth' });
  };

  const handleExploreProductsClick = () => {
    console.log("Explore Products clicked");
  };

  return (
    <div className="about-us">
      <h1>About Us</h1>
      <AboutUsBox />
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
