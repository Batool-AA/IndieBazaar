import React, { useState, useEffect, useRef } from 'react';
import '../additem/additem.css';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
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
  const [uploading, setUploading] = useState(false); // Track upload progress
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);

  const storage = getStorage();
  const db = getFirestore();
  const navigate = useNavigate();

  const handleEditItem = async () => {
    const priceValue = parseFloat(price);

    // Input validation
    if (!itemName.trim() || !description.trim() || !category.trim() || (!image && !itemToEdit.image)) {
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
      {uploading && (
        <div className="upload-progress">
          <div className="progress-bar" style={{ width: `${uploadProgress}%` }}></div>
        </div>
      )}

      <button className="add-item-button" onClick={handleEditItem} disabled={uploading}>
        {uploading ? 'Uploading...' : 'Save Changes'}
      </button>

      <div className="input-container">
        <button className="next-button" onClick={handleCancel}>Done</button>
      </div>
    </div>
  );
};

export default EditItem;
