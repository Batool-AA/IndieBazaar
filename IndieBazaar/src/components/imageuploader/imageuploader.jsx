import React, { useState } from 'react';

const ImageUploader = () => {
  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(URL.createObjectURL(file));
  };

  return (
    <div className="image-uploader">
      {image ? (
        <img src={image} alt="Uploaded item" className="uploaded-image" />
      ) : (
        <div className="placeholder">Upload item image</div>
      )}
      <input type="file" onChange={handleImageUpload} />
    </div>
  );
};

export default ImageUploader;