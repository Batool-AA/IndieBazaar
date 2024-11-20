import React, { useState, useEffect } from 'react';
import '../setupbusiness-page/setupbusiness.css';
import { useLocation, useNavigate } from 'react-router-dom';
import EditItem from '../../components/edititem/edititem'; // Adjust import path as needed
import { useUser } from '../../firebase/usercontext'; // Assuming this hook gives the logged-in user info
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

const EditItemPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const user = useUser(); // Get the user data from context
    const db = getFirestore();
    const [userType, setUserType] = useState(null); // State to hold the user type

    const { businessId, itemToEdit } = location.state; // Extract businessId and itemToEdit from state

    // Fetch user type from Firestore based on user email
    useEffect(() => {
        const fetchUserType = async () => {
            if (user && user.email) {
                const userRef = collection(db, 'users');
                const q = query(userRef, where('email', '==', user.email));

                try {
                    const querySnapshot = await getDocs(q);
                    if (!querySnapshot.empty) {
                        const userDoc = querySnapshot.docs[0];
                        const userData = userDoc.data();
                        setUserType(userData.usertype); // Set usertype from Firestore
                    } else {
                        console.log('No user document found for this email.');
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            }
        };

        if (user && user.email) {
            fetchUserType();
        }
    }, [user, db]);

    // Redirect based on user type
    useEffect(() => {
        if (userType === 'buyer') {
            navigate('/store'); // Redirect to store if user is a buyer
        }
    }, [userType, navigate]);

    return (
        <div className="setup-business-container">
            {/* Pass businessId and itemToEdit to the EditItem component */}
            <EditItem businessId={businessId} itemToEdit={itemToEdit} />
        </div>
    );
};

export default EditItemPage;
