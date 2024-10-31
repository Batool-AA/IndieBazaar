import React, { useState, useEffect } from 'react';
import './profiledetails.css';
import { useUser } from '../../firebase/usercontext';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

const ProfileDetails = () => {
    const user = useUser();
    const db = getFirestore(); // Initialize Firestore
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        mobile: '',
        address: '',
    });

    useEffect(() => {
        const fetchUserData = async () => {
            if (user && user.email) {
                const userCollection = collection(db, 'users'); // Change 'users' to your actual collection name
                const q = query(userCollection, where('email', '==', user.email));
                
                try {
                    const querySnapshot = await getDocs(q);
                    if (!querySnapshot.empty) {
                        const userData = querySnapshot.docs[0].data();
                        setFormData({
                            fullName: userData.fullName || '',
                            email: userData.email || '',
                            phone: userData.phone || '',
                            mobile: userData.mobile || '',
                            address: userData.address || '',
                        });
                    } else {
                        console.log("No user found for this email.");
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            }
        };

        fetchUserData();
    }, [user, db]);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = async () => {
        setIsEditing(false);
        // Save logic (e.g., API call to update Firestore) can be added here
        console.log("Profile Details Saved:", formData);
        // You can add Firestore update logic here if needed
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
                        readOnly // Make email read-only if it shouldn't be edited
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
