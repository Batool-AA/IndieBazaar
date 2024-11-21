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

  // State for user type
  const [userType, setUserType] = useState(null);

  const nextStep = () => {
    setStep(step + 1);
  };

  const previousStep = () => {
    setStep(step - 1);
  };

  const handleDone = () => {
    // Add the business info to Firestore
    addDoc(businessdb, {
      name: businessName,
      description: businessDescription,
      category: businessCategories,
      items: businessItems,
      logo: businessLogo,
      email: user.email,
    });
    navigate('/user-profile');
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.email) {
        // Fetch user type from Firestore
        const userRef = collection(db, 'users');
        const userQuery = query(userRef, where('email', '==', user.email));
        const userSnapshot = await getDocs(userQuery);

        if (!userSnapshot.empty) {
          const userData = userSnapshot.docs[0].data();
          setUserType(userData.usertype);

          if (userData.usertype === 'buyer') {
            navigate('/store');
          } else if (userData.usertype === 'seller') {
            // Check if the seller already has a business
            const businessQuery = query(businessdb, where('email', '==', user.email));
            const businessSnapshot = await getDocs(businessQuery);

            if (!businessSnapshot.empty) {
              navigate('/user-profile'); // Redirect to user profile if business exists
            }
          }
        }
      }
    };

    fetchUserData();
  }, [user, db, navigate]);

  return (
    <div className="setup-business-container-main">
      <div className="setup-nav">
        <NavBar title={"IndieBazaar"} />
      </div>
      <div className="setup-business-container">
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

        {step > 1 && <button className="prev-button" onClick={previousStep}>Previous</button>}

        {step === 6 && (
          <button className="prev-button" onClick={handleDone}>Finish Setting Up</button>
        )}
      </div>
    </div>
  );
};

export default SetupBusiness;
