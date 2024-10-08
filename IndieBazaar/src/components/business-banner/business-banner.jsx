import React from 'react';
import './business-banner.css';
import { motion } from 'framer-motion';
import Title from '../title/title';
import Explore from '../explore-button/explore';

const BusinessBanner = () => {
    return (
        <div className="business-banner-container">
            <Title title={"Amna Cooks"} slogan={""} />
            <Explore />
        </div>
    );
};

export default BusinessBanner;
