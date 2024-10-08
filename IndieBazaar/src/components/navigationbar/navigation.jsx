import { FaHeart, FaShoppingCart, FaUser } from 'react-icons/fa'; // Importing icons from react-icons
import './navigation.css';

const NavBar = ({ title }) => {
    return (
        <div className="pages-navbar">
            <div className="pages-navbar-title">{title}</div> {/* Title prop used here */}
            <div className="pages-navbar-icons">
                <FaHeart className="icon" />
                <FaShoppingCart className="icon" />
                <FaUser className="icon" />
            </div>
        </div>
    );
}; 

export default NavBar;
