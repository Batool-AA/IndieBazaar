import React, { useState, useEffect } from 'react';
import '../additem/additem.css';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const EditItem = ({ businessId, itemToEdit }) => {
  const [itemName, setItemName] = useState(itemToEdit.name || '');
  const [description, setDescription] = useState(itemToEdit.description || '');
  const [price, setPrice] = useState(itemToEdit.price || '');
  const [category, setCategory] = useState(itemToEdit.category || '');
  const [image, setImage] = useState(itemToEdit.image || null);
  const [editError, setEditError] = useState('');
  const [isImageUpdated, setIsImageUpdated] = useState(false);
  
  const storage = getStorage();
  const db = getFirestore();
  const navigate = useNavigate();

  const handleEditItem = async () => {
    const priceValue = parseFloat(price);

    // Input validation
    if (!itemName.trim() || !description.trim() || !price.trim() || !category.trim() || (!image && !itemToEdit.image)) {
      setEditError('Please fill in all fields before saving the changes.');
      return;
    }

    if (description.length > 50) {
      setEditError('Description must be 50 characters or less.');
      return;
    }

    if (priceValue <= 0) {
      setEditError('Price must be greater than 0.');
      return;
    }

    try {
      const businessDocRef = doc(db, 'businesses', businessId);
      const businessSnapshot = await getDoc(businessDocRef);

      if (businessSnapshot.exists()) {
        const businessData = businessSnapshot.data();
        const updatedItems = businessData.items.map((item) =>
          item.name === itemToEdit.name
            ? { ...item, name: itemName, description, price, category, image: isImageUpdated ? image : itemToEdit.image }
            : item
        );

        // Update Firestore with the edited items array
        await updateDoc(businessDocRef, { items: updatedItems });

        // Navigate back to edit-business page
        navigate('/edit-business', { state: { businessId } });
      } else {
        console.error('Business document not found.');
        setEditError('Failed to update item. Business not found.');
      }
    } catch (error) {
      console.error('Error updating document:', error);
      setEditError('An error occurred while updating the item.');
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
        setIsImageUpdated(true); // Mark image as updated
      } catch (error) {
        console.error('Error uploading image:', error);
        setEditError('Error uploading image. Please try again.');
      }
    }
  };

  const handleCancel = () => {
    if (!businessId) return; // If businessId is missing, do nothing or show an error
    navigate('/edit-business', { state: { businessId } });
  };

  return (
    <div className="step-container">
      <p className="prompt">Edit Item</p>
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
      />
      {editError && <p className="error-message">{editError}</p>}

      <div className="button-container">
        <button className="edit-item-button" onClick={handleEditItem}>
          Save Changes
        </button>
        <button className="cancel-button" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditItem;
