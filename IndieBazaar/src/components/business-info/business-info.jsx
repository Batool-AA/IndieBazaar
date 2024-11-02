import React, { useEffect, useState } from 'react';
import './business-info.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'; 
import { useNavigate } from 'react-router-dom';
import ProductCard from '../product-card/productcard';
import { doc, getDoc } from 'firebase/firestore';
import { db } from "../../firebase/firebase"; // Adjust path if necessary

const BusinessInfo = ({ businessId }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [businessDescription, setBusinessDescription] = useState('');
    const [businessItems, setBusinessItems] = useState([]); // Changed from products to items
    const [randomItems, setRandomItems] = useState([]); // State for selected random items

    useEffect(() => {
        const fetchBusinessData = async () => {
            try {
                const docRef = doc(db, "businesses", businessId); // Reference to the business document
                const docSnap = await getDoc(docRef); // Fetch the document

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setBusinessDescription(data.description); // Set business description
                    
                    // Assuming items are stored as an array of objects in 'items'
                    const items = data.items || []; // Fetch items (ensure 'items' exists)

                    // Shuffle items and select 3 random ones
                    const shuffledItems = items.sort(() => 0.5 - Math.random());
                    const selectedItems = shuffledItems.slice(0, 3);
                    setRandomItems(selectedItems); // Set selected random items
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error fetching business data: ", error);
            }
        };

        fetchBusinessData(); // Call the fetch function
    }, [businessId]); // Depend on businessId to refetch when it changes

    const handleNext = () => {
        setCurrentSlide((prev) => (prev + 1) % randomItems.length);
    };

    const handlePrev = () => {
        setCurrentSlide((prev) => (prev - 1 + randomItems.length) % randomItems.length);
    };

    const socialMedia = {
        // facebook: 'https://facebook.com/yourpage',
        // twitter: 'https://twitter.com/yourhandle',
        // instagram: '',
    };

    const hasSocialMedia = Object.values(socialMedia).some((url) => url);

    const navigate = useNavigate();
    const handleProducts = () => {
        navigate("/business-products", { state: { businessId } }); // Pass businessId to the products page
    };
    return (
        <div className="business-info-container">
            <div className="business-info-content">
                <div className="business-info-header-column">
                    <div className="business-info-header">
                        <div className="business-info-header-heading">
                            <h2 className="business-info-title">About Us</h2>
                        </div>
                        
                        <p className="business-info-description">
                            {businessDescription || "Loading..."} {/* Display business description */}
                        </p>

                        {hasSocialMedia && (
                            <div className="business-info-social-media">
                                {socialMedia.facebook && (
                                    <a href={socialMedia.facebook} target="_blank" rel="noopener noreferrer">
                                        <FaFacebook className="business-info-social-icon" />
                                    </a>
                                )}
                                {socialMedia.twitter && (
                                    <a href={socialMedia.twitter} target="_blank" rel="noopener noreferrer">
                                        <FaTwitter className="business-info-social-icon" />
                                    </a>
                                )}
                                {socialMedia.instagram && (
                                    <a href={socialMedia.instagram} target="_blank" rel="noopener noreferrer">
                                        <FaInstagram className="business-info-social-icon" />
                                    </a>
                                )}
                            </div>
                        )}
                        <button className="business-info-button" onClick={handleProducts}>Our Products</button>
                    </div>
                </div>

                <div className="business-info-carousel-column"> 
                    <div className="business-info-carousel-wrapper">
                        <button className="business-info-carousel-arrow left" onClick={handlePrev}>
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>
                        
                        <div className="business-info-product">
                            {randomItems.length > 0 ? (
                                <ProductCard product={randomItems[currentSlide]} size="big"/> // Display item
                            ) : (
                                <p>No items available.</p> // Handle case when no items are available
                            )}
                        </div> 
                        
                        <button className="business-info-carousel-arrow right" onClick={handleNext}>
                            <FontAwesomeIcon icon={faChevronRight} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BusinessInfo;
