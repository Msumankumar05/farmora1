import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="footer">
      {/* Green top accent bar */}
      <div className="footer-accent" />

      <div className="footer-main">
        <div className="container footer-grid">

          {/* ── Brand Column ── */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo-link">
              <span className="footer-logo-icon">🌱</span>
              <span className="footer-logo-text">Farmora</span>
            </Link>
            <p className="footer-tagline">Fresh From Farm To Home</p>
            <p className="footer-desc">
              Delivering the freshest fruits, vegetables, and organic produce directly from trusted farms to your doorstep — every single day.
            </p>

            {/* Social Icons */}
            <div className="footer-socials">
              {/* Instagram */}
              <a href="#" className="social-btn" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
                </svg>
              </a>
              {/* Facebook */}
              <a href="#" className="social-btn" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              {/* Twitter / X */}
              <a href="#" className="social-btn" aria-label="Twitter">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
                </svg>
              </a>
              {/* YouTube */}
              <a href="#" className="social-btn" aria-label="YouTube">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
                  <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
                </svg>
              </a>
            </div>
          </div>

          {/* ── Quick Links ── */}
          <div className="footer-col">
            <h4 className="footer-col-title">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">All Products</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/cart">My Cart</Link></li>
            </ul>
          </div>

          {/* ── Categories ── */}
          <div className="footer-col">
            <h4 className="footer-col-title">Categories</h4>
            <ul className="footer-links">
              <li><Link to="/products?category=Fruits">🍎 Fruits</Link></li>
              <li><Link to="/products?category=Vegetables">🥬 Vegetables</Link></li>
              <li><Link to="/products?category=Herbs">🌿 Herbs</Link></li>
              <li><Link to="/products?category=Organic">🌱 Organic</Link></li>
              <li><Link to="/products?category=Dairy">🧈 Dairy</Link></li>
              <li><Link to="/products?category=Grains">🌾 Grains</Link></li>
            </ul>
          </div>

          {/* ── Contact ── */}
          <div className="footer-col">
            <h4 className="footer-col-title">Get In Touch</h4>
            <ul className="footer-contact-list">
              <li>
                <span className="contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </span>
                <span>123 Farm Road, Green City</span>
              </li>
              <li>
                <span className="contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </span>
                <span>+91 72051 02066</span>
              </li>
              <li>
                <span className="contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                </span>
                <span>info@farmora.com</span>
              </li>
              <li>
                <span className="contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                </span>
                <span>Mon–Sat: 9AM – 9PM</span>
              </li>
            </ul>
          </div>

          {/* ── Newsletter ── */}
          <div className="footer-col footer-newsletter-col">
            <h4 className="footer-col-title">Stay Updated</h4>
            <p className="footer-newsletter-desc">
              Get fresh deals, seasonal offers, and farm news delivered to your inbox.
            </p>
            <form className="footer-newsletter-form" onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="footer-email-input"
                required
              />
              <button type="submit" className="footer-subscribe-btn">
                {subscribed ? '✓ Done!' : 'Subscribe'}
              </button>
            </form>
            {subscribed && (
              <p className="footer-subscribed-msg">🎉 Thanks for subscribing!</p>
            )}

            {/* Trust badges */}
            <div className="footer-badges">
              <div className="footer-badge">🔒 Secure Payment</div>
              <div className="footer-badge">🚚 Free Delivery</div>
              <div className="footer-badge">♻️ Eco Packaging</div>
            </div>
          </div>

        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p className="footer-copy">
            © {new Date().getFullYear()} <span>Farmora</span>. All rights reserved. Made with 🌿 for fresh living.
          </p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;