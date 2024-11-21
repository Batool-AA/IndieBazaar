import React, { useState, useEffect } from 'react';
import NavBar from "../../components/navigationbar/navigation";
import food from "../../assets/food.jpg";
import { useLocation, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc, arrayRemove } from 'firebase/firestore';
import { db } from "../../firebase/firebase"; // Adjust path if necessary
import "./editingbusinesspage.css";

const EditingBusinesses = () => { 
    const navigate = useNavigate();
    const location = useLocation();
    const businessId = location.state?.businessId; // Safely extract businessId

    const [items, setItems] = useState([]); // Holds items for UI
    const [businessName, setBusinessName] = useState('');
    const [error, setError] = useState('');

    // Fetch initial business data
    const fetchBusinessData = async () => {
        if (!businessId) {
            setError('Missing or invalid business ID.');
            window.alert('Missing or invalid business ID.');
            return;
        }

        try {
            const docRef = doc(db, "businesses", businessId);
            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {
                const data = docSnap.data();
                setItems(data.items || []); // Set initial items
                setBusinessName(data.name || 'Business Name');
            } else {
                setError('Business not found.');
                window.alert('Business not found.');
            }
        } catch (error) {
            console.error("Error fetching business data:", error);
            setError('Failed to fetch business data.');
            window.alert('Failed to fetch business data.');
        }
    };

    useEffect(() => {
        fetchBusinessData();
    }, [businessId]);

    // Handle item deletion
    const handleDeleteItem = async (itemToDelete) => {
        const confirmed = window.confirm(`Are you sure you want to delete "${itemToDelete.name}"?`);
        if (confirmed) {
            try {
                const docRef = doc(db, "businesses", businessId);
                await updateDoc(docRef, {
                    items: arrayRemove(itemToDelete)
                });
                await fetchBusinessData();
            } catch (error) {
                console.error("Error deleting item:", error);
            }
        }
    };

    // Handle navigation to add-item and edit-item pages
    const handleAddItem = () => {
        if (!businessId) return;
        navigate('/add-more-items', { state: { businessId } });
    };

    const handleEditItem = (item) => {
        if (!businessId) return;
        navigate('/edit-item', { state: { businessId: businessId, itemToEdit: item } }); // Pass as state
    };

    // Handle done button navigation
    const handleDone = () => {
        if (!businessId) return;
        navigate('/user-profile', { state: { businessId }}); // Adjust the navigation path as needed
    };

    // If there's an error, show it using window.alert and don't render the page content
    if (error) {
        return null; // Prevent rendering if there is an error, but we already show the alert
    }

    return (
        <div className="editing-businesses-container">
            <NavBar title={`Edit Your Business Items - ${businessName}`} />
            <div className="editing-content-container">
                <div className="editing-items-container">
                    {items.map((item, index) => (
                        <div 
                            key={index} 
                            className="category-card editing-item-card"
                            onClick={() => handleEditItem(item)} // Add click handler for editing
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => e.key === 'Enter' && handleEditItem(item)} // Accessibility: allow keyboard navigation
                        >
                            <p>{item.name}</p>
                            <img src={item.image || food} alt={item.name} />
                            <button 
                                className="delete-button" 
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevent triggering item click
                                    handleDeleteItem(item);
                                }}
                            >
                                &ndash;
                            </button>
                        </div>
                    ))}
                </div>
                <div className="editing-buttons-container">
                    <button className="add-item-button" onClick={handleAddItem}>
                        Add Item
                    </button>
                    <button className="add-item-button" onClick={handleDone}>
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditingBusinesses;
