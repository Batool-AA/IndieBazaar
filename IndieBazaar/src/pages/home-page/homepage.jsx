import React from 'react';
import HomeNavbar from '../../components/homenavbar/homenavbar.jsx';
import AboutUs from '../../components/about-us/aboutus.jsx'
import ContactUs from '../../components/contactus/contactus.jsx';
import './homepage.css';
import BusinessBanner from '../../components/business-banner/business-banner.jsx';

const HomePage = () => {
    return (
      <div className="homepage-container">
        <div className="top-section">
          <HomeNavbar />
          <BusinessBanner title={"IndieBazaar"} slogan={"Connecting Local Sellers, Empowering Buyers"} path={"/store"}/>
        </div>  
        <div id="about-us">
          <AboutUs /> 
        </div>
        <div id="contact">
          <ContactUs/>
        </div>
      </div>
    );
  };
  
  export default HomePage;