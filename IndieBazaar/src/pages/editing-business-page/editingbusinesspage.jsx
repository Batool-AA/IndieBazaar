import React, { useState, useEffect } from 'react';
import NavBar from "../../components/navigationbar/navigation";
import DropDown from "../../components/dropdown/dropdown";
import FilterBox from "../../components/filter-box/filterbox";
import food from "../../assets/food.jpg";
import clothes from "../../assets/clothes.jpg";
import { useNavigate } from 'react-router-dom';
import "./editingbusinesspage.css";

const EditingBusinesses = () => {
    const navigate = useNavigate();
    
    // Sample items for demonstration. Replace this with your data fetching logic.
    const [items, setItems] = useState([
        { id: 1, name: 'Item 1', image: food},
        { id: 2, name: 'Item 2', image: clothes },
        // Add more items as needed
    ]);

    // Function to handle item deletion
    const handleDeleteItem = (id) => {
        setItems(items.filter(item => item.id !== id));
        // Add Firestore delete logic here
    };

    // Function to navigate to Add Item page
    const handleAdditem = () => {
        navigate('/setbusiness', { state: { startAtStep4: true } });
    };

    return (
        <div className="editing-businesses-container">
            <NavBar title="Edit Your Business Items" />
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
                            <img src={item.image} alt={item.name} />
                            <button className="delete-button" onClick={() => handleDeleteItem(item.id)}>
                                &ndash; {/* Minus sign */}
                            </button>
                        </div>
                    ))}
                    <button className="editing-add-item-button" onClick={handleAdditem}>
                        Add Item
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditingBusinesses;
