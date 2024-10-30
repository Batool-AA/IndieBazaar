import React, { useState } from 'react';
import './businessdesc.css';
import { FaInstagram, FaTwitter, FaFacebook } from 'react-icons/fa';

const StepTwoBusinessDescription = ({ onNext, businessDescription, setBusinessDescription }) => {
  const [instagram, setInstagram] = useState('');
  const [twitter, setTwitter] = useState('');
  const [facebook, setFacebook] = useState('');

  const handleNext = async () => {
    if (businessDescription.trim()) {
      setBusinessDescription(businessDescription);
    }
    if (businessDescription.length > 0) {
      onNext();
    } else {
      alert("Please enter some description");
    }
  };

  return (
    <div className="step-container">
      <p className="prompt">Tell us about your business.</p>
      <div className="input-container">
        <textarea
          placeholder="Enter business description"
          value={businessDescription}
          onChange={(e) => setBusinessDescription(e.target.value)}
        />
        <div className="social-media-container">
          <div className="social-media-field">
            <FaInstagram className="social-icon" />
            <input
              type="url"
              placeholder="Instagram URL"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
            />
          </div>
          <div className="social-media-field">
            <FaTwitter className="social-icon" />
            <input
              type="url"
              placeholder="Twitter URL"
              value={twitter}
              onChange={(e) => setTwitter(e.target.value)}
            />
          </div>
          <div className="social-media-field">
            <FaFacebook className="social-icon" />
            <input
              type="url"
              placeholder="Facebook URL"
              value={facebook}
              onChange={(e) => setFacebook(e.target.value)}
            />
          </div>
        </div>
        <button className="next-button" onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default StepTwoBusinessDescription;
