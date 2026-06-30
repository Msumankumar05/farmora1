import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-section">
          <h3 className="footer-logo">
            <span className="logo-icon">🌱</span> Farmora
          </h3>
          <p className="footer-tagline">Fresh From Farm To Home</p>
          <p className="footer-description">
            Delivering the freshest fruits and vegetables directly from farms to your doorstep.
          </p>
          <div className="social-links">
            <a href="#" className="social-link">📱</a>
            <a href="#" className="social-link">📘</a>
            <a href="#" className="social-link">📷</a>
            <a href="#" className="social-link">🐦</a>
          </div>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <Link to="/" className="footer-link">Home</Link>
          <Link to="/products" className="footer-link">Products</Link>
          <Link to="/about" className="footer-link">About Us</Link>
          <Link to="/contact" className="footer-link">Contact</Link>
        </div>

        <div className="footer-section">
          <h4>Categories</h4>
          <Link to="/products?category=Fruits" className="footer-link">Fruits</Link>
          <Link to="/products?category=Vegetables" className="footer-link">Vegetables</Link>
          <Link to="/products?category=Herbs" className="footer-link">Herbs</Link>
          <Link to="/products?category=Organic" className="footer-link">Organic</Link>
        </div>

        <div className="footer-section">
          <h4>Contact Info</h4>
          <p className="contact-info">📍 123 Farm Road, Green City</p>
          <p className="contact-info">📞 +91 72051 02066</p>
          <p className="contact-info">✉️ info@farmora.com</p>
          <p className="contact-info">🕐 Mon-Sat: 9AM - 9PM</p>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>© 2026 Farmora. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;