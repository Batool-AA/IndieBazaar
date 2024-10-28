import React, { useState } from 'react';
import StepOneBusinessName from '../../components/businessname/businessname.jsx';
import StepTwoBusinessDescription from '../../components/businessdesc/businessdesc.jsx';
import StepThreeBusinessCategory from '../../components/businesscategory/businesscat.jsx';
import AddItemForm from '../../components/additem/additem.jsx';
import ItemList from '../../components/itemlist/itemlist.jsx';
import './SetupBusiness.css';
import { getFirestore } from 'firebase/firestore';
import { collection } from 'firebase/firestore';

const SetupBusiness = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => { 
    setStep(step + 1);
  };

  const categoriesRef = collection(db, 'businessesssss');

  return (
    <div className="setup-business-container">
      <div className="back-arrow">&#8592;</div>
      
      {/* New header container */}
      <div className="header-container">
        <h1>Hi Seller!</h1>
        <p className="subtitle">Let's Set Up Your Business</p>
      </div>

      {step === 1 && <StepOneBusinessName onNext={nextStep} />}
      {step === 2 && <StepTwoBusinessDescription onNext={nextStep} />}
      {step === 3 && <StepThreeBusinessCategory onNext={nextStep} />}
      {step === 4 && <AddItemForm onNext={nextStep} />}
    </div>
  );
};

export default SetupBusiness;
