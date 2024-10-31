import React, { useEffect, useState } from 'react';
import './explore.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Explore = ({ businessId }) => { // Destructure businessId from props
  const [fadeIn, setFadeIn] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const timer = setTimeout(() => setFadeIn(true), 500); 
    return () => clearTimeout(timer); 
  }, []);

  const handleExploreClick = () => {
    // Navigate to the products page with the businessId
    navigate("/business-products", { state: { businessId } });
  }; 

  return (
    <div className="explore-container">
      <button
        className={`explore-button ${fadeIn ? 'fade-in' : ''}`}
        onClick={handleExploreClick} // Call the navigate function on click
      >
        Explore
      </button>
    </div>
  );
};

export default Explore;
