import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { createOrder } from '../services/orderService';
import './Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { cartItems, subtotal, clearCart } = useCart();

  const [formData, setFormData] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [orderSuccess, setOrderSuccess] = useState(null);

  // Protected route check
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login?redirect=/checkout');
    }
  }, [user, authLoading, navigate]);

  const deliveryCharge = subtotal > 499 ? 0 : 49;
  const total = subtotal + deliveryCharge;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const productsPayload = cartItems.map((item) => ({
        product: item._id || item.id,
        quantity: item.quantity,
      }));

      const res = await createOrder(productsPayload, formData);
      if (res.success) {
        setOrderSuccess(res.data);
        clearCart();
      } else {
        setError(res.message || 'Failed to place order');
      }
    } catch (err) {
      setError(err.message || 'An error occurred while placing order');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="checkout-page">
        <div className="container">
          <div className="loading-spinner">Verifying credentials...</div>
        </div>
      </div>
    );
  }

  if (orderSuccess) {
    return (
      <div className="checkout-page">
        <div className="container">
          <div className="success-card">
            <div className="success-icon">🎉</div>
            <h2>Order Placed Successfully!</h2>
            <p className="order-id">Order ID: <span>{orderSuccess._id}</span></p>
            
            <div className="success-details">
              <h3>Delivery Details</h3>
              <p><strong>Name:</strong> {user?.name}</p>
              <p><strong>Address:</strong> {formData.street}, {formData.city}, {formData.state} - {formData.zipCode}</p>
              <p><strong>Total Amount Paid:</strong> ₹{orderSuccess.totalPrice} (Cash on Delivery)</p>
            </div>

            <div className="success-actions">
              <Link to="/products" className="btn-primary">Continue Shopping</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="checkout-page">
        <div className="container">
          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>
            <h2>Your Cart is Empty</h2>
            <p>You cannot check out without items in your cart.</p>
            <Link to="/products" className="btn-primary">Browse Products</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <h1 className="page-title">Secure <span>Checkout</span></h1>
        
        {error && <div className="checkout-error">⚠️ {error}</div>}

        <div className="checkout-grid">
          <div className="checkout-form-section">
            <h2>Shipping Address</h2>
            <form onSubmit={handleSubmit} className="checkout-form">
              <div className="form-group">
                <label htmlFor="street">Street Address</label>
                <input
                  type="text"
                  id="street"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  placeholder="House number, street name, apartment"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Enter city"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="state">State</label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="Enter state"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="zipCode">Zip/Postal Code</label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    placeholder="e.g. 400001"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="country">Country</label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="Country"
                    required
                    disabled
                  />
                </div>
              </div>

              <div className="payment-method-section">
                <h3>Payment Method</h3>
                <div className="payment-option active">
                  <span className="payment-radio-btn active"></span>
                  <div className="payment-info">
                    <strong>Cash on Delivery (COD)</strong>
                    <p>Pay with cash upon delivery of your fresh items.</p>
                  </div>
                </div>
              </div>

              <button type="submit" className="btn-primary checkout-submit-btn" disabled={loading}>
                {loading ? 'Placing Order...' : `Place Order (₹${total})`}
              </button>
            </form>
          </div>

          <div className="checkout-summary-section">
            <h2>Order Review</h2>
            <div className="order-items-list">
              {cartItems.map((item) => (
                <div key={item._id} className="order-review-item">
                  <img src={item.image} alt={item.name} />
                  <div className="item-details">
                    <h4>{item.name}</h4>
                    <p>₹{item.price} x {item.quantity}</p>
                  </div>
                  <span className="item-total">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="order-totals">
              <div className="total-row">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="total-row">
                <span>Delivery Charge</span>
                <span>{deliveryCharge === 0 ? 'Free' : `₹${deliveryCharge}`}</span>
              </div>
              <div className="total-divider"></div>
              <div className="total-row grand-total">
                <span>Total Amount</span>
                <span>₹{total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
