import React, { useState } from 'react';
import './businessname.css';

const StepOneBusinessName = ({ onNext, businessName, setBusinessName }) => {
  const handleNext = async () => {
    if (businessName.trim()) {
      setBusinessName(businessName);
    }
    if (businessName.length > 0){
      onNext();
    }
    else{
      alert("Please enter business name");
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
