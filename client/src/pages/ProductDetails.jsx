import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { getProductById, getProducts } from '../services/productService';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await getProductById(id);
        setProduct(res.data);

        // Fetch related products in same category
        if (res.data.category) {
          const related = await getProducts({ category: res.data.category });
          setRelatedProducts(related.data.filter((p) => p._id !== res.data._id).slice(0, 3));
        }
      } catch (err) {
        setError(err.message || 'Product not found');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleQuantityChange = (amount) => {
    setQuantity((q) => Math.max(1, q + amount));
  };

  const handleAddToCart = () => {
    if (!user) {
      navigate(`/login?redirect=${encodeURIComponent(window.location.pathname)}`);
      return;
    }

    if (isAdding || isAdded) return;

    setIsAdding(true);
    addToCart(product, quantity);

    setTimeout(() => {
      setIsAdding(false);
      setIsAdded(true);
      setTimeout(() => {
        setIsAdded(false);
      }, 1200);
    }, 600);
  };

  const getStockPercent = () => {
    const max = 100;
    return Math.min(100, Math.round((product.stock / max) * 100));
  };

  const getStockLabel = () => {
    if (product.stock === 0) return { label: 'Out of Stock', cls: 'out' };
    if (product.stock < 10) return { label: `Only ${product.stock} left!`, cls: 'low' };
    return { label: `${product.stock} units available`, cls: 'good' };
  };

  /* ── Loading ── */
  if (loading) {
    return (
      <div className="product-details-page">
        <div className="container">
          <div className="pd-skeleton">
            <div className="pd-skeleton-img skeleton-pulse" />
            <div className="pd-skeleton-info">
              <div className="skeleton-pulse sk-line sk-title" />
              <div className="skeleton-pulse sk-line sk-short" />
              <div className="skeleton-pulse sk-line sk-medium" />
              <div className="skeleton-pulse sk-line" />
              <div className="skeleton-pulse sk-line" />
              <div className="skeleton-pulse sk-btn" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ── Error ── */
  if (error || !product) {
    return (
      <div className="product-details-page">
        <div className="container">
          <div className="pd-error-state">
            <div className="pd-error-icon">🌿</div>
            <h2>{error || 'Product not found'}</h2>
            <p>The product you are looking for might have been removed or is temporarily unavailable.</p>
            <Link to="/products" className="btn-primary">Browse Products</Link>
          </div>
        </div>
      </div>
    );
  }

  const stockInfo = getStockLabel();
  const totalPrice = (product.price * quantity).toFixed(2);

  return (
    <div className="product-details-page">
      <div className="container">

        {/* Breadcrumb */}
        <nav className="pd-breadcrumb" aria-label="breadcrumb">
          <Link to="/">Home</Link>
          <span className="bc-sep">›</span>
          <Link to="/products">Products</Link>
          <span className="bc-sep">›</span>
          <span>{product.name}</span>
        </nav>

        {/* Main Grid */}
        <div className="pd-grid">

          {/* ── Left: Image Panel ── */}
          <div className="pd-image-panel">
            <div className="pd-image-wrap">
              {product.discount && (
                <div className="pd-badge pd-badge-discount">{product.discount}% OFF</div>
              )}
              {product.category === 'Organic' && (
                <div className="pd-badge pd-badge-organic">🌿 Organic</div>
              )}
              <img
                src={product.image}
                alt={product.name}
                className="pd-main-image"
                onError={(e) => { e.target.src = '/placeholder-product.jpg'; }}
              />
              <div className="pd-image-overlay">
                <span>🔍 Zoom</span>
              </div>
            </div>

            {/* Feature pills under image */}
            <div className="pd-feature-pills">
              <div className="pd-pill">🌱 Farm Fresh</div>
              <div className="pd-pill">🚚 Fast Delivery</div>
              <div className="pd-pill">✅ Quality Checked</div>
            </div>
          </div>

          {/* ── Right: Info Panel ── */}
          <div className="pd-info-panel">

            {/* Category tag */}
            <span className="pd-category-tag">{product.category}</span>

            {/* Title */}
            <h1 className="pd-title">{product.name}</h1>

            {/* Rating row */}
            <div className="pd-rating-row">
              <div className="pd-stars">
                {'⭐'.repeat(Math.floor(product.rating || 4))}
              </div>
              <span className="pd-rating-val">{product.rating || '4.0'}</span>
              <span className="pd-rating-count">
                ({product.reviewCount || 0} reviews)
              </span>
            </div>

            {/* Divider */}
            <div className="pd-divider" />

            {/* Price */}
            <div className="pd-price-row">
              <div className="pd-price-main">
                <span className="pd-price">₹{product.price}</span>
                <span className="pd-unit">/ {product.unit}</span>
              </div>
              {product.originalPrice && (
                <span className="pd-original-price">₹{product.originalPrice}</span>
              )}
              {product.discount && (
                <span className="pd-saving">Save {product.discount}%</span>
              )}
            </div>

            {/* Description */}
            <p className="pd-description">{product.description}</p>

            {/* Stock bar */}
            <div className="pd-stock-section">
              <div className="pd-stock-header">
                <span className={`pd-stock-label ${stockInfo.cls}`}>
                  {product.stock > 0 ? '● ' : '○ '}{stockInfo.label}
                </span>
                <span className="pd-stock-units">{product.stock} units</span>
              </div>
              {product.stock > 0 && (
                <div className="pd-stock-bar">
                  <div
                    className={`pd-stock-fill ${stockInfo.cls}`}
                    style={{ width: `${getStockPercent()}%` }}
                  />
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="pd-divider" />

            {/* Quantity Selector */}
            <div className="pd-qty-section">
              <label className="pd-qty-label">Quantity</label>
              <div className="pd-qty-row">
                <div className="pd-qty-controls">
                  <button
                    className="pd-qty-btn"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="pd-qty-num">{quantity}</span>
                  <button
                    className="pd-qty-btn"
                    onClick={() => handleQuantityChange(1)}
                    disabled={product.stock === 0}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
                <div className="pd-total-preview">
                  <span className="pd-total-label">Total</span>
                  <span className="pd-total-price">₹{totalPrice}</span>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="pd-cta-row">
              <button
                id="add-to-cart-btn"
                onClick={handleAddToCart}
                className={`pd-add-btn ${isAdding ? 'adding' : ''} ${isAdded ? 'added' : ''} ${product.stock === 0 ? 'disabled' : ''}`}
                disabled={isAdding || isAdded || product.stock === 0}
              >
                {isAdding ? (
                  <><span className="pd-spinner" /> Adding...</>
                ) : isAdded ? (
                  <>✓ Added to Cart!</>
                ) : product.stock === 0 ? (
                  <>Out of Stock</>
                ) : (
                  <>🛒 Add to Cart</>
                )}
              </button>

              <button
                className="pd-wishlist-btn"
                aria-label="Add to wishlist"
                onClick={(e) => e.currentTarget.classList.toggle('wishlisted')}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </button>
            </div>

            {/* Meta info */}
            <div className="pd-meta-grid">
              <div className="pd-meta-item">
                <span className="pd-meta-key">Category</span>
                <span className="pd-meta-val">{product.category}</span>
              </div>
              <div className="pd-meta-item">
                <span className="pd-meta-key">SKU</span>
                <span className="pd-meta-val">FR-{String(product._id).slice(-4).toUpperCase()}</span>
              </div>
              <div className="pd-meta-item">
                <span className="pd-meta-key">Unit</span>
                <span className="pd-meta-val">{product.unit}</span>
              </div>
              <div className="pd-meta-item">
                <span className="pd-meta-key">Rating</span>
                <span className="pd-meta-val">{product.rating || '4.0'} / 5</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="pd-related">
            <div className="pd-related-header">
              <div>
                <h2 className="pd-related-title">You May Also <span>Like</span></h2>
                <p className="pd-related-sub">More fresh picks from the same category</p>
              </div>
              <Link to={`/products?category=${product.category}`} className="pd-related-link">
                View All →
              </Link>
            </div>
            <div className="pd-related-grid">
              {relatedProducts.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
};

export default ProductDetails;