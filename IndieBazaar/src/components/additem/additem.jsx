import React, { useState, useEffect } from 'react';
import './additem.css';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const AddItemForm = ({ onNext, businessitems, setBusinessitems }) => {
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const [items, setItems] = useState([]);
  const storage = getStorage();

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
    } else {
      alert('Please fill in all fields before adding the item.');
    }
  };

  const handleNext = () => {
    setBusinessitems(items);
    if (items.length > 0) {
      onNext();
    } else {
      alert('Please add at least one item before proceeding.');
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
      <p className="prompt">Add your items.</p>
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
      <input type="file" onChange={handleImageUpload} className="image-upload" />
      <button className="add-item-button" onClick={handleAddItem}>Add Item</button>
      <button className="item-next-button" onClick={handleNext}>Next</button>

      <div className="items-list">
        {items.map((item, index) => (
          <div key={index} className="item-card">
            <h4>Item {index + 1}:</h4>
            <h5>Name: {item.name}</h5>
            <p>Description: {item.description}</p>
            <p>Price: ${item.price}</p>
            <p>Category: {item.category}</p>
            <img src={item.image} alt={`Item ${index}`} className="item-image" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddItemForm;
