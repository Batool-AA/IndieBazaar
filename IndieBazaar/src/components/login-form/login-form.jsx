import React, { useState } from 'react';
import "./login-form.css"


function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleRememberMeChange = () => setRememberMe(!rememberMe);

  const validateForm = () => {
    const newErrors = {};

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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const loginData = {
        email,
        password,
        rememberMe,
      };
      console.log('Login successful!', loginData);

      setEmail('');
      setPassword('');
      setRememberMe(false);
    }
  };

  return (
    <div className="login-form-component">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>

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

        <div className="login-component-options">

          <div className="login-component-remember-me">
            <input
              type="checkbox"
              id="remember-me"
              checked={rememberMe}
              onChange={handleRememberMeChange}
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>

          <a href="/forgot-password">Forgot Password?</a>

        </div>

        <div className='button-basic-container'>
          <button type="submit" className="button-basic">Login</button>
        </div>

        <div className="login-component-signup">
          <a href="/signup">Don’t have an account? Sign Up!</a>
        </div>

        <a href="/home" className="login-component-back-to-home">Back to Home</a>
      </form>
    </div>
  );
}

export default LoginForm;

// yet to add:
//     page Navigation
//     remember me functionality - saving email password
//     checking for email password match