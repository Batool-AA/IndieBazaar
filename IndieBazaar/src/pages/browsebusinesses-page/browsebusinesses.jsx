import React, { useState, useEffect } from 'react';
import NavBar from "../../components/navigationbar/navigation";
import SearchBar from "../../components/searchbar/searchbar";
import FilterBox from "../../components/filter-box/filterbox";
import accessory from "../../assets/acc.jpg";
import food from "../../assets/food.jpg";
import clothes from "../../assets/clothes.jpg";
import decor from "../../assets/decor.jpg";
import { useParams } from 'react-router-dom';
import "./browsebusinesses.css";

// Mock data for demonstration (Replace with actual data or API call)
const mockBusinesses = [
    { name: 'Organic Bites', category: 'Food', image: food },
    { name: 'Elegant Accessories', category: 'Accessories', image: accessory },
    { name: 'Trendy Clothes', category: 'Clothes', image: clothes },
    { name: 'Home Decor Galore', category: 'Decor', image: decor },
    // Add more businesses as needed
];

const BrowseBusinesses = () => {
    const { category } = useParams();
    const [businesses, setBusinesses] = useState([]);

    useEffect(() => {
        // Filter businesses based on the selected category
        const filteredBusinesses = mockBusinesses.filter(
            business => business.category.toLowerCase() === category.toLowerCase()
        );
        setBusinesses(filteredBusinesses);
    }, [category]);

    return (
        <div className="browse-businesses-container">
            <NavBar title="IndieBazaar - Browse Businesses" />
            <SearchBar />
            <div className="browse-content-container">
                <div className="browse-filter-box-container">
                    <FilterBox />
                </div>
                <div className="businesses-container">
                    {businesses.length > 0 ? (
                        businesses.map((business, index) => (
                            <div key={index} className="business-card">
                                <p>{business.name}</p>
                                <img src={business.image} alt={business.name} />
                            </div>
                        ))
                    ) : (
                        <p>No businesses found in this category.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BrowseBusinesses;
