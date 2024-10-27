import React, { useState } from 'react';
import './businesscat.css';

const categories = ["Food", "Decor", "Clothes", "Accessories", "Other"];

const StepThreeBusinessCategory = ({ onNext }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const toggleCategory = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleNext = () => {
    if (selectedCategories.length > 0) {
      onNext();
    }
  };

  return (
    <div className="step-container">
      <p className="prompt">Select your business category.</p>
      <div className="category-buttons">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => toggleCategory(category)}
            className={selectedCategories.includes(category) ? 'selected' : ''}
          >
            {category}
          </button>
        ))}
      </div>
      <button className="next-button" onClick={handleNext}>Next</button>
    </div>
  );
};

export default StepThreeBusinessCategory;
