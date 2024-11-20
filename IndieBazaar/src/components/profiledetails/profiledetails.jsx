import React, { useState, useEffect } from 'react';
import './profiledetails.css';
import { useUser } from '../../firebase/usercontext';
import { getFirestore, collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const ProfileDetails = () => {
    const user = useUser();
    const db = getFirestore();
    const auth = getAuth();
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        email: '', 
        password: '',
        username: '',
        usertype: '',
    });
    const [userId, setUserId] = useState(null); // To store the user document ID

    useEffect(() => {
        const fetchUserData = async () => {
            if (user && user.email) {
                const userCollection = collection(db, 'users');
                const q = query(userCollection, where('email', '==', user.email));
                
                try {
                    const querySnapshot = await getDocs(q);
                    if (!querySnapshot.empty) {
                        const userDoc = querySnapshot.docs[0];
                        setUserId(userDoc.id); // Store the document ID for updates
                        const userData = userDoc.data();
                        setFormData({
                            email: userData.email || '',
                            password: userData.password || '',
                            username: userData.username || '',
                            usertype: userData.usertype || '',
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
        if (userId) {
            const userDocRef = doc(db, 'users', userId);
            try {
                await updateDoc(userDocRef, {
                    username: formData.username,
                    password: formData.password,
                });
                console.log("Profile Details Updated:", formData);
                setIsEditing(false); // Exit editing mode after saving
            } catch (error) {
                console.error("Error updating user data:", error);
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            console.log("User signed out");
            navigate("/"); // Redirect to homepage
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    return (
        <div className="profile-details">
            {isEditing ? (
                <>
                    <h3 className="profile-details__heading">Email</h3>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        readOnly
                        placeholder="Email"
                    />
                    <h3 className="profile-details__heading">Password</h3>
                    <input
                        type="text"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                    />
                    <h3 className="profile-details__heading">Username</h3>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Username"
                    />
                    <h3 className="profile-details__heading">User Type</h3>
                    <input
                        type="text"
                        name="usertype"
                        value={formData.usertype}
                        readOnly
                        placeholder="User Type"
                    />
                    <div className="profile-details__button-container">
                        <button className="profile-details__edit-button" onClick={handleSaveClick}>Save</button>
                    </div>
                </>
            ) : (
                <>
                    <h3 className="profile-details__heading">Email</h3>
                    <p>{formData.email}</p>
                    <h3 className="profile-details__heading">Password</h3>
                    <p>{formData.password}</p>
                    <h3 className="profile-details__heading">Username</h3>
                    <p>{formData.username}</p>
                    <h3 className="profile-details__heading">User Type</h3>
                    <p>{formData.usertype}</p>
                    <div className="profile-details__button-container">
                        <button className="profile-details__edit-button" onClick={handleEditClick}>Edit</button>
                        <button className="profile-details__logout-button" onClick={handleLogout}>Logout</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default ProfileDetails;
