import React, { useState } from 'react';
import Navbar from '../../components/navigationbar/navigation.jsx'; // Import your existing Navbar component
import CategorySelector from '../../components/businesscategory/businesscategory.jsx';
import ItemDetailsForm from '../../components/itemdetails/itemdetails.jsx';
import ImageUploader from '../../components/imageuploader/imageuploader.jsx';
import './SetupBusiness.css'; // Ensure you import the CSS

const SetupBusiness = () => {
  const [selectedCategory, setSelectedCategory] = useState('Food');
  const [items, setItems] = useState([{ id: 1 }]); // Manage multiple items

  // Function to add a new item form
  const addItemForm = () => {
    setItems([...items, { id: items.length + 1 }]);
  };

  return (
    <div className="setup-business-container">
      <Navbar /> {/* Navbar is added on top */}
      <div className="setup-business">
        <h2>Set-up your business</h2>

        <CategorySelector 
          selectedCategory={selectedCategory} 
          onSelectCategory={setSelectedCategory} 
        />

        {/* Render multiple ItemDetailsForm for each item */}
        {items.map((item, index) => (
          <div key={item.id} className="item-form-wrapper">
            <h3>Item {index + 1}</h3>
            <ItemDetailsForm />
            <ImageUploader />
          </div>
        ))}

        {/* Button to add a new item */}
        <button onClick={addItemForm} className="add-item-button">
          + Add another item
        </button>

        <button className="next-button">Next</button>
      </div>
    </div>
  );
};

export default SetupBusiness;
