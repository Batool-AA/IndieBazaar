import React, { useState } from 'react';
import '../additem/additem.css';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const AddMoreItems = ({ businessId }) => {
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const [items, setItems] = useState([]);
  const [addItemError, setAddItemError] = useState('');
  const storage = getStorage();
  const db = getFirestore();
  const navigate = useNavigate();

  const handleAddItem = () => {
    const priceValue = parseFloat(price);
    if (itemName.trim() && description.trim() && price.trim() && category.trim() && image) {
      if (description.length > 50) {
        setAddItemError('Description must be 50 characters or less.');
        return;
      }
      
      if (priceValue <= 0) {
        setAddItemError('Price must be greater than 0.');
        return;
      }

      const newItem = { name: itemName, description, price, category, image };
      
      // Update local state
      setItems([...items, newItem]);
      setItemName('');
      setDescription('');
      setPrice('');
      setCategory('');
      setImage(null);
      setAddItemError('');
    } else {
      setAddItemError('Please fill in all fields before adding the item');
    }
  };

  const handleDeleteItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const handleDone = async () => {
    if (items.length === 0) {
      setAddItemError('No items to add. Please add items before finishing.');
      return;
    }

    try {
      const businessDocRef = doc(db, 'businesses', businessId);
      // Add all items in one operation to Firestore
      await updateDoc(businessDocRef, {
        items: arrayUnion(...items)
      });
      navigate('/user-profile'); // Navigate to user profile after finishing
    } catch (error) {
      console.error("Error updating document: ", error);
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
      <p className="prompt">Add more items to your business</p>
      <input
        type="text"
        placeholder="Item name"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
        className="item-text-input"
      /> 
      <textarea
        placeholder="Item description (max 50 characters)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="item-textarea"
        maxLength={50}
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
        <button className="next-button" onClick={handleDone}>Done</button>
      </div>
    </div>
  );
};

export default AddMoreItems;
