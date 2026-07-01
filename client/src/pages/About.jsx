import React from 'react';
import './About.css';

const About = () => {
  const team = [
    // { name: 'Arjun Singh', role: 'Head of Operations', image: '👨‍💼', bio: '10+ years in supply chain management' },
    // { name: 'Neha Patel', role: 'Quality Control', image: '👩‍🔬', bio: 'Ensuring only the best reaches you' },
    { name: 'Makoju SK', role: '', image: '👨‍💻', bio: 'Building the future of food delivery' },
    { name: 'Deepak Ranjan', role: '', image: '👨‍💼', bio: 'Passionate about sustainable agriculture' },
  ];

  return (
    <div className="about-page">
      <div className="about-hero">
        <div className="container">
          <h1 className="about-title">Our <span>Story</span></h1>
          <p className="about-subtitle">From farm to home, delivering freshness since 2026</p>
        </div>
      </div>

      <div className="container">
        <section className="about-section">
          <div className="about-content">
            <h2>Our Mission</h2>
            <p>
              At Farmora, we believe that everyone deserves access to fresh, high-quality produce 
              that's good for both people and the planet. Our mission is to bridge the gap between 
              local farmers and urban consumers, creating a sustainable food ecosystem that benefits 
              everyone.
            </p>
            <p>
              We work directly with farmers who practice sustainable agriculture, ensuring that 
              every fruit and vegetable we deliver is grown with care and harvested at the peak 
              of freshness.
            </p>
          </div>
          <div className="about-image">
            <img 
              src="https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=600" 
              alt="Farmora mission"
              className="about-img"
            />
          </div>
        </section>

        <section className="about-section reverse">
          <div className="about-content">
            <h2>Our Vision</h2>
            <p>
              We envision a world where everyone has access to fresh, nutritious food that 
              supports local farmers and promotes environmental sustainability. Farmora is 
              committed to building a community that values quality, transparency, and 
              the joy of eating fresh.
            </p>
            <div className="vision-points">
              <div className="vision-point">
                <span>🌱</span>
                <div>
                  <h4>Sustainable Farming</h4>
                  <p>Supporting eco-friendly farming practices</p>
                </div>
              </div>
              <div className="vision-point">
                <span>🤝</span>
                <div>
                  <h4>Farmer Partnerships</h4>
                  <p>Fair trade and direct farmer relationships</p>
                </div>
              </div>
              <div className="vision-point">
                <span>❤️</span>
                <div>
                  <h4>Healthy Communities</h4>
                  <p>Making healthy eating accessible to all</p>
                </div>
              </div>
            </div>
          </div>
          <div className="about-image">
            <img 
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=600" 
              alt="Farmora vision"
              className="about-img"
            />
          </div>
        </section>

        <section className="team-section">
          <h2>Meet Our <span>Team</span></h2>
          <div className="team-grid">
            {team.map((member, index) => (
              <div key={index} className="team-member">
                <div className="member-avatar">{member.image}</div>
                <h3>{member.name}</h3>
                <p className="member-role">{member.role}</p>
                <p className="member-bio">{member.bio}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="values-section">
          <h2>Our <span>Values</span></h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">🌟</div>
              <h3>Quality First</h3>
              <p>We never compromise on the quality of our produce</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🌍</div>
              <h3>Sustainability</h3>
              <p>Committed to environmental stewardship</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h3>Community</h3>
              <p>Building strong relationships with farmers and customers</p>
            </div>
            <div className="value-card">
              <div className="value-icon">💚</div>
              <h3>Health</h3>
              <p>Promoting healthy eating habits for a better life</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;