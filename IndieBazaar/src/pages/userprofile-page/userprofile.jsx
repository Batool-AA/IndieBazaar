// UserProfile.jsx
import React from 'react';
import NavBar from '../../components/navigationbar/navigation';
import ProfileCard from '../../components/profilecard/profilecard';
import ProfileDetails from '../../components/profiledetails/profiledetails';
// import SocialLinks from './SocialLinks';
import BusinessDetails from '../../components/userbusinessdetails/userbusinessdetails';
import './userprofile.css';

const UserProfile = () => {
    return (
        <div className="user-profile-page">
            <NavBar title="IndieBazaar" />
            <div className="user-profile">
                <div className="user-profile__sidebar">
                    {/* <ProfileCard /> */}
                    {/* <SocialLinks /> */}
                </div>
                <div className="user-profile__content">
                    <ProfileDetails />
                    <BusinessDetails />
                </div>
            </div> 
        </div>
    );
};

export default UserProfile;
