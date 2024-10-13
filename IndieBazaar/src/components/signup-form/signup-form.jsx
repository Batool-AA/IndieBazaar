import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./signup-form.css"


const SignupForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleNameChange = (e) => setUsername(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  const validateForm = () => {
    const newErrors = {};

    if (!username) {
      newErrors.username = 'Name is required';
    } 
    else if (username.length < 6) {
      newErrors.username = 'Name must be at least 6 characters';
    }

    if (!email) {
      newErrors.email = 'Email is required';
    } 
    else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email address is invalid';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } 
    else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!confirmpassword) {
      newErrors.confirmpassword = 'Password is required';
    } 
    else if (confirmpassword != password) {
      newErrors.confirmpassword = 'Passwords must match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const signupData = {
        username,
        email,
        password,
      };
      console.log('signup successful!', signupData);

      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');

      navigate("/buyerseller");
    }
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
            value={username}
            onChange={handleNameChange}
            className={errors.username ? 'input-error' : ''}
          />
          {errors.password && <span className="error-message">{errors.username}</span>}
        </div>

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            className={errors.email ? 'input-error' : ''}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div> 

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            className={errors.password ? 'input-error' : ''}
          />
          {errors.password && <span className="error-message">{errors.password}</span>}
        </div>

        <div className="input-group">
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmpassword"
            value={confirmpassword}
            onChange={handleConfirmPasswordChange}
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

// yet to add:
//     page Navigation
//     remember me functionality - saving email password
//     checking for email password match