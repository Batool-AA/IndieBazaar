import React, { useState } from 'react';
import './contactus.css';

const ContactUs = () => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }; 

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Email submitted: ${email}`);
    setEmail(''); 
  };

  

  return (
    <div className="contact-us-container">
      <h2 className= "heading-contactus">Contact Us</h2>
      <form onSubmit={handleSubmit} className="email-form">
        <input
          type="email"
          placeholder="Enter your email for updates"
          value={email}
          onChange={handleEmailChange}
          required 
        />
        <button type="submit">Submit</button>
      </form>
      <div className="links-container">
        <a href="#about-us">About Us</a>
        <a href="/store">Find in Store</a>
        <a href="/login">Sell</a>
        <a href="#contact">Contact Us</a>
        <a href="#terms-of-service">Terms of Service</a>
        <a href="#privacy-policy">Privacy Policy</a>
        <a href="#support">Support</a>
      </div>
    </div>
  );
};

export default ContactUs;
