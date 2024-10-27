import React, { useState } from 'react';
import './businessname.css';

const StepOneBusinessName = ({ onNext }) => {
  const [businessName, setBusinessName] = useState('');

  const handleNext = () => {
    if (businessName.trim()) {
      onNext();
    }
  };

  return (
    <div className="step-container">
      <p className="prompt">What's the name of your business?</p>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter business name"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
        />
        <button className="next-button" onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default StepOneBusinessName;
