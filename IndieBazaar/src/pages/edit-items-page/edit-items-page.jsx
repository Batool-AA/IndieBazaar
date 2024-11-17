import React from 'react';
import '../setupbusiness-page/setupbusiness.css';
import { useLocation } from 'react-router-dom';
import EditItem from '../../components/edititem/edititem'; // Adjust import path as needed

const EditItemPage = () => {
    const location = useLocation();
    const { businessId, itemToEdit } = location.state; // Extract businessId and itemToEdit from state

    return (
        <div className="setup-business-container">
            {/* Pass businessId and itemToEdit to the EditItem component */}
            <EditItem businessId={businessId} itemToEdit={itemToEdit} />
        </div>
    );
};

export default EditItemPage;
