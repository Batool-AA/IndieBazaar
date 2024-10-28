import React, { useState } from 'react';
import './profiledetails.css';

const ProfileDetails = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        fullName: 'Kenneth Valdez',
        email: 'fip@jukmuh.al',
        phone: '(239) 816-9029',
        mobile: '(320) 380-4539',
        address: 'Bay Area, San Francisco, CA',
    });

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        setIsEditing(false);
        // Save logic (e.g., API call) can be added here if needed
        console.log("Profile Details Saved:", formData);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className="profile-details">
            {isEditing ? (
                <>
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Full Name"
                    />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
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
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        placeholder="Mobile"
                    />
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Address"
                    />
                    <button onClick={handleSaveClick}>Save</button>
                </>
            ) : (
                <>
                    <h3 className="profile-details__heading">Full Name</h3>
                    <p>{formData.fullName}</p>
                    <h3 className="profile-details__heading">Email</h3>
                    <p>{formData.email}</p>
                    <h3 className="profile-details__heading">Phone</h3>
                    <p>{formData.phone}</p>
                    <h3 className="profile-details__heading">Mobile</h3>
                    <p>{formData.mobile}</p>
                    <h3 className="profile-details__heading">Address</h3>
                    <p>{formData.address}</p>
                    <button className="profile-details__edit-button" onClick={handleEditClick}>Edit</button>
                </>
            )}
        </div>
    );
};

export default ProfileDetails;
