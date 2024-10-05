import { FaHeart, FaShoppingCart, FaUser } from 'react-icons/fa'; // Importing icons from react-icons
import './navigation.css';

const NavBar = ({ title }) => {
    return (
        <div className="navbar">
            <div className="navbar-title">{title}</div> {/* Title prop used here */}
            <div className="navbar-icons">
                <FaHeart className="icon" />
                <FaShoppingCart className="icon" />
                <FaUser className="icon" />
            </div>
        </div>
    );
};

export default NavBar;
