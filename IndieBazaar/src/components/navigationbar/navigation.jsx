import { FaHeart, FaShoppingCart, FaUser } from 'react-icons/fa'; 
import './navigation.css';

const NavBar = ({ title }) => {
    return (
        <div className="pages-navbar">
            <div className="pages-navbar-title">{title}</div> 
            <div className="pages-navbar-icons">
                <FaHeart className="icon" />
                <FaShoppingCart className="icon" />
                <FaUser className="icon" />
            </div>
        </div>
    );
};  

export default NavBar;
