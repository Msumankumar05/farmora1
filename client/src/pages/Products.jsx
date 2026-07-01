import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../services/productService';
import './Products.css';

const CATEGORIES = ['All', 'Fruits', 'Dairy', 'Vegetables', 'Grains', 'Beverages', 'Herbs', 'Organic', 'Exotic'];

const Products = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState('grid');

  // Sync category from URL param on first load
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam && CATEGORIES.includes(categoryParam)) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const params = {};
      if (selectedCategory !== 'All') params.category = selectedCategory;
      if (search.trim()) params.search = search.trim();
      
      // Add sorting params
      if (sortBy === 'price-low') params.sort = 'price_asc';
      else if (sortBy === 'price-high') params.sort = 'price_desc';
      else if (sortBy === 'newest') params.sort = 'createdAt_desc';

      const res = await getProducts(params);
      setProducts(res.data);
    } catch (err) {
      setError(err.message || 'Failed to load products');
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, search, sortBy]);

  useEffect(() => {
    // Debounce search so we don't fire on every keystroke
    const timer = setTimeout(fetchProducts, 400);
    return () => clearTimeout(timer);
  }, [fetchProducts]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    // Update URL without page reload
    const url = new URL(window.location);
    if (category !== 'All') {
      url.searchParams.set('category', category);
    } else {
      url.searchParams.delete('category');
    }
    window.history.pushState({}, '', url);
  };

  const handleClearFilters = () => {
    setSearch('');
    setSelectedCategory('All');
    setSortBy('popular');
    const url = new URL(window.location);
    url.searchParams.delete('category');
    window.history.pushState({}, '', url);
  };

  const getSortLabel = () => {
    const labels = {
      'popular': 'Most Popular',
      'newest': 'Newest First',
      'price-low': 'Price: Low to High',
      'price-high': 'Price: High to Low'
    };
    return labels[sortBy] || 'Sort By';
  };

  return (
    <div className="products-page">
      <div className="container">
        {/* Page Header */}
        <div className="products-header">
          <div className="products-header-content">
            <h1 className="page-title">
              Our <span>Products</span>
            </h1>
            <p className="page-description">
              Fresh, organic, and farm-direct produce delivered to your doorstep
            </p>
          </div>
          <div className="products-count">
            {!loading && !error && (
              <span>{products.length} {products.length === 1 ? 'product' : 'products'} found</span>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="products-controls">
          {/* Search */}
          <div className="search-container">
            <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="M21 21l-4.35-4.35"/>
            </svg>
            <input
              type="text"
              placeholder="Search products by name, category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
            {search && (
              <button 
                className="search-clear"
                onClick={() => setSearch('')}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          {/* Filters & Sort */}
          <div className="controls-right">
            <div className="sort-container">
              <select 
                className="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="popular">⭐ Most Popular</option>
                <option value="newest">🕒 Newest First</option>
                <option value="price-low">💰 Price: Low to High</option>
                <option value="price-high">💰 Price: High to Low</option>
              </select>
            </div>

            <div className="view-toggle">
              <button 
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
                aria-label="Grid view"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7"/>
                  <rect x="14" y="3" width="7" height="7"/>
                  <rect x="3" y="14" width="7" height="7"/>
                  <rect x="14" y="14" width="7" height="7"/>
                </svg>
              </button>
              <button 
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
                aria-label="List view"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="8" y1="6" x2="21" y2="6"/>
                  <line x1="8" y1="12" x2="21" y2="12"/>
                  <line x1="8" y1="18" x2="21" y2="18"/>
                  <line x1="3" y1="6" x2="3.01" y2="6"/>
                  <line x1="3" y1="12" x2="3.01" y2="12"/>
                  <line x1="3" y1="18" x2="3.01" y2="18"/>
                </svg>
              </button>
            </div>

            {(selectedCategory !== 'All' || search || sortBy !== 'popular') && (
              <button className="clear-filters" onClick={handleClearFilters}>
                ✕ Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Category Filters */}
        <div className="category-filters-wrap">
          <div className="category-filters">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => handleCategoryChange(category)}
              >
                {category === 'All' && <span>🏠</span>}
                {category === 'Fruits' && <span>🍎</span>}
                {category === 'Vegetables' && <span>🥬</span>}
                {category === 'Herbs' && <span>🌿</span>}
                {category === 'Organic' && <span>🌱</span>}
                {category === 'Dairy' && <span>🧈</span>}
                {category === 'Grains' && <span>🌾</span>}
                {category === 'Beverages' && <span>🥤</span>}
                {category === 'Exotic' && <span>🌟</span>}
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="loading-grid">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="product-skeleton">
                <div className="skeleton-image"></div>
                <div className="skeleton-text"></div>
                <div className="skeleton-text short"></div>
                <div className="skeleton-text" style={{ width: '40%' }}></div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="error-state">
            <div className="error-icon">⚠️</div>
            <h3>Oops! Something went wrong</h3>
            <p>{error}</p>
            <button className="btn-retry" onClick={fetchProducts}>
              Try Again
            </button>
          </div>
        )}

        {/* Products Grid */}
        {!loading && !error && (
          <div className={`products-grid ${viewMode === 'list' ? 'list-view' : ''}`}>
            {products.length > 0 ? (
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            ) : (
              <div className="no-products">
                <div className="no-products-icon">🛒</div>
                <h3>No Products Found</h3>
                <p>We couldn't find any products matching your criteria.</p>
                <button className="btn-clear-filters" onClick={handleClearFilters}>
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        )}

        {/* Pagination/View More - Optional */}
        {!loading && !error && products.length > 0 && (
          <div className="products-footer">
            <p className="products-footer-text">
              Showing {products.length} {products.length === 1 ? 'product' : 'products'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;