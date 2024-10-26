import React, { useState } from 'react';

const ItemDetailsForm = () => {
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [subCategories, setSubCategories] = useState(['Specials', 'Burgers']);
  const [newSubCategory, setNewSubCategory] = useState('');

  const addSubCategory = () => {
    if (newSubCategory && !subCategories.includes(newSubCategory)) {
      setSubCategories([...subCategories, newSubCategory]);
      setNewSubCategory(''); // Clear the input field
    }
  };

  const removeSubCategory = (subCategory) => {
    setSubCategories(subCategories.filter((sub) => sub !== subCategory));
  };

  return (
    <div className="item-details-form">
      <div>
        <label>Item Name</label>
        <input 
          type="text" 
          value={itemName} 
          onChange={(e) => setItemName(e.target.value)} 
          placeholder="Enter item name"
        />
      </div>
      <div>
        <label>Add sub categories</label>
        <div className="sub-categories">
          {subCategories.map((sub, index) => (
            <div key={index} className="sub-category">
              {sub}
              <button onClick={() => removeSubCategory(sub)}>X</button>
            </div>
          ))}
        </div>
        <input 
          type="text" 
          value={newSubCategory} 
          onChange={(e) => setNewSubCategory(e.target.value)} 
          placeholder="Enter subcategory"
        />
        <button onClick={addSubCategory}>+ Add</button>
      </div>
      <div>
        <label>Description</label>
        <textarea 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          placeholder="Describe your item"
        />
      </div>
    </div>
  );
};

export default ItemDetailsForm;
