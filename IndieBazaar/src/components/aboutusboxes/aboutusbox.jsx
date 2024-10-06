import React from 'react';
import './aboutusbox.css';

const AboutUsBox = () => {
  return (
    <div className="about-us-section">
      <div className="box-wrapper">
        <div className="about-us-box left-box">
          <h3>Our Mission</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>

        <div className="about-us-box right-box">
          <h3>Our Vision</h3>
          <p>Phasellus finibus risus ut ante eleifend malesuada.</p>
        </div>
      </div>

      <div className="about-us-box bottom-box">
        <h3>Our Values</h3>
        <p>Vestibulum luctus eros eget lectus bibendum, a bibendum metus dapibus.</p>
      </div>
    </div>
  );
};

export default AboutUsBox;
