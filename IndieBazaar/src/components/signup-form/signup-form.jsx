import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./signup-form.css"


const SignupForm = () => {
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmpassword: '',
  });

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username) {
      newErrors.username = 'Name is required';
    } 
    else if (formData.username.length < 6) {
      newErrors.username = 'Name must be at least 6 characters';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } 
    else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } 
    else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmpassword) {
      newErrors.confirmpassword = 'Password is required';
    } 
    else if (formData.confirmpassword != formData.password) {
      newErrors.confirmpassword = 'Passwords must match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      navigate("/buyerseller",  { state: { formData } }); 
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  

  return (
    <div className="signup-form-component">
      <form onSubmit={handleSubmit}>
        <h2>Sign Up</h2>

        <div className="input-group">
          <label>Name</label>
          <input
            type="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className={errors.username ? 'input-error' : ''}
          />
          {errors.username && <span className="error-message">{errors.username}</span>}
        </div>

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'input-error' : ''}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div> 

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={errors.password ? 'input-error' : ''}
          />
          {errors.password && <span className="error-message">{errors.password}</span>}
        </div>

        <div className="input-group">
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmpassword"
            value={formData.confirmpassword}
            onChange={handleChange}
            className={errors.confirmpassword ? 'input-error' : ''}
          />
          {errors.confirmpassword && <span className="error-message">{errors.confirmpassword}</span>}
        </div>

        <div className='button-basic-container'>
          <button type="submit" className="button-basic">Sign Up</button>
        </div>

        <a href="/login" className="signup-component-back-to-login">Back to Login</a>
      </form>
    </div>
  );
}

export default SignupForm;
