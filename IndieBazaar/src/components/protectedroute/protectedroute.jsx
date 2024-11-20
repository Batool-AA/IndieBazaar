import { Navigate } from 'react-router-dom';
import { useUser } from '../../firebase/usercontext'; // Assuming you have this hook

const PrivateRoute = ({ element }) => {
  const  user = useUser(); // Get the user object from context

  if (user === undefined) {
    // Still determining auth state
    console.log(user)
    return <div>Loading...</div>;
  }

  if (user === null) {
    // User is not logged in
    return <Navigate to="/login" />;
  }

  // User is authenticated
  return element;
};

export default PrivateRoute;
