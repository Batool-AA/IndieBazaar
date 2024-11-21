import './filterbox.css'; 
import React from 'react';

const FilterBox = ({ options, selectedCategories, onFilterChange }) => {

    const handleCheckboxChange = (category) => (e) => {
        onFilterChange(category, e.target.checked);
    };

    return (
        <div className="filter-box">
            <h3>Choose Category</h3>
            <div className="filter-checkbox-container">
                {options.map((category) => (
                    <div key={category} className="filter-checkbox-item"> 
                        <label>
                            <input
                                type="checkbox"
                                value={category}
                                checked={selectedCategories.includes(category)}
                                onChange={handleCheckboxChange(category)}
                            />
                            {category}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FilterBox;
