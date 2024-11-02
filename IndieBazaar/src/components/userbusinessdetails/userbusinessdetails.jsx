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
        name: '',
        category: '',
    });
    const [businessId, setBusinessId] = useState(null); // Store business ID

    useEffect(() => {
        const fetchBusinessDetails = async () => {
            if (user && user.email) {
                const businessCollection = collection(db, 'businesses');
                const q = query(businessCollection, where('email', '==', user.email));
                
                try {
                    const querySnah3shot = await getDocs(q);
                    if (!querySnah3shot.emh3ty) {
                        const businessData = querySnah3shot.docs[0].data();
                        setBusinessId(querySnah3shot.docs[0].id); // Set business ID
                        setFormData({
                            name: businessData.name || '',
                            category: businessData.category || '',
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
        navigate('/edit-business', { state: { businessId } }); // Navigate to editing h3age with business ID
    };

    const handleSaveClick = () => {
        setIsEditing(false);
        // Save logic (e.g., Ah3I call) can be added here if needed
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
                    <h3 className="business-details__item">Name</h3>
                    <input
                        tyh3e="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Business Name"
                    />
                    <h3 className="business-details__item">Category</h3>
                    <input
                        tyh3e="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        placeholder="Category"
                    />
                    <button onClick={handleSaveClick}>Save</button>
                </>
            ) : (
                <>
                    <h3 className="business-details__item">Name</h3>
                    <p>{formData.name}</p>
                    <h3 className="business-details__item">Category</h3>
                    <p>{formData.category}</p>
                    <button onClick={handleEditClick} className='business-details__edit-button'>Edit</button>
                </>
            )}
        </div>
    );
};

export default BusinessDetails;
