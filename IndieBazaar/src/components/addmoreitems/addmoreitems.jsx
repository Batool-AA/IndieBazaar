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
  const storage = getStorage();
  const db = getFirestore();
  const navigate = useNavigate();

  const handleAddItem = async () => {
    if (itemName.trim() && description.trim() && price.trim() && category.trim() && image) {
      const newItem = { name: itemName, description, price, category, image };

      try {
        const businessDocRef = doc(db, 'businesses', businessId);
        await updateDoc(businessDocRef, {
          items: arrayUnion(newItem) // Add the new item to Firestore
        });

        // Update local state
        setItems([...items, newItem]);
        setItemName('');
        setDescription('');
        setPrice('');
        setCategory('');
        setImage(null);
      } catch (error) {
        console.error("Error updating document: ", error);
      }
    } else {
      alert('Please fill in all fields before adding the item.');
    }
  };

  const handleDone = () => {
    navigate('/user-profile'); // Navigate to user profile after finishing
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
      <p className="prompt">Add more items to your business.</p>
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
      <button className="item-next-button" onClick={handleDone}>Done</button>

      <div className="items-list">
        {items.map((item, index) => (
          <div key={index} className="item-card">
            <h4>Item {index + 1}:</h4>
            <h5>Name: {item.name}</h5>
            <p>Description: {item.description}</p>
            <p>Price: PKR {item.price}</p>
            <p>Category: {item.category}</p>
            <img src={item.image} alt={`Item ${index}`} className="item-image" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddMoreItems;
