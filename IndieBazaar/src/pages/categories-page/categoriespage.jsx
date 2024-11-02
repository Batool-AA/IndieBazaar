import NavBar from "../../components/navigationbar/navigation";
import DropDown from "../../components/dropdown/dropdown";
import SearchBar from "../../components/searchbar/searchbar";
import FilterBox from "../../components/filter-box/filterbox";
import accessory from "../../assets/acc.jpg";
import food from "../../assets/food.jpg";
import clothes from "../../assets/clothes.jpg";
import decor from "../../assets/decor.jpg";
import Health from "../../assets/health.jpg";
import book from "../../assets/books.jpg";
import handmade from "../../assets/handmade.jpg";
import stationary from "../../assets/stationary.jpg";
import { useNavigate } from 'react-router-dom';
import "./categoriespage.css";

const CategoriesPage = () => {
    const navigate = useNavigate();

    const categories = [
        { name: 'Food', image: food }, 
        { name: 'Accessories', image: accessory },
        { name: 'Clothes', image: clothes },
        { name: 'Decor', image: decor }, 
        { name: 'Health', image: Health },
        { name: 'Book', image: book },
        { name: 'Stationary', image: stationary },
        { name: 'Handmade', image: handmade },
    ];

    const handleCategoryClick = (category) => {
        navigate(`/browse/${category.name}`);
    };

    const handleCategorySelect = (selectedCategoryName) => {
        // Find the selected category by name
        const selectedCategory = categories.find(
            (category) => category.name === selectedCategoryName
        );
        if (selectedCategory) {
            navigate(`/browse/${selectedCategory.name}`);
        }
    };

    return (
        <div className="categories-page-container">
            <NavBar title="IndieBazaar" />
            {/* Map category names to dropdown options */}
            <DropDown options={categories.map(category => category.name)} onSelect={handleCategorySelect} />
            <div className="categories-content-container">
                <div className="categories-filter-box-container">
                    <FilterBox />
                </div>
                <div className="categories-container">
                    {categories.map((category, index) => (
                        <div
                            key={index}
                            className="category-card"
                            onClick={() => handleCategoryClick(category)}
                        >
                            <p>{category.name}</p>
                            <img src={category.image} alt={category.name} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CategoriesPage;
