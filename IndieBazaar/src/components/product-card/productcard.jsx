import React from 'react';
import './productcard.css';

const ProductCard = ({ product , size}) => {
  return (
    <div className={`product-card ${size}`}>
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-info">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <p className="product-price">Rs. {product.price}</p>
      </div>
    </div>  
  );
};

export default ProductCard;
