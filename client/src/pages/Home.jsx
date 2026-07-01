import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import CategoryCard from "../components/CategoryCard";
import TestimonialCard from "../components/TestimonialCard";
import { getProducts } from "../services/productService";
import "./Home.css";

const categories = [
  { name: "Fruits", icon: "🍎", count: 24 },
  { name: "Vegetables", icon: "🥬", count: 32 },
  { name: "Herbs", icon: "🌿", count: 15 },
  { name: "Organic", icon: "🌱", count: 28 },
  { name: "Dairy", icon: "🧈", count: 28 },
  { name: "Grains", icon: "🌾", count: 28 },
];

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Regular Customer",
    content:
      "Farmora has completely changed how I shop for groceries. The freshness is unmatched!",
    rating: 5,
  },
  {
    id: 2,
    name: "Rahul Verma",
    role: "Health Enthusiast",
    content:
      "The organic produce from Farmora is exceptional. I trust their quality completely.",
    rating: 5,
  },
  {
    id: 3,
    name: "Anita Patel",
    role: "Home Chef",
    content:
      "I love the convenience and quality. Farmora makes healthy eating so easy!",
    rating: 5,
  },
];

const Home = () => {
  const [homeProducts, setHomeProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProducts();
        setHomeProducts(res.data.slice(0, 8));
      } catch (error) {
        console.error(error);
        setHomeProducts([]);
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="home">
      <Hero />

      {/* Categories Section - Uncomment if needed */}
      {/* <section className="categories-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              Our <span>Categories</span>
            </h2>
            <p className="section-description">
              Explore our wide range of fresh categories, carefully curated for your daily needs.
            </p>
          </div>
          <div className="categories-grid">
            {categories.map((category) => (
              <CategoryCard key={category.name} category={category} />
            ))}
          </div>
        </div>
      </section> */}

      {/* Products Section - Enhanced */}
      <section className="products-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              Fresh <span>Products</span>
            </h2>
            <p className="section-description">
              Discover fresh fruits, vegetables, herbs, dairy products, grains,
              and more directly from trusted farmers.
            </p>
          </div>

          {loadingProducts ? (
            <div className="loading-grid">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="product-skeleton">
                  <div className="skeleton-image"></div>
                  <div className="skeleton-text"></div>
                  <div className="skeleton-text short"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="products-grid">
              {homeProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}

          <div className="view-all-wrapper">
            <Link to="/products" className="btn-view-all">
              Browse All Products
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="why-choose-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              Why Choose <span>Farmora</span>
            </h2>
            <p className="section-description">
              We're committed to bringing you the freshest produce with unmatched quality and service.
            </p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🌿</div>
              <h3>100% Fresh Produce</h3>
              <p>
                Directly sourced from local farms, delivered within hours of
                harvest.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🚚</div>
              <h3>Free Delivery</h3>
              <p>Enjoy free home delivery on all orders above ₹499.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>Best Prices</h3>
              <p>Farm direct pricing without middlemen markups.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⭐</div>
              <h3>Trusted Quality</h3>
              <p>
                Every product is carefully inspected for quality and freshness.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              What Our <span>Customers Say</span>
            </h2>
            <p className="section-description">
              Hear from our happy customers who trust Farmora for their daily fresh needs.
            </p>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-content">
            <h2>Subscribe to Our Newsletter</h2>
            <p>
              Get fresh updates, exclusive offers, and healthy tips delivered to
              your inbox.
            </p>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="newsletter-input"
                required
              />
              <button type="submit" className="btn-newsletter">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;