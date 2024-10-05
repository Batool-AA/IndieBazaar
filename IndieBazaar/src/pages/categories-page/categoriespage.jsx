import NavBar from "../../components/navigationbar/navigation";
import SearchBar from "../../components/searchbar/searchbar";
import FilterBox from "../../components/filter-box/filterbox";
import accessory from "../../assets/acc.jpg"
import food from  "../../assets/food.jpg"
import clothes from "../../assets/clothes.jpg"
import decor from "../../assets/decor.jpg"
import CategoryCard from "../../components/categorycard/categorycard";
import "./categoriespage.css"

const CategoriesPage = () => {
    // Sample data for categories
    const categories = [
        { name: 'Food', image: food},
        { name: 'Accessories', image: accessory },
        { name: 'Clothes', image: clothes},
        { name: 'Decor', image: decor },
        // Add more categories as needed
    ];

    return (
        <div className="categories-page-container">
            <NavBar />
            <SearchBar />
            <div className="content-container">
                <FilterBox />
                <div className="categories-container">
                    {categories.map((category, index) => (
                        <div key={index} className="category-card">
                            <p>{category.name}</p> {/* Heading above the image */}
                            <img src={category.image} alt={category.name} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CategoriesPage;