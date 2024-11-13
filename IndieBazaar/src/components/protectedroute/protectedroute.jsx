import { Navigate } from 'react-router-dom';
import { useUser } from '../../firebase/usercontext'; // assuming you have a hook that provides the current user

const PrivateRoute = ({ element }) => {
  const userContext = useUser(); // Get the user context
  const user = userContext?.user; // Safe destructuring with optional chaining

  const PrivateRoute = ({ element }) => {
    const { user } = useUser();
  
    if (user === undefined) {
      // Optionally add a loading indicator while user authentication state is being determined
      return <div>Loading...</div>;
    }
  
    return user ? element : <Navigate to="/login" />;
  };

  return element; // Render the protected component if authenticated
};

export default PrivateRoute;
