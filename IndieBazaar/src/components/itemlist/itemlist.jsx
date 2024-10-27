import React from 'react';

const ItemList = ({ items }) => (
  <div className="item-list">
    <h3>Added Items</h3>
    {items.map((item, index) => (
      <div key={index} className="item">
        <h4>{item.itemName}</h4>
        <p>{item.description}</p>
        <p>{item.subcategory}</p>
        {item.image && <img src={URL.createObjectURL(item.image)} alt={item.itemName} />}
      </div>
    ))}
  </div>
);

export default ItemList;
