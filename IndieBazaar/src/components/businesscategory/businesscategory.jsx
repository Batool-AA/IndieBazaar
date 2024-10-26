import React, { useState } from 'react';

const CategorySelector = ({ selectedCategory, onSelectCategory }) => {
  const categories = ['Food', 'Decor', 'Clothes', 'Accessories', 'Other'];

  return (
    <div className="category-selector">
      {categories.map((category) => (
        <button
          key={category}
          className={selectedCategory === category ? 'active' : ''}
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategorySelector;