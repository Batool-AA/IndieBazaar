import React, { useState } from 'react';
import NavBar from "../../components/navigationbar/navigation";
import CategoriesBar from '../../components/categories-bar/categoriesbar';
import ProductCard from '../../components/product-card/productcard';
import burger from "../../assets/burger.jpg";
import noodles from "../../assets/noodles.jpg";
import wrap from "../../assets/wrap.jpg"; // Ensure you import the wrap image
import alfredo from "../../assets/alfredo.jpg"; // Ensure you import the alfredo image
import wings from "../../assets/wings.jpg"; // Ensure you import the wings image
import milkshake from "../../assets/milkshake.jpg"; // Ensure you import the milkshake image
import './productspage.css';

const ProductsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const products = [
    { name: "Special Beef Burger", description: "A juicy beef patty topped with fresh veggies and our secret sauce.", image: burger, category: ['Specials', 'Burger'] },
    { name: "Chinese Noodles", description: "Stir-fried noodles tossed with colorful vegetables and savory sauce.", image: noodles, category: ['Specials', 'Chinese'] },
    { name: "Chicken Wrap", description: "Tender chicken wrapped in a soft tortilla with zesty sauce and fresh greens.", image: wrap, category: ['Specials', 'Wrap'] },
    { name: "Creamy Alfredo Pasta", description: "Rich and creamy pasta coated in a velvety Alfredo sauce, garnished with Parmesan.", image: alfredo, category: ['Specials', 'Pasta'] },
    { name: "Hot 'n Spicy Wings", description: "Crispy chicken wings tossed in a fiery sauce, perfect for spice lovers.", image: wings, category: ['Specials','Wings'] },
    { name: "Oreo Milkshake", description: "A creamy blend of Oreo cookies and ice cream, topped with whipped cream.", image: milkshake, category: ['Specials', 'Dessert'] },
];


  const categories = ['Specials', 'Burger', 'Pizza', 'Chinese', 'Wings'];

  // Filter products based on the selected category
  const filteredProducts = selectedCategory === 'All' 
  ? products 
  : products.filter(product => product.category.includes(selectedCategory));


  return (
    <div className="products-page">
      <NavBar title="Amna Cooks" />
      <CategoriesBar categories={categories} onSelectCategory={setSelectedCategory} />
      <div className="product-cards-container">
        {filteredProducts.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
