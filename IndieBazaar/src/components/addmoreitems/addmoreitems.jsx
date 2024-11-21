import React, { useState, useRef } from 'react';
import '../additem/additem.css';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
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
  const fileInputRef = useRef(null); // Ref for the file input
  const [uploading, setUploading] = useState(false); // Track upload progress
  const [uploadProgress, setUploadProgress] = useState(0);
  
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
      if (fileInputRef.current) fileInputRef.current.value = ''; // Clear file input
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

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const storageRef = ref(storage, `images/${Date.now()}_${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      // Monitor the upload progress
      uploadTask.on('state_changed', 
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress); // Update the progress state
          setUploading(true); // Set uploading to true
        }, 
        (error) => {
          console.error("Error uploading file: ", error);
          setUploading(false); // Set uploading to false on error
        }, 
        async () => {
          try {
            const imageURL = await getDownloadURL(uploadTask.snapshot.ref);
            setImage(imageURL);
            setUploading(false); // Set uploading to false when done
          } catch (error) {
            console.error("Error getting image URL: ", error);
            setUploading(false);
          }
        }
      );
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

      <input
        type="file"
        onChange={handleImageUpload}
        className="image-upload"
        accept="image/*"
        ref={fileInputRef} // Attach ref to file input
      />

      {uploading && (
        <div className="upload-progress">
          <div className="progress-bar" style={{ width: `${uploadProgress}%` }}></div>
        </div>
      )}

      <button className="add-item-button" onClick={handleAddItem} disabled={uploading}>
        {uploading ? 'Uploading...' : 'Add Item'}
      </button>

      <div className="items-list">
        {items.map((item, index) => (
          <div key={index} className="item-card">
            <h4>Item {index + 1}:</h4>
            <h5>Name: {item.name}</h5>
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
        <button className="next-button" onClick={handleDone}>
          Done
        </button>
      </div>
    </div>
  );
};

export default AddMoreItems;
