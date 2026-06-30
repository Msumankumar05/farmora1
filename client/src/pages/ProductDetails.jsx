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

  if (loading) {
    return (
      <div className="product-details-page">
        <div className="container">
          <div className="loading-spinner">Loading...</div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="product-details-page">
        <div className="container">
          <h2>{error || 'Product not found'}</h2>
          <Link to="/products" className="btn-primary">Back to Products</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="product-details-page">
      <div className="container">
        <div className="breadcrumb">
          <Link to="/">Home</Link> / <Link to="/products">Products</Link> / <span>{product.name}</span>
        </div>

        <div className="product-detail-grid">
          <div className="product-image-section">
            <img src={product.image} alt={product.name} className="detail-image" />
          </div>

          <div className="product-info-section">
            <h1 className="detail-title">{product.name}</h1>
            <div className="detail-rating">
              <span className="stars">{'⭐'.repeat(Math.floor(product.rating || 4))}</span>
              <span className="rating-text">({product.rating || 'N/A'})</span>
            </div>
            <div className="detail-price">
              <span className="price">₹{product.price}</span>
              <span className="unit">/ {product.unit}</span>
            </div>
            <p className="detail-description">{product.description}</p>

            <div className="detail-stock">
              <span className={`stock-status ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                {product.stock > 0 ? '✅ In Stock' : '❌ Out of Stock'}
              </span>
              <span className="stock-count">{product.stock} units available</span>
            </div>

            <div className="quantity-selector">
              <label>Quantity:</label>
              <div className="quantity-controls">
                <button onClick={() => handleQuantityChange(-1)} className="qty-btn">−</button>
                <span className="qty-number">{quantity}</span>
                <button onClick={() => handleQuantityChange(1)} className="qty-btn">+</button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className={`btn-primary add-to-cart-detail ${isAdding ? 'adding' : ''} ${isAdded ? 'added' : ''}`}
              disabled={isAdding || isAdded || product.stock === 0}
            >
              {isAdding ? (
                <>
                  <span className="btn-spinner"></span>
                  <span>Adding...</span>
                </>
              ) : isAdded ? (
                <span>✓ Added to Cart!</span>
              ) : (
                <span>🛒 Add to Cart</span>
              )}
            </button>

            <div className="product-meta">
              <p><span>Category:</span> {product.category}</p>
              <p><span>SKU:</span> FR-{String(product._id).slice(-4).toUpperCase()}</p>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <section className="related-products">
            <h3>Related Products</h3>
            <div className="related-grid">
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