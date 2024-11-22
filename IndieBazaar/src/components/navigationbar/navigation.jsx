import { FaHeart, FaShoppingCart, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase/firebase'; // Import Firebase auth
import { db } from '../../firebase/firebase'; // Import Firestore db
import { collection, query, where, getDocs } from 'firebase/firestore';
import './navigation.css';

const NavBar = ({ title, logoSrc }) => {
    const navigate = useNavigate();

    const handleUserClick = () => {
        if (auth.currentUser) {
            // If user is logged in, navigate to user-profile
            navigate('/user-profile');
        } else {
            // If not logged in, navigate to login page
            navigate('/login');
        }
    };

    const handleTitleClick = async () => {
        if (title.includes("IndieBazaar")) {
            navigate("/");
        } else {
            try {
                const businessesRef = collection(db, 'businesses');
                const q = query(businessesRef, where('name', '==', title));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    // Assuming title is unique, navigate to the first matching business
                    const business = querySnapshot.docs[0];
                    navigate(`/business-home/${business.id}`);
                } else {
                    console.log("No matching business found");
                }
            } catch (error) {
                console.error("Error checking business title:", error);
            }
        }
    };

    return (
        <div className="pages-navbar">
            <div className="pages-navbar-title" onClick={handleTitleClick}>
                {logoSrc ? (
                    <img 
                        src={logoSrc} 
                        alt="Logo" 
                        className="navbar-logo"
                    />
                ) : (
                    <span className="navbar-title-text">{title}</span>
                )}
            </div>
            <div className="pages-navbar-icons">
                <FaHeart className="icon" />
                <FaShoppingCart className="icon" />
                <FaUser className="icon" onClick={handleUserClick} />
            </div>
        </div>
    );
};

export default NavBar;
