import React, { useEffect, useState } from 'react';
import './explore.css';

const Explore = () => {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    // Set the fadeIn state to true after a small delay to trigger the animation
    const timer = setTimeout(() => setFadeIn(true), 500); // 500ms delay
    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  const handleExploreClick = () => {
    document.getElementById('about-us').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="explore-container">
      <button
        className={`explore-button ${fadeIn ? 'fade-in' : ''}`}
        onClick={handleExploreClick}
      >
        Explore
      </button>
    </div>
  );
};

export default Explore;
