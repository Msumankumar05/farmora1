import React from 'react';
import './TestimonialCard.css';

const TestimonialCard = ({ testimonial }) => {
  const renderStars = (rating) => {
    return '⭐'.repeat(rating);
  };

  return (
    <div className="testimonial-card">
      <div className="testimonial-rating">{renderStars(testimonial.rating)}</div>
      <p className="testimonial-content">"{testimonial.content}"</p>
      <div className="testimonial-author">
        <div className="author-avatar">{testimonial.name.charAt(0)}</div>
        <div>
          <div className="author-name">{testimonial.name}</div>
          <div className="author-role">{testimonial.role}</div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;