import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product, layout = 'grid' }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const cardRef = useRef(null);

  // Support both _id (from MongoDB) and id (from mock data)
  const productId = product._id || product.id;

  // Render stars with proper formatting
  const renderStars = (rating) => {
    const numRating = Number(rating) || 0;
    const fullStars = Math.floor(numRating);
    const hasHalfStar = numRating % 1 >= 0.5;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push('⭐');
    }
    if (hasHalfStar) {
      stars.push('⭐');
    }
    // Fill remaining with empty stars
    while (stars.length < 5) {
      stars.push('☆');
    }
    return stars.join(' ');
  };

  // Handle add to cart with animation
  const handleAddToCart = (e) => {
    e.stopPropagation();
    
    if (!user) {
      navigate(`/login?redirect=${encodeURIComponent(window.location.pathname)}`);
      return;
    }

    if (isAdding || isAdded || product.stock === 0) return;

    setIsAdding(true);
    
    // Simulate API call
    setTimeout(() => {
      addToCart(product);
      setIsAdding(false);
      setIsAdded(true);
      
      // Reset after showing success
      setTimeout(() => {
        setIsAdded(false);
      }, 1500);
    }, 500);
  };

  // Handle quick view
  const handleQuickView = (e) => {
    e.stopPropagation();
    navigate(`/product/${productId}`);
  };

  // Get stock status
  const getStockStatus = () => {
    if (product.stock === 0) return { label: 'Out of Stock', className: 'out-of-stock' };
    if (product.stock < 10) return { label: 'Only Few Left', className: 'low-stock' };
    return { label: 'In Stock', className: 'in-stock' };
  };

  const stockStatus = getStockStatus();

  return (
    <div 
      className={`product-card ${layout === 'list' ? 'list-view' : ''} ${isHovered ? 'hovered' : ''}`}
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Discount Badge - Optional */}
      {product.discount && (
        <div className="discount-badge">
          <span className="discount-text">{product.discount}% OFF</span>
        </div>
      )}

      {/* Image Container */}
      <div className="product-image-container">
        {!imageLoaded && !imageError && (
          <div className="image-skeleton">
            <div className="skeleton-shimmer"></div>
          </div>
        )}
        
        <img 
          src={imageError ? '/placeholder-product.jpg' : product.image} 
          alt={product.name}
          className={`product-image ${imageLoaded ? 'loaded' : ''}`}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
          loading="lazy"
        />

        {/* Quick Actions Overlay */}
        <div className={`product-overlay ${isHovered ? 'visible' : ''}`}>
          <button 
            className="quick-view-btn"
            onClick={handleQuickView}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
            Quick View
          </button>
        </div>

        {/* Stock Status Badge */}
        <div className={`stock-badge ${stockStatus.className}`}>
          {stockStatus.label}
        </div>

        {/* Quick Add Button - Visible on hover */}
        <button 
          className={`quick-add-btn ${isHovered ? 'visible' : ''}`}
          onClick={handleAddToCart}
          disabled={isAdding || isAdded || product.stock === 0}
        >
          {isAdding ? (
            <span className="btn-spinner"></span>
          ) : isAdded ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 3h18l-2 14H5L3 3z"/>
              <path d="M8 21h8"/>
              <path d="M10 17v4"/>
              <path d="M14 17v4"/>
            </svg>
          )}
        </button>
      </div>

      {/* Product Info */}
      <div className="product-info">
        {/* Category Tag */}
        <span className="product-category">{product.category}</span>

        {/* Product Name */}
        <Link to={`/product/${productId}`} className="product-name">
          {product.name}
        </Link>

        {/* Rating */}
        <div className="product-rating">
          <span className="stars">{renderStars(product.rating)}</span>
          <span className="rating-count">
            {product.reviewCount ? `(${product.reviewCount})` : `(${product.rating || 'N/A'})`}
          </span>
        </div>

        {/* Price Section */}
        <div className="product-price-section">
          <div className="product-price">
            <span className="price">₹{product.price}</span>
            <span className="unit">/ {product.unit}</span>
          </div>
          {product.originalPrice && (
            <span className="original-price">
              ₹{product.originalPrice}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          className={`add-to-cart-btn ${isAdding ? 'adding' : ''} ${isAdded ? 'added' : ''} ${product.stock === 0 ? 'disabled' : ''}`}
          onClick={handleAddToCart}
          disabled={isAdding || isAdded || product.stock === 0}
        >
          <span className="btn-content">
            {isAdding ? (
              <>
                <span className="btn-spinner"></span>
                <span>Adding...</span>
              </>
            ) : isAdded ? (
              <>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
                <span>Added!</span>
              </>
            ) : product.stock === 0 ? (
              <span>Out of Stock</span>
            ) : (
              <>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 3h18l-2 14H5L3 3z"/>
                  <path d="M8 21h8"/>
                  <path d="M10 17v4"/>
                  <path d="M14 17v4"/>
                </svg>
                <span>Add to Cart</span>
              </>
            )}
          </span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;