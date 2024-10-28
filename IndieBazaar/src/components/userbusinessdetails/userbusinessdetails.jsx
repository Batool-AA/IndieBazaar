import React, { useState } from 'react';
import './userbusinessdetails.css';

const BusinessDetails = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        category: 'Bakery',
        location: 'San Francisco, CA',
        phone: '(555) 123-4567',
        website: 'www.johnsbakery.com',
    });

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        setIsEditing(false);
        // Save logic (e.g., API call) can be added here if needed
        console.log("Business Details Saved:", formData);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className="business-details">
            <h3 className="business-details__heading">Business Information</h3>
            {isEditing ? (
                <>
                    <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        placeholder="Category"
                    />
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="Location"
                    />
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone"
                    />
                    <input
                        type="text"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        placeholder="Website"
                    />
                    <button onClick={handleSaveClick}>Save</button>
                </>
            ) : (
                <>
                    <p className="business-details__item">Category: {formData.category}</p>
                    <p className="business-details__item">Location: {formData.location}</p>
                    <p className="business-details__item">Phone: {formData.phone}</p>
                    <p className="business-details__item">
                        Website: <a href="#">{formData.website}</a>
                    </p>
                    <button onClick={handleEditClick}>Edit</button>
                </>
            )}
        </div>
    );
};

export default BusinessDetails;
