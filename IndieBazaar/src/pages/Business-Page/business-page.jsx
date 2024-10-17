import Navbar from "../../components/navigationbar/navigation"
import BusinessBanner from "../../components/business-banner/business-banner"
import BusinessInfo from  "../../components/business-info/business-info"

import "./business-page.css"

const BusinessPage = () => {
    return (
        <div className="business-page-container">
            <Navbar title={"IndieBazaar"}/>
            <BusinessBanner title={"Amna Cooks"} slogan={""}/>
            <div id="about-us">
                <BusinessInfo />
            </div> 
        </div>
    );
};

export default BusinessPage;