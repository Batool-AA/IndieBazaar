import React, { useState } from 'react'; 
import StepOneBusinessName from '../../components/businessname/businessname.jsx';
import StepTwoBusinessDescription from '../../components/businessdesc/businessdesc.jsx';
import StepThreeBusinessCategory from '../../components/businesscategory/businesscat.jsx';
import AddItemForm from '../../components/additem/additem.jsx';
import './SetupBusiness.css';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { useLocation,useNavigate } from 'react-router-dom';
import StepFiveBusinessLogo from '../../components/businesslogo/business-logo.jsx';
import { useUser } from '../../firebase/usercontext';
import NavBar from '../../components/navigationbar/navigation.jsx';
const SetupBusiness = () => {
  const location = useLocation();
  const user = useUser();
  // console.log(user)
  // const [step, setStep] = useState(1);
  const db = getFirestore();
  const businessdb = collection(db, 'businesses'); // Firestore collection reference
 
  // State variables for business details
  const [businessName, setBusinessName] = useState('');
  const [businessDescription, setBusinessDescription] = useState('');
  const [businessCategories, setBusinessCategories] = useState([]);
  const [businessitems,setBusinessitems] = useState([]);
  const [businessLogo, setBusinessLogo] = useState(null);
  const navigate = useNavigate();
  

  const initialStep = location.state?.startAtStep4 ? 4 : 1;
  const [step, setStep] = useState(initialStep);

  const nextStep = () => { 
    setStep(step + 1);
  };

  const previousStep = () => { 
    setStep(step - 1);
  };

  const handleDone = () => {
    addDoc(businessdb, { name: businessName, description: businessDescription, category: businessCategories, items: businessitems, logo: businessLogo, email: user.email});
    navigate('/user-profile');
  }

  return (
    <div className="setup-business-container-main">    
      {/* New header container */}
      <div className="setup-nav">
        <NavBar title={"IndieBazaar"}/>
      </div>
      <div className='setup-business-container'>
      <div className="header-container">
        <h1>Hi Seller!</h1>
        <p className="subtitle">Let's Set Up Your Business</p>
      </div>

      {step <= 1 && ( 
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
          businessitems={businessitems}
          setBusinessitems={setBusinessitems}
        />
      )}
      {step === 5 && (
        <StepFiveBusinessLogo 
          onNext={nextStep} 
          businessLogo={businessLogo}
          setBusinessLogo={setBusinessLogo}
        />
      )}
      {step > 1 && 
      <button className='prev-button' onClick={previousStep}>Previous</button>}

      {step == 6 && (
        <button className='prev-button' onClick={handleDone}>Finish Setting Up</button>
      )}
      </div>
    </div>
  );
};

export default SetupBusiness;
