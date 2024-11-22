import React, { useState, useEffect } from 'react';
import { auth, db } from '../../firebase/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import NavBar from '../../components/navigationbar/navigation';
import ProfileDetails from '../../components/profiledetails/profiledetails';
import BusinessDetails from '../../components/userbusinessdetails/userbusinessdetails';
import './userprofile.css';
import mainlogo from '../../assets/logoimage.jpg'

const UserProfile = () => {
    const [usertype, setUsertype] = useState(null); // state to store the user type

    useEffect(() => {
        // Fetch user type from Firestore when component mounts
        const fetchUsertype = async () => {
            try {
                const user = auth.currentUser;
                if (user) {
                    const userEmail = user.email; // Get the user's email
                    const usersCollection = collection(db, 'users'); // Firestore collection
                    const q = query(usersCollection, where('email', '==', userEmail)); // Query by email

                    const querySnapshot = await getDocs(q);
                    if (!querySnapshot.empty) {
                        const fetchedUsertype = querySnapshot.docs[0].data().usertype; // Get user type from the document
                        console.log("Usertype:", fetchedUsertype); // Debug log
                        setUsertype(fetchedUsertype);
                    } else {
                        console.log("No user found with this email.");
                    }
                } else {
                    console.log("User not logged in.");
                }
            } catch (error) {
                console.error("Error fetching usertype:", error);
            }
        };

        fetchUsertype();
    }, []);

    return (
        <div className="user-profile-page">
            <NavBar title="IndieBazaar" logoSrc={mainlogo}/>
            <div className="user-profile">
                <div className="user-profile__sidebar">
                    {/* Sidebar content */}
                </div>
                <div className="user-profile__content">
                    <ProfileDetails />
                    {usertype === "seller" && <BusinessDetails />}
                </div>
            </div> 
        </div>
    );
};

export default UserProfile;
