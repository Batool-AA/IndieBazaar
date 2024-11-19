import React, { useState, useEffect, useRef } from 'react';
import '../../pages/setupbusiness-page/setupbusiness.css'; // Ensure you have this CSS file for styles
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const StepFiveBusinessLogo = ({ onNext, businessLogo, setBusinessLogo }) => {
  const [logo, setLogo] = useState(businessLogo);
  const [errors, setErrors] = useState('');
  const [isUploading, setIsUploading] = useState(false); // New state for loading
  const fileInputRef = useRef(null);

  // Update the local state if the businessLogo prop changes (in case it's updated in the parent)
  useEffect(() => {
    setLogo(businessLogo);
  }, [businessLogo]);

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp'];
      if (!validImageTypes.includes(file.type)) {
        setErrors('Please upload a valid image file');
        return;
      }

      const storage = getStorage();
      const storageRef = ref(storage, `logos/${Date.now()}_${file.name}`);
      try {
        // Clear any previous errors
        setErrors('');
        setIsUploading(true); // Set loading state to true while uploading
        await uploadBytes(storageRef, file);
        const logoURL = await getDownloadURL(storageRef);
        setLogo(logoURL);
        setIsUploading(false); // Set loading state to false once upload is done
      } catch (error) {
        console.error("Error uploading file: ", error); 
        setErrors('There was an error uploading the logo. Please try again.');
        setIsUploading(false); // Ensure loading state is turned off on error
      }
    }
  };

  const handleNext = () => {
    if (!logo) {
      setErrors('Please upload a logo');
      return;
    }

    setBusinessLogo(logo); // Save the logo URL to the parent state
    onNext(); // Proceed to the next step
  };

  return (
    <div className="step-container">
      <p className="prompt">Upload your business logo.</p>
      <div className="input-container">
        <input
          type="file"
          accept="image/*" // Only accept specific image formats
          onChange={handleLogoUpload}
          required
          className='image-upload'
          ref={fileInputRef} 
        />
        {errors && <p className="error-message">{errors}</p>} 
        <button
          className="next-button"
          onClick={handleNext}
          disabled={isUploading} // Disable button while uploading
        >
          {isUploading ? 'Uploading...' : 'Next'} {/* Change button text while uploading */}
        </button>
      </div>
    </div> 
  );
};

export default StepFiveBusinessLogo;
