import React, { useState, useEffect } from 'react';
import NavBar from "../../components/navigationbar/navigation";
import DropDown from "../../components/dropdown/dropdown";
import FilterBox from "../../components/filter-box/filterbox";
import food from "../../assets/food.jpg";
import { useLocation, useNavigate } from 'react-router-dom';
import { doc, getDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from "../../firebase/firebase"; // Adjust path if necessary
import "./editingbusinesspage.css";

const EditingBusinesses = () => { 
    const navigate = useNavigate();
    const location = useLocation();
    const { businessId } = location.state; // Get business ID from state

    const [items, setItems] = useState([]);
    const [businessName, setBusinessName] = useState(''); // State for business name

    // Fetch business data and items
    const fetchBusinessData = async () => {
        try {
            const docRef = doc(db, "businesses", businessId);
            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {
                const data = docSnap.data();
                const items = data.items || []; // Fetch items
                setItems(items);
                setBusinessName(data.name || 'Business Name'); // Set business name from data
            } else {
                console.log("No such document!");
            }
        } catch (error) {
            console.error("Error fetching business data:", error);
        }
    };

    useEffect(() => {
        fetchBusinessData(); // Fetch business data on mount
    }, [businessId]); // Depend on businessId

    // Function to handle item deletion
    const handleDeleteItem = async (id) => {
        try {
            // Remove the item from Firestore
            const docRef = doc(db, "businesses", businessId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                const updatedItems = data.items.filter(item => item.id !== id); // Remove item by id
                
                // Update the document in Firestore without the deleted item
                await updateDoc(docRef, { items: updatedItems });
                
                // Update the items state to reflect the deletion
                setItems(updatedItems);
            }
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    };

    const handleAddItem = () => {
        navigate('/add-more-items', { state: { businessId } });
    };

    return (
        <div className="editing-businesses-container">
            <NavBar title={`Edit Your Business Items - ${businessName}`} /> {/* Include business name */}
            {/* Dropdown and filter components */}
            <DropDown options={['Option 1', 'Option 2']} onSelect={() => {}} />
            <div className="editing-content-container">
                <div className="editing-filter-box-container">
                    <FilterBox />
                </div>
                <div className="editing-items-container">
                    {items.map(item => (
                        <div key={item.id} className="editing-item-card">
                            <p>{item.name}</p>
                            <img src={item.image || food} alt={item.name} /> {/* Default image if none */}
                            <button className="delete-button" onClick={() => handleDeleteItem(item.id)}>
                                &ndash; {/* Minus sign */}
                            </button>
                        </div>
                    ))}
                    <button className="editing-add-item-button" onClick={handleAddItem}>
                        Add Item
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditingBusinesses;
