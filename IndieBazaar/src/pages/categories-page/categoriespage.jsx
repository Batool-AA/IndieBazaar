import React, { useState } from "react";
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
import { useNavigate } from "react-router-dom";
import "./categoriespage.css";

const CategoriesPage = () => {
    const navigate = useNavigate();

    const categories = [
        { name: "Food", image: food },
        { name: "Accessories", image: accessory },
        { name: "Clothes", image: clothes },
        { name: "Decor", image: decor },
        { name: "Health", image: Health },
        { name: "Book", image: book },
        { name: "Stationary", image: stationary },
        { name: "Handmade", image: handmade },
    ];

    // State for selected categories
    const [selectedCategories, setSelectedCategories] = useState([]);

    const handleCategoryClick = (category) => {
        // Navigate to browse with just this category
        navigate(`/browse?categories=${encodeURIComponent(category.name)}`);
    };

    const handleCategorySelect = (selectedCategoryName) => {
        navigate(`/browse?categories=${encodeURIComponent(selectedCategoryName)}`);
    };

    // Function to update selected categories when a checkbox is toggled
    const handleFilterChange = (categoryName, isChecked) => {
        setSelectedCategories((prevSelected) => {
            if (isChecked) {
                // Add the category to the selected list
                return [...prevSelected, categoryName];
            } else {
                // Remove the category from the selected list
                return prevSelected.filter((name) => name !== categoryName);
            }
        });
    };

    // Filtered categories based on selected checkboxes
    const filteredCategories =
        selectedCategories.length > 0
            ? categories.filter((category) =>
                  selectedCategories.includes(category.name)
              )
            : categories;

    const applyFilters = () => {
        if (selectedCategories.length > 0) {
            const encodedCategories = selectedCategories.map(encodeURIComponent).join(',');
            navigate(`/browse?categories=${encodedCategories}`);
        } else {
            navigate('/browse');
        }
    };

    return (
        <div className="categories-page-container">
            <div className="categories-page-header">
                <NavBar title="IndieBazaar" />
            </div>
            <DropDown
                options={categories.map((category) => category.name)}
                onSelect={handleCategorySelect}
            />
            <div className="categories-content-container">
                <div className="categories-filter-box-container">
                    <FilterBox
                        options={categories.map((category) => category.name)}
                        selectedCategories={selectedCategories}
                        onFilterChange={handleFilterChange}
                    />
                    <button onClick={applyFilters} className="apply-filters-button">
                        Apply Filters
                    </button>
                </div>
                <div className="categories-container">
                    {filteredCategories.map((category, index) => (
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
