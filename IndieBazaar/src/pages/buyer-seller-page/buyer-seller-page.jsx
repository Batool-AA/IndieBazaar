import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import './buyer-seller-page.css'; 
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { useState } from "react";
import { auth } from '../../firebase/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const BuyerSellerPage = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const { formData } = location.state || {}; 

  const db = getFirestore();
  const userdb = collection(db, 'users');

  const saveData = (e) => {
    createUserWithEmailAndPassword(auth, formData.email, formData.password)
    .then((userCredential) => {
        console.log('User registered:', userCredential);
        
    })
    .catch((error) => {
        console.error('Registration error:', error);
    });
  }

  const handleBuyer = (e) => {
    addDoc(userdb, { username: formData.username, email: formData.email, password: formData.password, usertype: "buyer"});
    saveData();
    navigate("/store");
  }

  const handleSeller = (e) => {
    addDoc(userdb, { username: formData.username, email: formData.email, password: formData.password, usertype: "seller"});
    saveData();
    navigate("/setbusiness");
  }

  
  return (
    <div className="buyer-seller-page-container">
      <div className="buyer-seller-header-container">
        <h1 className="buyer-seller-header-title">IndieBazaar</h1>
      </div>
      <div className="buyer-seller-buttons-container">

        <button className="button-basic buyer-seller" onClick={handleBuyer}>
          <span role="img" aria-label="buyer">🛍️</span> Buyer
        </button>

        <span>OR</span>

        <button className="button-basic buyer-seller" onClick={handleSeller}>
          <span role="img" aria-label="seller">👨‍💼</span> Seller
        </button>

      </div>
    </div>
  );
}; 

export default BuyerSellerPage;