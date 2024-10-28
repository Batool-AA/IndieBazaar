import React, { useState } from 'react';
import './businessdesc.css';
import { getFirestore } from 'firebase/firestore';
import { addDoc } from 'firebase/firestore';

const StepTwoBusinessDescription = ({ onNext, businessDescription, setBusinessDescription, categoriesRef }) => {
  const handleNext = async () => {
    if (businessDescription.trim()) {
     setBusinessDescription(businessDescription);
    }
    onNext();
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
