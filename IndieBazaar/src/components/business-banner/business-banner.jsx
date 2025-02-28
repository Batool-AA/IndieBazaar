import React from 'react';
import './business-banner.css'; 
import Title from '../title/title';
import Explore from '../explore-button/explore';

const BusinessBanner = ({title, slogan, businessId, path}) => {
    return (
        <div className="business-banner-container">
            <Title title={title} slogan={slogan} />
            <Explore businessId = {businessId} path={path}/>
        </div>
    );
};
 
export default BusinessBanner;
