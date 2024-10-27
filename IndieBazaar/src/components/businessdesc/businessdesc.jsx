import React, { useState } from 'react';
import './businessdesc.css';

const StepTwoBusinessDescription = ({ onNext }) => {
  const [businessDescription, setBusinessDescription] = useState('');

  const handleNext = () => {
    if (businessDescription.trim()) {
      onNext();
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
        <button className="next-button" onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default StepTwoBusinessDescription;
