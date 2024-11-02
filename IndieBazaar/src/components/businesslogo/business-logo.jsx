import React, { useState } from 'react';
import '../../pages/setupbusiness-page/setupbusiness.css'; // Ensure you have this CSS file for styles
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const StepFiveBusinessLogo = ({ onNext, businessLogo, setBusinessLogo }) => {
  const [logo, setLogo] = useState(businessLogo);
  const [errors, setErrors] = useState('');

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const storage = getStorage();
      const storageRef = ref(storage, `logos/${Date.now()}_${file.name}`);
      try {
        await uploadBytes(storageRef, file);
        const logoURL = await getDownloadURL(storageRef);
        setLogo(logoURL);
      } catch (error) {
        console.error("Error uploading file: ", error); 
      }
    }
  };

  const handleNext = () => {
    if (!logo) {
      setErrors('Please upload a logo');
      return;
    }

    setBusinessLogo(logo); // Save the logo URL
    onNext(); // Proceed to the next step
  };

  return (
    <div className="step-container">
      <p className="prompt">Upload your business logo.</p>
      <div className="input-container">
        <input
          type="file"
          accept="image/*" // Accept only image files
          onChange={handleLogoUpload}
          required
          className='image-upload'
        />
        {errors && <p className="error-message">{errors}</p>} 
        <button className="next-button" onClick={handleNext}>Next</button>
      </div>
    </div> 
  );
};

export default StepFiveBusinessLogo;
