import React from 'react';
import './business-banner.css';
import Title from '../title/title';
import Explore from '../explore-button/explore';

const BusinessBanner = ({title, slogan}) => {
    return (
        <div className="business-banner-container">
            <Title title={title} slogan={slogan} />
            <Explore />
        </div>
    );
};
 
export default BusinessBanner;
