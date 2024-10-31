import React from 'react';
import '../setupbusiness-page/setupbusiness.css';
import { useLocation } from 'react-router-dom';
import AddmoreitemsComponent from '../../components/addmoreitems/addmoreitems'; // Adjust import as needed

const AddMoreItemsPage = () => {
    const location = useLocation();
    const { businessId } = location.state; // Extract businessId from state

    return (
        <div className="setup-business-container">
            {/* Pass businessId to the AddmoreitemsComponent */}
            <AddmoreitemsComponent businessId={businessId} />
        </div>
    );
};

export default AddMoreItemsPage;
