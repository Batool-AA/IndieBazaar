import { FaHeart, FaShoppingCart, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './navigation.css';

const NavBar = ({ title }) => {
    const navigate = useNavigate();

    const handleUserClick = () => {
        navigate('/user-profile');
    };

    return (
        <div className="pages-navbar">
            <div className="pages-navbar-title">{title}</div> 
            <div className="pages-navbar-icons">
                <FaHeart className="icon" />
                <FaShoppingCart className="icon" />
                <FaUser className="icon" onClick={handleUserClick} />
            </div>
        </div>
    );
};

export default NavBar;
