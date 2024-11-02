import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase/firebase'; // Import Firebase auth and database
import { collection, query, where, getDocs } from 'firebase/firestore';

import './homenavbar.css';

const HomeNavbar = () => {
  const [usertype, setUsertype] = useState(null); // State to store user type
  const navigate = useNavigate();

  // Fetch user type based on email
  const fetchUserType = async (email) => {
    try {
      const usersCollection = collection(db, 'users'); // Assuming 'users' is the collection name
      const q = query(usersCollection, where('email', '==', email)); // Query for the user by email
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        setUsertype(userData.usertype); // Set usertype from Firestore data
      } else {
        console.log("No user found.");
      }
    } catch (error) {
      console.error("Error fetching user type:", error);
    }
  };

  useEffect(() => {
    const user = auth.currentUser; // Get the current user
    if (user) {
      fetchUserType(user.email); // Fetch user type using email
    }
  }, []);

  const handleAboutClick = () => {
    document.getElementById('about-us').scrollIntoView({ behavior: 'smooth' });
  };

  const handleContactClick = () => {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  };

  const handleBuySellClick = () => {
    const user = auth.currentUser; // Get the current user
    if (!user) {
      navigate('/login'); // Navigate to login if not logged in
    } else if (usertype === 'seller') {
      navigate('/user-profile'); // Navigate to user profile if user is a seller
    } else {
      navigate('/store'); // Navigate to store if user is a buyer
    }
  };

  const handleFindinStore = () => {
    navigate('/store');
  };

  return (
    <div className="navbar">
      <div className="nav-left">
        <span onClick={handleAboutClick}>About us</span>
        <span onClick={handleContactClick}>Contact</span>
      </div>
      <div className="nav-right">
        <span onClick={handleBuySellClick}>Buy</span>
        <span onClick={handleBuySellClick}>Sell</span>
        <span onClick={handleFindinStore}>Find in Store</span>
      </div>
    </div>
  );
};

export default HomeNavbar;
