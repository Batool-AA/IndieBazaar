import React, { useState , useEffect } from 'react';
import './additem.css';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const AddItemForm = ({ onNext, businessitems, setBusinessitems }) => {
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [items, setItems] = useState([]);
  const storage = getStorage();

  useEffect(() => {
    if (businessitems) {
      setItems(businessitems);
    }
  }, [businessitems]);

  const handleAddItem = () => {
    if (itemName.trim() && description.trim() && image) {
      setItems([...items, { name: itemName, description, image }]);
      setItemName('');
      setDescription('');
      setImage(null); 
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
        console.log("File available at:", imageURL); // Log the URL for verification
        setImage(imageURL); // Store the URL if needed
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
