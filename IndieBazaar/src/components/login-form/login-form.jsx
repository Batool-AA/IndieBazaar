import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./login-form.css";
import { auth } from "../../firebase/firebase";
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { signInWithEmailAndPassword, setPersistence, browserLocalPersistence, browserSessionPersistence, sendPasswordResetEmail } from 'firebase/auth';

const LoginForm = () => {
  const navigate = useNavigate();
  const db = getFirestore();
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('savedCredentials')) || {};
    if (savedData[email]) {
      setPassword(savedData[email]);
    }
  }, [email]);

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    const savedData = JSON.parse(localStorage.getItem('savedCredentials')) || {};
    if (savedData[newEmail]) {
      setPassword(savedData[newEmail]);
    } else {
      setPassword('');
    }
  };

  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleRememberMeChange = () => setRememberMe(!rememberMe);
  const toggleShowPassword = () => setShowPassword(!showPassword);

  const validateForm = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email address is invalid';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const persistenceType = rememberMe ? browserLocalPersistence : browserSessionPersistence;

      setPersistence(auth, persistenceType)
        .then(() => {
          if (rememberMe) {
            const savedData = JSON.parse(localStorage.getItem('savedCredentials')) || {};
            savedData[email] = password;
            localStorage.setItem('savedCredentials', JSON.stringify(savedData));
          }

          return signInWithEmailAndPassword(auth, email, password);
        })
        .then(async (userCredential) => {
          console.log("Login successful:", userCredential);

          // Fetch the user type from Firestore
          const userDocQuery = query(collection(db, 'users'), where('email', '==', email));
          const userDocSnapshot = await getDocs(userDocQuery);
          
          if (!userDocSnapshot.empty) {
            const userData = userDocSnapshot.docs[0].data();
            const userType = userData.usertype;

            // Navigate based on user type
            if (userType === 'buyer') {
              navigate('/store');
            } else if (userType === 'seller') {
              navigate('/user-profile');
            } else {
              console.error("Invalid user type");
              setErrors({ form: "User type not recognized." });
            }
          } else {
            console.error("No user found for this email.");
            setErrors({ form: "User not found." });
          }
        })
        .catch((error) => {
          console.error("Login error:", error.message);
          setErrors((prevErrors) => ({ ...prevErrors, form: error.message }));
        });

      setEmail('');
      setPassword('');
      setRememberMe(false);
    }
  };

  const handleForgotPassword = () => {
    if (!email) {
      setErrors((prevErrors) => ({ ...prevErrors, form: "Please enter your email to reset your password." }));
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        setErrors((prevErrors) => ({ ...prevErrors, form: "Password reset email sent! Check your inbox." }));
      })
      .catch((error) => {
        console.error("Error sending reset email:", error.message);
        setErrors((prevErrors) => ({ ...prevErrors, form: "Error: " + error.message }));
      });
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

        <div className="input-group password-input-group">
          <label>Password</label>
          <div className="password-input-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={password}
              onChange={handlePasswordChange}
              className={errors.password ? 'input-error' : ''}
            />
            <span 
              className="login-password-toggle-icon" 
              onClick={toggleShowPassword} 
              role="button"
              aria-label="Toggle password visibility"
            >
              {showPassword ? '👁️' : '🙈'}
            </span>
          </div>
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
          <a onClick={handleForgotPassword}>Forgot Password?</a>
        </div>
        {errors.form && <div className="error-message">{errors.form}</div>}

        <div className='button-basic-container'>
          <button type="submit" className="button-basic">Login</button>
        </div>

        <div className="login-component-signup">
          <a href="/signup">Don’t have an account? Sign Up!</a>
        </div>

        <a href="/" className="login-component-back-to-home">Back to Home</a>
      </form>
    </div>
  );
};

export default LoginForm;
