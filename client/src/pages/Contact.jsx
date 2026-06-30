import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="contact-page">
      <div className="container">
        <div className="contact-header">
          <h1 className="page-title">Get in <span>Touch</span></h1>
          <p className="page-description">We'd love to hear from you. Drop us a message and we'll respond as soon as possible.</p>
        </div>

        <div className="contact-grid">
          <div className="contact-form-section">
            <div className="contact-info-cards">
              <div className="info-card">
                <div className="info-icon">📍</div>
                <div>
                  <h4>Address</h4>
                  <p>123 Farm Road, Green City,<br />India - 110001</p>
                </div>
              </div>
              <div className="info-card">
                <div className="info-icon">📞</div>
                <div>
                  <h4>Phone</h4>
                  <p>+91 72051 02066</p>
                </div>
              </div>
              <div className="info-card">
                <div className="info-icon">✉️</div>
                <div>
                  <h4>Email</h4>
                  <p>info@farmora.com</p>
                </div>
              </div>
              <div className="info-card">
                <div className="info-icon">🕐</div>
                <div>
                  <h4>Working Hours</h4>
                  <p>Mon-Sat: 9AM - 9PM<br />Sunday: Closed</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="contact-form">
              <h2>Send us a Message</h2>
              {submitted && (
                <div className="success-message">
                  ✅ Thank you for your message! We'll get back to you soon.
                </div>
              )}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                    className="form-input"
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What's this about?"
                  required
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us how we can help..."
                  rows="5"
                  required
                  className="form-textarea"
                />
              </div>
              <button type="submit" className="btn-primary">
                Send Message
              </button>
            </form>
          </div>

          <div className="contact-map-section">
            <div className="map-container">
              <img 
                src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=600" 
                alt="Farmora location map"
                className="map-image"
              />
              <div className="map-overlay">
                <h3>Visit Our Store</h3>
                <p>We'd love to meet you in person at our flagship store.</p>
                <button className="btn-secondary">Get Directions</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;