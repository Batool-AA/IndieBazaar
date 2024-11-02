import React, { useState, useEffect } from 'react';
import NavBar from "../../components/navigationbar/navigation";
import food from "../../assets/food.jpg";
import { useLocation, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from "../../firebase/firebase"; // Adjust path if necessary
import "./editingbusinesspage.css";

const EditingBusinesses = () => { 
    const navigate = useNavigate();
    const location = useLocation();
    const { businessId } = location.state;

    const [items, setItems] = useState([]);
    const [businessName, setBusinessName] = useState('');

    const fetchBusinessData = async () => {
        try {
            const docRef = doc(db, "businesses", businessId);
            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {
                const data = docSnap.data();
                const items = data.items || [];
                setItems(items);
                setBusinessName(data.name || 'Business Name');
            } else {
                console.log("No such document!");
            }
        } catch (error) {
            console.error("Error fetching business data:", error);
        }
    };

    useEffect(() => {
        fetchBusinessData();
    }, [businessId]);

    const handleDeleteItem = async (id) => {
        try {
            const docRef = doc(db, "businesses", businessId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                const updatedItems = data.items.filter(item => item.id !== id);
                
                await updateDoc(docRef, { items: updatedItems });
                
                setItems(updatedItems);
            }
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    };

    const handleAddItem = () => {
        navigate('/add-more-items', { state: { businessId } });
    };

    const handleDone = () => {
        navigate('/user-profile',  { state: { businessId }} ); // Adjust the navigation path as needed
    };

    return (
        <div className="editing-businesses-container">
            <NavBar title={`Edit Your Business Items - ${businessName}`} />
            <div className="editing-content-container">
                <div className="editing-items-container">
                    {items.map(item => (
                        <div key={item.id} className="category-card editing-item-card">
                            <p>{item.name}</p>
                            <img src={item.image || food} alt={item.name} />
                            <button className="delete-button" onClick={() => handleDeleteItem(item.id)}>
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
