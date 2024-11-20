import React, { useState, useEffect } from 'react';
import StepOneBusinessName from '../../components/businessname/businessname.jsx';
import StepTwoBusinessDescription from '../../components/businessdesc/businessdesc.jsx';
import StepThreeBusinessCategory from '../../components/businesscategory/businesscat.jsx';
import AddItemForm from '../../components/additem/additem.jsx';
import './setupbusiness.css';
import { getFirestore, collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { useLocation, useNavigate } from 'react-router-dom';
import StepFiveBusinessLogo from '../../components/businesslogo/business-logo.jsx';
import { useUser } from '../../firebase/usercontext';
import NavBar from '../../components/navigationbar/navigation.jsx';

const SetupBusiness = () => {
  const location = useLocation();
  const user = useUser(); // Get the user data from context (user email)
  const db = getFirestore();
  const businessdb = collection(db, 'businesses'); // Firestore collection reference
  const navigate = useNavigate();
  
  // State variables for business details
  const [businessName, setBusinessName] = useState('');
  const [businessDescription, setBusinessDescription] = useState('');
  const [businessCategories, setBusinessCategories] = useState([]);
  const [businessItems, setBusinessItems] = useState([]);
  const [businessLogo, setBusinessLogo] = useState(null);

  // Step control state
  const initialStep = location.state?.startAtStep4 ? 4 : 1;
  const [step, setStep] = useState(initialStep);

  // State for usertype
  const [userType, setUserType] = useState(null);

  const nextStep = () => {
    setStep(step + 1);
  };

  const previousStep = () => {
    setStep(step - 1);
  };

  const handleDone = () => {
    // Add the business info to Firestore
    addDoc(businessdb, { name: businessName, description: businessDescription, category: businessCategories, items: businessItems, logo: businessLogo, email: user.email });
    navigate('/user-profile');
  };

  useEffect(() => {
    // If user is logged in, fetch their usertype from the users collection
    const fetchUserType = async () => {
      if (user && user.email) {
        const userRef = collection(db, 'users');
        const q = query(userRef, where('email', '==', user.email));

        try {
          const querySnapshot = await getDocs(q);
          if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            const userData = userDoc.data();
            setUserType(userData.usertype); // Set usertype from Firestore
          } else {
            console.log('No user document found for this email.');
            navigate('/login'); // Redirect to login if user not found
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          navigate('/login'); // Redirect to login on error
        }
      } else {
        navigate('/login'); // Redirect to login if no user is logged in
      }
    };

    fetchUserType();
  }, [user, db, navigate]);

  useEffect(() => {
    // Trigger redirection only when userType is set
    if (userType !== null) {
      console.log(userType);
      if (userType === 'seller') {
        navigate('/user-profile');
      } else if (userType === 'buyer') {
        navigate('/store'); }// Redirect to store if user is a buyer
      // } else {
      //   navigate('/store'); // Redirect to store if no usertype is found
      // }
    }
  }, [userType, navigate]);

  return (
    <div className="setup-business-container-main">
      {/* New header container */}
      <div className="setup-nav">
        <NavBar title={"IndieBazaar"} />
      </div>
      <div className='setup-business-container'>
        <div className="header-container">
          <h1>Hi Seller!</h1>
          <p className="subtitle">Let's Set Up Your Business</p>
        </div>

        {step === 1 && (
          <StepOneBusinessName 
            onNext={nextStep} 
            businessName={businessName} 
            setBusinessName={setBusinessName} 
          />
        )}
        {step === 2 && (
          <StepTwoBusinessDescription 
            onNext={nextStep} 
            businessDescription={businessDescription} 
            setBusinessDescription={setBusinessDescription} 
          />
        )}
        {step === 3 && (
          <StepThreeBusinessCategory 
            onNext={nextStep} 
            businessCategory={businessCategories} 
            setBusinessCategories={setBusinessCategories} 
          />
        )}
        {step === 4 && (
          <AddItemForm 
            onNext={nextStep} 
            businessItems={businessItems} 
            setBusinessItems={setBusinessItems} 
          />
        )}
        {step === 5 && (
          <StepFiveBusinessLogo 
            onNext={nextStep} 
            businessLogo={businessLogo} 
            setBusinessLogo={setBusinessLogo} 
          />
        )}

        {step > 1 && <button className='prev-button' onClick={previousStep}>Previous</button>}

        {step === 6 && (
          <button className='prev-button' onClick={handleDone}>Finish Setting Up</button>
        )}
      </div>
    </div>
  );
};

export default SetupBusiness;
