import React, { useState } from 'react';
import { getFirestore } from 'firebase/firestore';
import { addDoc } from 'firebase/firestore';
import './businessname.css';

const StepOneBusinessName = ({ onNext }) => {
  const db = getFirestore();

  const [businessName, setBusinessName] = useState('');

 
  


  const handleNext = () => {
    // if (businessName.trim()) {
      const categoryDoc = addDoc(categoriesRef, {
        name: businessName,
      });
      onNext();

    // }
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
