// ProfileCard.jsx
import React, { useState } from 'react';
import './profilecard.css';

const ProfileCard = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [businessName, setBusinessName] = useState("John's Bakery");
    const [businessDescription, setBusinessDescription] = useState("Authentic homemade baked goods");
    const [imageURL, setImageURL] = useState("/path/to/business.jpg");

    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    const handleSave = () => {
        setIsEditing(false);
    };

    return (
        <div className="profile-card">
            {isEditing ? (
                <>
                    <input
                        type="text"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        className="profile-card__input"
                    />
                    <input
                        type="text"
                        value={businessDescription}
                        onChange={(e) => setBusinessDescription(e.target.value)}
                        className="profile-card__input"
                    />
                    <input
                        type="text"
                        value={imageURL}
                        onChange={(e) => setImageURL(e.target.value)}
                        className="profile-card__input"
                        placeholder="Image URL"
                    />
                    <button onClick={handleSave} className="profile-card__button save-button">Save</button>
                </>
            ) : (
                <>
                    <img src={imageURL} alt="Business" className="profile-card__image" />
                    <h2 className="profile-card__name">{businessName}</h2>
                    <p className="profile-card__description">{businessDescription}</p>
                    <button onClick={toggleEdit} className="profile-card__button edit-button">Edit</button>
                </>
            )}
        </div>
    );
};

export default ProfileCard;
