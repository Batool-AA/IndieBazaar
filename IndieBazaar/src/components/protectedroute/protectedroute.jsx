import { Navigate } from 'react-router-dom';
import { useUser } from '../../firebase/usercontext'; // assuming you have a hook that provides the current user

const PrivateRoute = ({ element }) => {
  const userContext = useUser(); // Get the user context
  const user = userContext?.user; // Safe destructuring with optional chaining

  if (!user) {
    // If the user is not authenticated, redirect to login page
    return <Navigate to="/login" />;
  }

  return element; // Render the protected component if authenticated
};

export default PrivateRoute;
