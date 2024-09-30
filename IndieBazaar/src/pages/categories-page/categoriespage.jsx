import NavBar from "../../components/navigationbar/navigation";
import SearchBar from "../../components/searchbar/searchbar";
import FilterBox from "../../components/filter-box/filterbox";
import accessory from "../../assets/acc.jpg"
import "./categoriespage.css"

const CategoriesPage = () => {
    // Sample data for categories
    const categories = [
        // { name: 'Food', image: 'path/to/food-image.jpg' },
        { name: 'Accessories', image: accessory },
        // { name: 'Clothes', image: 'path/to/clothes-image.jpg' },
        // { name: 'Decor', image: 'path/to/decor-image.jpg' },
        // Add more categories as needed
    ];

    return (
        <div className="categories-page-container">
            <NavBar />
            <SearchBar />
            <div className="content-container">
                <FilterBox />
                {/* <div className="categories-container"> 
                    {categories.map((category, index) => (
                        <CategoryCard 
                            key={index} 
                            image={category.image} 
                            name={category.name} 
                        />
                    ))}
                </div> */}
            </div>
        </div>
    );
};

export default CategoriesPage;