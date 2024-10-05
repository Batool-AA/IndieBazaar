import React from 'react';
import './categoriesbar.css';

const CategoriesBar = ({ categories, onSelectCategory }) => {
  return (
    <div className="categories-bar">
      {categories.map((category) => (
        <button key={category} className="category-button" onClick={() => onSelectCategory(category)}>
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoriesBar;
