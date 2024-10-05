import React from 'react';
import './business-banner.css';
import { motion } from 'framer-motion';
import burgerImage from "../../assets/burger.png"; 

const BusinessBanner = () => {
    return (
        <div className="business-banner-container">
            <motion.h1 
                className="business-banner-title"
                initial={{ scale: 5.8 }}
                animate={{ scale: 1.2 }}
                transition={{
                    type: 'spring', // Make it bouncy
                    stiffness: 90, // speed 
                    damping: 8, // Reduce oscillations (more damping, less bouncy)
                    mass: 0.5, // Make it feel heavier
                    duration: 3.5 // Adjust duration for a quicker stomp
                }}
            >
                Amna Cooks
            </motion.h1>

            {/* <div className="burger-image-container">
                <img src={burgerImage} alt="Burger" className="burger-image"/>
            </div> */}
            <button className="explore-btn">Explore</button>
        </div>
    );
};

export default BusinessBanner;
