import './filterbox.css'; 
import React, { useState } from 'react';

const categories = ['Food', 'Accessories', 'Clothes', 'Decor'];

const FilterBox = () => {
    const [price, setPrice] = useState(5000); 
    const [selectedCategories, setSelectedCategories] = useState([]);

    const handlePriceChange = (e) => {
        setPrice(e.target.value); 
    };

    const handleCheckboxChange = (category) => {
        setSelectedCategories((prevSelected) =>
            prevSelected.includes(category)
                ? prevSelected.filter((item) => item !== category)
                : [...prevSelected, category]
        );
    };

    return (
        <div className="filter-box">
            <h3>Choose Category</h3>
            <div className="filter-checkbox-container">
                {categories.map((category) => (
                    <div key={category} className="filter-checkbox-item"> 
                        <label>
                            <input
                                type="checkbox"
                                value={category}
                                onChange={() => handleCheckboxChange(category)}
                            />
                            {category}
                        </label>
                    </div>
                ))}
            </div>

            {/* <div className="filter-price-range">
                <h4>Price Range (PKR)</h4>
                <input
                    type="range"
                    min="500"
                    max="10000"
                    value={price}
                    onChange={handlePriceChange}
                    className="filter-slider"
                />
                <p>Selected Price: PKR {price}</p>
            </div> */}
        </div>
    );
};

export default FilterBox;
