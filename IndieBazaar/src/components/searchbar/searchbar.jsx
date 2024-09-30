import './searchbar.css';
import { FaSearch } from 'react-icons/fa'; // Import a magnifying glass icon

const SearchBar = () => {
    return (
        <div className="search-bar-container">
            <FaSearch className="search-icon" />
            <input 
                type="text" 
                className="search-input" 
                placeholder="Search the product you're looking for" 
            />
        </div>
    );
};

export default SearchBar;