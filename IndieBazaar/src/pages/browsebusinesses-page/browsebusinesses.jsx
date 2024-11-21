import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from "../../firebase/firebase"; // Import your Firestore instance here
import DropDown from "../../components/dropdown/dropdown";
import NavBar from "../../components/navigationbar/navigation";
import FilterBox from "../../components/filter-box/filterbox";
import { useParams } from 'react-router-dom';
import "./browsebusinesses.css";
import { useNavigate } from 'react-router-dom';

const BrowseBusinesses = () => {
    const { category } = useParams(); // Get the category from URL parameters
    const [businesses, setBusinesses] = useState([]); // State for businesses
    const [selectedBusiness, setSelectedBusiness] = useState(''); // State for selected business
    const [businessNames, setBusinessNames] = useState([]); // State for business names for dropdown

    const navigate = useNavigate(); // Initialize useNavigate

    // Function to handle business card click
    const handleBusinessClick = (business) => {
        navigate(`/business-home/${business.id}`); // Navigate to BusinessPage with business ID
    };

    // Fetch businesses from Firebase based on category
    useEffect(() => {
        const fetchBusinesses = async () => {
            try {
                console.log("Fetching businesses for category:", category); // Log the category being queried

                // Use array-contains to check if the category exists in the array
                const q = query(
                    collection(db, "businesses"), // Use the Firestore instance (db)
                    where("category", "array-contains", category) // Use array-contains for array fields
                );

                const querySnapshot = await getDocs(q);
                console.log("Documents retrieved:", querySnapshot.docs.length); // Log the number of documents found

                if (querySnapshot.empty) {
                    console.log("No matching documents found."); // Log if no documents match
                    return; // Exit if no documents are found
                }

                // Map the fetched documents to an array of businesses
                const fetchedBusinesses = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                console.log("Fetched businesses:", fetchedBusinesses); // Log the fetched data

                // Set state with the fetched businesses and names
                setBusinesses(fetchedBusinesses);
                setBusinessNames(fetchedBusinesses.map(business => business.name)); // Set business names for dropdown
            } catch (error) {
                console.error("Error fetching businesses: ", error);
            }
        };

        fetchBusinesses();
    }, [category]); // Depend on category to refetch when it changes

    // Filter by selected business name
    useEffect(() => {
        const filterBusinessByName = () => {
            if (selectedBusiness) {
                const filteredBusiness = businesses.filter(
                    business => business.name === selectedBusiness
                );
                setBusinesses(filteredBusiness);
            } else {
                // If no specific business is selected, show all businesses in the category
                setBusinesses(businesses);
            }
        };

        filterBusinessByName();
    }, [selectedBusiness, businesses]);

    const handleBusinessSelect = (businessName) => {
        setSelectedBusiness(businessName); // Set the selected business name
    };

    return (
        <div className="browse-businesses-container">
            <div className="browse-page-header">
                <NavBar title="IndieBazaar" />
            </div>
            
            {/* Business Name Dropdown */}
            <DropDown 
                options={businessNames} 
                onSelect={handleBusinessSelect} 
            />
            <div className="browse-content-container">
                <div className="browse-filter-box-container">
                    <FilterBox />
                </div>
                <div className="businesses-container">
                    {businesses.length > 0 ? (
                        businesses.map((business) => (
                            <div key={business.id} className="category-card business-card" onClick={() => handleBusinessClick(business)}>  
                                <p>{business.name}</p>
                                <img src={business.logo} alt={business.name} />
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
