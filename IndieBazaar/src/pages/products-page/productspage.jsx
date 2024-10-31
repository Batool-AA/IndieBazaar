import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from "../../components/navigationbar/navigation";
import CategoriesBar from '../../components/categories-bar/categoriesbar';
import ProductCard from '../../components/product-card/productcard';
import { doc, getDoc } from 'firebase/firestore';
import { db } from "../../firebase/firebase"; // Adjust path if necessary
import './productspage.css';

const ProductsPage = () => { 
  const location = useLocation();
  const { businessId } = location.state; // Get businessId from state

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [businessName, setBusinessName] = useState(''); // State for business name

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const docRef = doc(db, "businesses", businessId);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          const items = data.items || []; // Fetch items
          setProducts(items);
          setBusinessName(data.name || 'Business Name'); // Set business name from data

          // Extract unique categories from items
          const uniqueCategories = new Set(items.flatMap(item => item.category));
          setCategories(['All', ...Array.from(uniqueCategories)]); // Add 'All' category
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching business products: ", error);
      }
    };

    fetchProducts();
  }, [businessId]); // Depend on businessId

  const categoryProducts = categories.reduce((acc, category) => {
    acc[category] = products.filter(product => product.category.includes(category));
    return acc;
  }, {});

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    const section = document.getElementById(category);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' }); 
    }
  };

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : categoryProducts[selectedCategory];

  return (
    <div className="products-page">
      <NavBar title={businessName} /> {/* Pass the business name to NavBar */}
      <CategoriesBar categories={categories} onSelectCategory={handleCategoryClick} />

      {categories.map((category, index) => (
        <section id={category} key={index} className="products-category-section">
          <h2>{category}</h2> 
          <div className="product-cards-container">
            {categoryProducts[category].map((product, index) => (
              <ProductCard key={index} product={product} size="small"/>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default ProductsPage;
