import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const redirect = searchParams.get('redirect') || '/';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await register(formData.name, formData.email, formData.phone, formData.password);
      navigate(redirect);
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="container">
        <div className="auth-container">
          <div className="auth-card">
            <div className="auth-header">
              <h2>Create Account</h2>
              <p>Join Farmora and start your healthy journey</p>
            </div>

            {error && <div className="auth-error">{error}</div>}

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input type="text" id="name" name="name" value={formData.name}
                  onChange={handleChange} placeholder="Enter your full name" required className="form-input" />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" name="email" value={formData.email}
                  onChange={handleChange} placeholder="Enter your email" required className="form-input" />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input type="tel" id="phone" name="phone" value={formData.phone}
                  onChange={handleChange} placeholder="Enter your phone number" required className="form-input" />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" value={formData.password}
                  onChange={handleChange} placeholder="Create a password (min 6 characters)"
                  required minLength="6" className="form-input" />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword}
                  onChange={handleChange} placeholder="Confirm your password" required className="form-input" />
              </div>

              <button type="submit" className="btn-primary auth-btn" disabled={loading}>
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>

              <p className="auth-switch">
                Already have an account? <Link to="/login">Sign in</Link>
              </p>
            </form>
          </div>

          <div className="auth-banner">
            <div className="banner-content">
              <h3>Join Farmora Today</h3>
              <p>Get fresh, organic produce delivered to your doorstep</p>
              <div className="banner-features">
                <div className="banner-feature"><span>🎁</span><span>Welcome Bonus</span></div>
                <div className="banner-feature"><span>🚀</span><span>Free Delivery</span></div>
                <div className="banner-feature"><span>✨</span><span>Exclusive Offers</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;