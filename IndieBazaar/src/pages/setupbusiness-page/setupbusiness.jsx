import React, { useState } from 'react';
import StepOneBusinessName from '../../components/businessname/businessname.jsx';
import StepTwoBusinessDescription from '../../components/businessdesc/businessdesc.jsx';
import StepThreeBusinessCategory from '../../components/businesscategory/businesscat.jsx';
import AddItemForm from '../../components/additem/additem.jsx';
import './SetupBusiness.css';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const SetupBusiness = () => {
  const [step, setStep] = useState(1);
  const db = getFirestore();
  const categoriesRef = collection(db, 'businesses'); // Firestore collection reference

  // State variables for business details
  const [businessName, setBusinessName] = useState('');
  const [businessDescription, setBusinessDescription] = useState('');
  const [businessCategories, setBusinessCategories] = useState([]);
  const [businessitems,setBusinessitems] = useState([])

  const nextStep = () => { 
    setStep(step + 1);
  };

  const handleDone = () => {
    addDoc(categoriesRef, { name: businessName, description: businessDescription, category: businessCategories, items: businessitems});
  }

  return (
    <div className="setup-business-container">
      <div className="back-arrow">&#8592;</div>
      
      {/* New header container */}
      <div className="header-container">
        <h1>Hi Seller!</h1>
        <p className="subtitle">Let's Set Up Your Business</p>
      </div>

      {step === 1 && (
        <StepOneBusinessName 
          onNext={nextStep} 
          businessName={businessName}
          setBusinessName={setBusinessName}
          categoriesRef={categoriesRef}
        />
      )}
      {step === 2 && (
        <StepTwoBusinessDescription 
          onNext={nextStep} 
          businessDescription={businessDescription}
          setBusinessDescription={setBusinessDescription}
          categoriesRef={categoriesRef} 
        />
      )}
      {step === 3 && (
        <StepThreeBusinessCategory 
          onNext={nextStep} 
          businessCategory={businessCategories}
          setBusinessCategories={setBusinessCategories}
          categoriesRef={categoriesRef} 
        />
      )}
      {step === 4 && (
        <AddItemForm 
          onNext={nextStep} 
          businessitems={businessitems}
          setBusinessitems={setBusinessitems}
          categoriesRef={categoriesRef} 

        />
      )}
      <button onClick={handleDone}>Next</button>
    </div>
  );
};

export default SetupBusiness;
