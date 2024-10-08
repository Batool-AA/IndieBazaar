import React, { useState } from 'react';
import './business-info.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import burgerImage from "../../assets/burger.png"; 
import noodles from "../../assets/noodles.jpg"
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'; 
import { useNavigate } from 'react-router-dom';

export const businessProducts = [
    {
        name: 'Burger',
        description: 'Mustard, because it\'s strong, spicy, and confident.',
        imgSrc: burgerImage,
    },
    {
        name: 'Noodles',
        description: 'Yum',
        imgSrc: noodles,
    },
    // Add more business-info members here
];

const BusinessInfo = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const handleNext = () => {
        setCurrentSlide((prev) => (prev + 1) % businessProducts.length);
    };

    const handlePrev = () => {
        setCurrentSlide((prev) => (prev - 1 + businessProducts.length) % businessProducts.length);
    };

    const socialMedia = {
        facebook: 'https://facebook.com/yourpage',
        twitter: 'https://twitter.com/yourhandle',
        instagram: '',
    };

    // Check if there is any social media info
    const hasSocialMedia = Object.values(socialMedia).some((url) => url);

    const navigate = useNavigate();
    const handleProducts = (e) => {
        navigate("/business-products");
    }


    return (
        <div className="business-info-container">
            <div className="business-info-content">
                <div className="business-info-header-column">
                    <div className="business-info-header">
                        <div className="business-info-header-heading">
                            {/* <div className="business-info-icon">🟩</div> */}
                            <h2 className="business-info-title">About Us</h2>
                        </div>

                        
                        <p className="business-info-description">
                            We are a home based cooking business
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
                        {/* Previous arrow button */}
                        <button className="business-info-carousel-arrow left" onClick={handlePrev}>
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>
                        
                        {/* business-info member details */}
                        <div className="business-info-product">
                            <img
                                src={businessProducts[currentSlide].imgSrc}
                                alt={businessProducts[currentSlide].name}
                                className="business-info-product-photo"
                            />
                            <div className="business-info-product-description">
                                <h3>{businessProducts[currentSlide].name}</h3>
                                <p>{businessProducts[currentSlide].description}</p>
                            </div>
                        </div> 
                        
                        {/* Next arrow button */}
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
