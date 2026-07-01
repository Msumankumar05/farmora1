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

        // Show first 8 products on the home page
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

      {/* <section className="categories-section">
        <div className="container">
          <h2 className="section-title">Our <span>Categories</span></h2>
          <div className="categories-grid">
            {categories.map((category) => (
              <CategoryCard key={category.name} category={category} />
            ))}
          </div>
        </div>
      </section> */}

      <section className="products-section">
        <div className="container">
          <h2 className="section-title">
            Fresh <span>Products</span>
          </h2>

          <p className="section-description">
            Discover fresh fruits, vegetables, herbs, dairy products, grains,
            and more directly from trusted farmers.
          </p>

          <div className="products-grid">
            {homeProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          <div className="view-all-container">
            <Link to="/products" className="btn-secondary">
              View All Products →
            </Link>
          </div>
        </div>
      </section>

      <section className="why-choose-section">
        <div className="container">
          <h2 className="section-title">
            Why Choose <span>Farmora</span>
          </h2>
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

      {/* <section className="testimonials-section">
        <div className="container">
          <h2 className="section-title">
            What Our <span>Customers Say</span>
          </h2>
          <div className="testimonials-grid">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default Home;
