import Navbar from "../../components/nav-bar/nav-bar"
import BusinessBanner from "../../components/business-banner/business-banner"
import BusinessInfo from  "../../components/business-info/business-info"

import "./business-page.css"

const BusinessPage = () => {
    return (
        <div className="business-page-container">
            <Navbar />
            <BusinessBanner />
            <BusinessInfo />
        </div>
    );
};

export default BusinessPage;