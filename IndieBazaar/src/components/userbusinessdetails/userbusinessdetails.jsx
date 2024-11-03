import React, { useState, useEffect } from 'react';
import './userbusinessdetails.css';
import { getFirestore, collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { useUser } from '../../firebase/usercontext';
import { useNavigate } from 'react-router-dom';

const BusinessDetails = () => {
    const db = getFirestore();
    const user = useUser();
    const navigate = useNavigate();
    const [isEditingName, setIsEditingName] = useState(false); // New state for editing business name
    const [formData, setFormData] = useState({
        name: '',
        category: '',
    });
    const [businessId, setBusinessId] = useState(null);

    useEffect(() => {
        const fetchBusinessDetails = async () => {
            if (user && user.email) {
                const businessCollection = collection(db, 'businesses');
                const q = query(businessCollection, where('email', '==', user.email));
                
                try {
                    const querySnapshot = await getDocs(q);
                    if (!querySnapshot.empty) {
                        const businessData = querySnapshot.docs[0].data();
                        setBusinessId(querySnapshot.docs[0].id);
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

    const handleNameClick = () => {
        setIsEditingName(true); // Enable editing mode when clicking on the name field
    };

    const handleSaveClick = async () => {
        if (businessId) {
            const businessDocRef = doc(db, 'businesses', businessId);
            try {
                await updateDoc(businessDocRef, {
                    name: formData.name,
                    category: formData.category,
                });
                console.log("Business details updated in Firestore.");
                setIsEditingName(false); // Exit editing mode after saving
            } catch (error) {
                console.error("Error updating business details:", error);
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className="business-details">
            <h3 className="business-details__heading">Business Information</h3>
            
            <h3 className="business-details__item">Name</h3>
            {isEditingName ? (
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleSaveClick} // Save on losing focus
                    placeholder="Business Name"
                    autoFocus // Automatically focus input when in editing mode
                />
            ) : (
                <p onClick={handleNameClick} className="business-details__name-display">
                    {formData.name || "Click to add business name"}
                </p>
            )}

            <h3 className="business-details__item">Category</h3>
            <p>{formData.category}</p>

            <button onClick={() => navigate('/edit-business', { state: { businessId } })} className="business-details__edit-button">
                Edit Business
            </button>
        </div>
    );
};

export default BusinessDetails;
