import React, { useEffect, useState } from 'react';
import './title.css';

const Title = ({title, slogan}) => {
  const [showIndie, setShowIndie] = useState(false);
  const [typedSlogan, setTypedSlogan] = useState('');
  const typingDelay = 50; 
  
  useEffect(() => {
    setTimeout(() => setShowIndie(true), 500); 
  }, []); 

  useEffect(() => {
    if (showIndie) { 
      let index = -1;
      const typeSlogan = () => {
        if (index < slogan.length-1) {
          setTypedSlogan((prev) => prev + slogan[index]);
          index++;
          setTimeout(typeSlogan, typingDelay); 
        }
      };
      typeSlogan(); 
    }
  }, [showIndie, slogan]);

  return (
    <div className="title-container">
      <h1 className={`indie ${showIndie ? 'grow' : ''}`}>{title}</h1>
      <p className='title-slogan'>{typedSlogan}</p>
    </div>
  );
};

export default Title;
