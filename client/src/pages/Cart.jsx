import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
  const { user, loading } = useAuth();
  const { cartItems, updateQuantity, removeFromCart, subtotal } = useCart();

  const deliveryCharge = subtotal > 499 ? 0 : 49;
  const total = subtotal + deliveryCharge;

  if (loading) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="loading-spinner">Loading your cart...</div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>
            <h2>Your Cart is Empty</h2>
            <p>Browse our fresh produce and add items to your cart</p>
            <Link to="/products" className="btn-primary">Start Shopping</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h1 className="page-title">Your <span>Cart</span></h1>

        <div className="cart-grid">
          <div className="cart-items-section">
            {cartItems.map((item) => (
              <div key={item._id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p className="cart-item-price">₹{item.price} / {item.unit}</p>
                  <div className="cart-item-controls">
                    <div className="quantity-controls">
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        className="qty-btn"
                      >−</button>
                      <span className="qty-number">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        className="qty-btn"
                      >+</button>
                    </div>
                    <button onClick={() => removeFromCart(item._id)} className="remove-btn">
                      Remove
                    </button>
                  </div>
                </div>
                <div className="cart-item-total">₹{item.price * item.quantity}</div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Order Summary</h3>
            <div className="summary-item">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="summary-item">
              <span>Delivery</span>
              <span>{deliveryCharge === 0 ? 'Free' : `₹${deliveryCharge}`}</span>
            </div>
            <div className="summary-divider"></div>
            <div className="summary-total">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
            {subtotal > 0 && subtotal < 499 && (
              <p className="free-delivery-note">
                Add ₹{499 - subtotal} more to get free delivery
              </p>
            )}
            <Link to={user ? "/checkout" : "/login?redirect=/checkout"} className="btn-primary checkout-btn">
              Proceed to Checkout
            </Link>
            <Link to="/products" className="continue-shopping">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;