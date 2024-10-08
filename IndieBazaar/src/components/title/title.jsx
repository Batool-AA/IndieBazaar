import React, { useEffect, useState } from 'react';
import './title.css';

const Title = ({title, slogan}) => {
  const [showIndie, setShowIndie] = useState(false);

  useEffect(() => { 
    // Trigger animations
    setTimeout(() => setShowIndie(true), 500); // Delay for "Indie" // Delay for "Bazaar"
  }, []);

  return (
    <div className="title-container">
      <h1 className={`indie ${showIndie ? 'grow' : ''}`}>{title}</h1>
      <p className='title-slogan'>{slogan}</p>
    </div>
  );
};

export default Title;
