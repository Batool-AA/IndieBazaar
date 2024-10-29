import React, { useState } from 'react';
import StepOneBusinessName from '../../components/businessname/businessname.jsx';
import StepTwoBusinessDescription from '../../components/businessdesc/businessdesc.jsx';
import StepThreeBusinessCategory from '../../components/businesscategory/businesscat.jsx';
import AddItemForm from '../../components/additem/additem.jsx';
import './SetupBusiness.css';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const SetupBusiness = () => {
  const [step, setStep] = useState(1);
  const db = getFirestore();
  const businessdb = collection(db, 'businesses'); // Firestore collection reference

  // State variables for business details
  const [businessName, setBusinessName] = useState('');
  const [businessDescription, setBusinessDescription] = useState('');
  const [businessCategories, setBusinessCategories] = useState([]);
  const [businessitems,setBusinessitems] = useState([])
  const navigate = useNavigate();

  const nextStep = () => { 
    setStep(step + 1);
  };

  const previousStep = () => { 
    setStep(step - 1);
  };

  const handleDone = () => {
    addDoc(businessdb, { name: businessName, description: businessDescription, category: businessCategories, items: businessitems});
  }

  return (
    <div className="setup-business-container">
      {step > 1 && 
      <div className="back-arrow" onClick={previousStep}>&#8592;</div>}
      
      {/* New header container */}
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
      {step == 5 && (
        <button onClick={handleDone}>Finish</button>
      )}
    </div>
  );
};

export default SetupBusiness;
