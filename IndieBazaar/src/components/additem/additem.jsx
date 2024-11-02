import React, { useState, useEffect } from 'react';
import './additem.css';
import '../../pages/setupbusiness-page/setupbusiness.css';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const AddItemForm = ({ onNext, businessitems, setBusinessitems }) => {
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const [items, setItems] = useState([]);
  const storage = getStorage();
  const [addItemError, setAddItemError] = useState('');
  const [nextButtonError, setNextButtonError] = useState('');

  useEffect(() => {
    if (businessitems) {
      setItems(businessitems);
    }
  }, [businessitems]);

  const handleAddItem = () => {
    if (itemName.trim() && description.trim() && price.trim() && category.trim() && image) {
      setItems([...items, { name: itemName, description, price, category, image }]);
      setItemName('');
      setDescription('');
      setPrice('');
      setCategory('');
      setImage(null);
      setAddItemError(''); // Clear add item error on successful addition
    } else {
      setAddItemError('Please fill in all fields before adding the item.');
    }
  };

  const handleDeleteItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
    setNextButtonError(''); // Clear next button error if items remain after deletion
  };

  const handleNext = () => {
    setBusinessitems(items);
    if (items.length > 0) {
      setNextButtonError(''); // Clear next button error if items are present
      onNext();
    } else {
      setNextButtonError('Please add at least one item before proceeding.');
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const storageRef = ref(storage, `images/${Date.now()}_${file.name}`);
      try {
        await uploadBytes(storageRef, file);
        const imageURL = await getDownloadURL(storageRef);
        setImage(imageURL);
      } catch (error) {
        console.error("Error uploading file: ", error);
      }
    }
  };

  return (
    <div className="step-container">
      <p className="prompt">Add your items</p>

      <input
        type="text"
        placeholder="Item name"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
        className="item-text-input"
      />

      <textarea
        placeholder="Item description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="item-textarea"
      />

      <input
        type="number"
        placeholder="Item price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="item-text-input"
      />

      <input
        type="text"
        placeholder="Product category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="item-text-input"
      />

      <input type="file" onChange={handleImageUpload} className="image-upload" accept="image/*"/>

      {addItemError && <p className="error-message">{addItemError}</p>} {/* Display add item error */}

      <button className="add-item-button" onClick={handleAddItem}>Add Item</button>

      <div className="items-list">
        {items.map((item, index) => (
          <div key={index} className="item-card">
            <h4>Item {index + 1}:</h4>
            <h5>Name: {item.name}</h5>
            {/* Uncomment the following lines to display more item details */}
            {/* <p>Description: {item.description}</p>
            <p>Price: PKR{item.price}</p>
            <p>Category: {item.category}</p>
            <img src={item.image} alt={`Item ${index}`} className="item-image" /> */}
             <button
                className="delete-item-button"
                onClick={() => handleDeleteItem(index)}
                aria-label="Delete Item"
              >
                &times;
              </button>
          </div>
        ))}
      </div>

      <div className="input-container">
        {nextButtonError && <p className="error-message">{nextButtonError}</p>} {/* Display next button error */}
        <button className="next-button" onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default AddItemForm;
