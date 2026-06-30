import React from 'react';
import { Link } from 'react-router-dom';
import './CategoryCard.css';

const CategoryCard = ({ category }) => {
  return (
    <Link to={`/products?category=${category.name}`} className="category-card">
      <div className="category-icon">{category.icon}</div>
      <h3 className="category-name">{category.name}</h3>
      <p className="category-count">{category.count} Products</p>
    </Link>
  );
};

export default CategoryCard;