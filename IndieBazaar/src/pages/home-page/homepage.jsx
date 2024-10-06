import React from 'react';
import HomeNavbar from '../../components/homenavbar/homenavbar.jsx';
import Title from '../../components/title/title.jsx';
import Explore from '../../components/explore-button/explore.jsx';
import AboutUs from '../../components/about-us/aboutus.jsx'
import Layer from '../../components/layers/layer.jsx'
import ContactUs from '../../components/contactus/contactus.jsx';
import './homepage.css';

const HomePage = () => {
    return (
      <div className="homepage-container">
        <div className="top-section">
          <Title />
          <HomeNavbar />
          <Explore />
        </div>
        <div id="about-us">
          <AboutUs />
          <div id="layer">
          <Layer />
        </div>
        <ContactUs/>
        </div>
        
      </div>
    );
  };
  
  export default HomePage;