import { FaHeart, FaShoppingCart, FaUser } from 'react-icons/fa'; // Importing icons from react-icons
import './navigation.css'
const NavBar = () => {
    return (
        <div className="navbar">
            <div className="navbar-title">IndieBazaar</div>
            <div className="navbar-icons">
                <FaHeart className="icon" />
                <FaShoppingCart className="icon" />
                <FaUser className="icon" />
            </div>
        </div>
    );
};

export default NavBar;