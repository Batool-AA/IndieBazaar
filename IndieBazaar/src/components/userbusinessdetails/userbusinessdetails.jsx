import React, { useState, useEffect } from 'react';
import './userbusinessdetails.css';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { useUser } from '../../firebase/usercontext';
import { useNavigate } from 'react-router-dom';

const BusinessDetails = () => {
    const db = getFirestore(); // Initialize Firestore
    const user = useUser(); // Get current user information
    const navigate = useNavigate(); // Initialize navigation
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        category: '',
        location: '',
        phone: '',
        website: '',
    });
    const [businessId, setBusinessId] = useState(null); // Store business ID

    useEffect(() => {
        const fetchBusinessDetails = async () => {
            if (user && user.email) {
                const businessCollection = collection(db, 'businesses');
                const q = query(businessCollection, where('email', '==', user.email));
                
                try {
                    const querySnapshot = await getDocs(q);
                    if (!querySnapshot.empty) {
                        const businessData = querySnapshot.docs[0].data();
                        setBusinessId(querySnapshot.docs[0].id); // Set business ID
                        setFormData({
                            category: businessData.category || '',
                            // Uncomment and use if needed
                            // location: businessData.location || '',
                            // phone: businessData.phone || '',
                            // website: businessData.website || '',
                        });
                    } else {
                        console.log("No business found for this user.");
                    }
                } catch (error) {
                    console.error("Error fetching business details:", error);
                }
            }
        };

        fetchBusinessDetails();
    }, [user, db]);

    const handleEditClick = () => {
        console.log('business')
        console.log(businessId)
        navigate('/edit-business', { state: { businessId } }); // Navigate to editing page with business ID
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
                    <button onClick={handleSaveClick}>Save</button>
                </>
            ) : (
                <>
                    <p className="business-details__item">Category: {formData.category}</p>
                    <button onClick={handleEditClick}>Edit</button>
                </>
            )}
        </div>
    );
};

export default BusinessDetails;
