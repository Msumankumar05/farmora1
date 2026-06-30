import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="container hero-container">
        <div className="hero-content">
          <div className="hero-badge">🌱 Fresh & Organic</div>
          <h1 className="hero-title">
            Fresh From <span>Farm</span> To Home
          </h1>
          <p className="hero-description">
            Discover the freshest fruits and vegetables, handpicked and delivered straight
            from local farms to your doorstep. Quality you can see, taste you can trust.
          </p>
          <div className="hero-actions">
            <Link to="/products" className="btn-primary">Shop Now</Link>
            <Link to="/about" className="btn-secondary">Learn More</Link>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">500+</span>
              <span className="stat-label">Happy Customers</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">100%</span>
              <span className="stat-label">Fresh Guarantee</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Support Available</span>
            </div>
          </div>
        </div>
        <div className="hero-image">
          <img 
            src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=600" 
            alt="Fresh fruits and vegetables"
            className="hero-img"
          />
          <div className="floating-card card-1">🍎 Fresh Fruits</div>
          <div className="floating-card card-2">🥬 Organic Veggies</div>
        </div>
      </div>
    </section>
  );
};

export default Hero;