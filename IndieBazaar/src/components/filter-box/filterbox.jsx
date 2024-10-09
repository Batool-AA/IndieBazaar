import './filterbox.css'; // Import your CSS file
import React, { useState } from 'react';

const FilterBox = () => {
    const [price, setPrice] = useState(5000); // Default price state at mid-range

    const handlePriceChange = (e) => {
        setPrice(e.target.value); // Update price when slider changes
    }; 
    return (
        <div className="filter-box">
            <h3>Choose Category</h3>
            <div className="checkbox-container">
                <label>
                    <input type="checkbox" /> Food
                </label>
                <label>
                    <input type="checkbox" /> Accessories
                </label>
                <label>
                    <input type="checkbox" /> Clothes
                </label>
                <label>
                    <input type="checkbox" /> Decor
                </label>
            </div>
            {/* Price Range Slider */}
            <div className="price-range">
                <h4>Price Range (PKR)</h4>
                <input
                    type="range"
                    min="500"
                    max="10000"
                    value={price}
                    onChange={handlePriceChange}
                    className="slider"
                />
                <p>Selected Price: PKR {price}</p>
            </div>
        </div>
    );
};

export default FilterBox;