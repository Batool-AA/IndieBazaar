import React from 'react';
import { useUser } from '../../firebase/usercontext';

const ProfilePage = () => {
  const user = useUser(); // Access user data from context

  if (!user) {
    return <p>Loading user data...</p>; // Placeholder while loading
  }
  console.log(user);

  return (
    
    <div className="profile-page">
      <h2>Welcome, {user.username}!</h2>
      <p>Email: {user.email}</p>
      {/* Display other user details as needed */}
    </div>
  );
};

export default ProfilePage;
