import React, { useState } from 'react';
import './additem.css';

const AddItemForm = ({ onNext, businessitems, setBusinessitems, categoriesRef}) => {
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [items, setItems] = useState([]);

  const handleAddItem = () => {
    if (itemName.trim() && description.trim() && image) {
      setItems([...items, { name: itemName, description }]);
      setItemName('');
      setDescription('');
      setImage(null); // Clear the image preview after adding item
    }
  };

  const handleNext = () => {
    setBusinessitems(items)
    onNext();
  };

  const handleImageUpload = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className="step-container">
      <p className="prompt">Add your items.</p>
      <input
        type="text"
        placeholder="Item name"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
        className="text-input"
      />
      <textarea
        placeholder="Item description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="textarea"
      />
      <input type="file" onChange={handleImageUpload} className="image-upload" />
      <button className="add-item-button" onClick={handleAddItem}>Add Item</button>
      <button className="next-button" onClick={handleNext}>Next</button>

      <div className="items-list">
        {items.map((item, index) => (
          <div key={index} className="item-card">
            <h4>Item {index + 1}:</h4>
            <h5>{item.name}</h5>
            <p>{item.description}</p>
            <img src={item.image} alt={`Item ${index}`} className="item-image" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddItemForm;
