import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from "../../firebase/firebase"; // Import your Firestore instance here
import DropDown from "../../components/dropdown/dropdown";
import NavBar from "../../components/navigationbar/navigation";
import FilterBox from "../../components/filter-box/filterbox";
import { useLocation, useNavigate } from 'react-router-dom';
import "./browsebusinesses.css";
import mainlogo from '../../assets/logoimage.jpg';

const BrowseBusinesses = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [businesses, setBusinesses] = useState([]); // State for businesses
    const [selectedBusiness, setSelectedBusiness] = useState(''); // State for selected business
    const [businessNames, setBusinessNames] = useState([]); // State for business names for dropdown

    // Define all possible categories
    const allCategories = ['Food', 'Accessories', 'Clothes', 'Decor', 'Health', 'Book', 'Stationary', 'Handmade'];

    // Parse query parameters
    const searchParams = new URLSearchParams(location.search);
    const categoriesParam = searchParams.get('categories');
    const selectedCategories = categoriesParam ? categoriesParam.split(',').map(decodeURIComponent) : [];

    // Function to handle business card click
    const handleBusinessClick = (business) => {
        navigate(`/business-home/${business.id}`); // Navigate to BusinessPage with business ID
    };

    // Fetch businesses from Firebase based on selectedCategories
    useEffect(() => {
        const fetchBusinesses = async () => {
            try {
                console.log("Fetching businesses for categories:", selectedCategories); // Log the categories being queried

                let q;
                if (selectedCategories.length > 0) {
                    q = query(
                        collection(db, "businesses"), // Use the Firestore instance (db)
                        where("category", "array-contains-any", selectedCategories) // Use array-contains-any for multiple categories
                    );
                } else {
                    q = collection(db, "businesses");
                }

                const querySnapshot = await getDocs(q);
                console.log("Documents retrieved:", querySnapshot.docs.length); // Log the number of documents found

                if (querySnapshot.empty) {
                    console.log("No matching documents found."); // Log if no documents match
                    setBusinesses([]);
                    setBusinessNames([]);
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
    }, [selectedCategories]); // Depend on selectedCategories to refetch when it changes

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
                // To reset, you need to refetch
                // So re-fetch based on selectedCategories
                const fetchBusinesses = async () => {
                    try {
                        console.log("Refetching businesses for categories:", selectedCategories); // Log the categories being queried

                        let q;
                        if (selectedCategories.length > 0) {
                            q = query(
                                collection(db, "businesses"),
                                where("category", "array-contains-any", selectedCategories)
                            );
                        } else {
                            q = collection(db, "businesses");
                        }

                        const querySnapshot = await getDocs(q);
                        console.log("Documents retrieved:", querySnapshot.docs.length);

                        if (querySnapshot.empty) {
                            console.log("No matching documents found.");
                            setBusinesses([]);
                            setBusinessNames([]);
                            return;
                        }

                        const fetchedBusinesses = querySnapshot.docs.map(doc => ({
                            id: doc.id,
                            ...doc.data()
                        }));

                        setBusinesses(fetchedBusinesses);
                        setBusinessNames(fetchedBusinesses.map(business => business.name));
                    } catch (error) {
                        console.error("Error fetching businesses: ", error);
                    }
                };

                fetchBusinesses();
            }
        };

        filterBusinessByName();
    }, [selectedBusiness, selectedCategories]); // Depend on selectedBusiness and selectedCategories

    const handleBusinessSelect = (businessName) => {
        setSelectedBusiness(businessName); // Set the selected business name
    };

    // Handle filter change from FilterBox
    const handleFilterChange = (categoryName, isChecked) => {
        let newSelectedCategories;
        if (isChecked) {
            newSelectedCategories = [...selectedCategories, categoryName];
        } else {
            newSelectedCategories = selectedCategories.filter(name => name !== categoryName);
        }

        // Update the URL with new selected categories
        if (newSelectedCategories.length > 0) {
            const encodedCategories = newSelectedCategories.map(encodeURIComponent).join(',');
            navigate(`/browse?categories=${encodedCategories}`, { replace: true });
        } else {
            navigate('/browse', { replace: true });
        }
    };

    return (
        <div className="browse-businesses-container">
            <div className="browse-page-header">
                <NavBar title="IndieBazaar" logoSrc={mainlogo}/>
            </div>
            
            {/* Business Name Dropdown */}
            <DropDown 
                options={businessNames} 
                onSelect={handleBusinessSelect} 
            />
            <div className="browse-content-container">
                <div className="browse-filter-box-container">
                    <FilterBox
                        options={allCategories} // list all possible categories
                        selectedCategories={selectedCategories}
                        onFilterChange={handleFilterChange}
                    />
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
