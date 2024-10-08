import React, { useEffect, useState } from 'react';
import './title.css';

const Title = () => {
  const [showIndie, setShowIndie] = useState(false);
  const [showBazaar, setShowBazaar] = useState(false);

  useEffect(() => { 
    // Trigger animations
    setTimeout(() => setShowIndie(true), 500); // Delay for "Indie"
    setTimeout(() => setShowBazaar(true), 1500); // Delay for "Bazaar"
  }, []);

  return (
    <div className="title-container">
      <h1 className={`indie ${showIndie ? 'grow' : ''}`}>IndieBazaar</h1>
      <p className='title-slogan'>Make a mark with your product -- change this slogan to something better</p>
      {/* <h1 className={`bazaar ${showBazaar ? 'grow' : ''}`}>Bazaar</h1> */}
    </div>
  );
};

export default Title;
