import React from 'react';

const Pricing = () => {
  return (
    <section id="pricing" className="section">
      <div className="container">
        <h2 className="section-title">Simple, Transparent Pricing</h2>
        <div className="pricing-grid">
          {/* Basic Plan */}
          <div className="price-card glass">
            <div className="price-header">
              <h3 className="price-tier">Starter</h3>
              <div className="price-amount">$19<span>/mo</span></div>
            </div>
            <ul className="price-features">
              <li><span className="feature-check">✓</span> Up to 5 Projects</li>
              <li><span className="feature-check">✓</span> Basic Analytics</li>
              <li><span className="feature-check">✓</span> 24-hour Support Response</li>
              <li><span className="feature-check">✓</span> Community Access</li>
            </ul>
            <button className="price-btn">Choose Starter</button>
          </div>

          {/* Pro Plan */}
          <div className="price-card glass popular">
            <div className="price-header">
              <h3 className="price-tier">Professional</h3>
              <div className="price-amount">$49<span>/mo</span></div>
            </div>
            <ul className="price-features">
              <li><span className="feature-check">✓</span> Unlimited Projects</li>
              <li><span className="feature-check">✓</span> Advanced Analytics</li>
              <li><span className="feature-check">✓</span> 1-hour Support Response</li>
              <li><span className="feature-check">✓</span> Custom Integrations</li>
              <li><span className="feature-check">✓</span> Team Collaboration</li>
            </ul>
            <button className="price-btn">Choose Pro</button>
          </div>

          {/* Enterprise Plan */}
          <div className="price-card glass">
            <div className="price-header">
              <h3 className="price-tier">Enterprise</h3>
              <div className="price-amount">$99<span>/mo</span></div>
            </div>
            <ul className="price-features">
              <li><span className="feature-check">✓</span> Everything in Pro</li>
              <li><span className="feature-check">✓</span> Dedicated Account Manager</li>
              <li><span className="feature-check">✓</span> 24/7 Phone Support</li>
              <li><span className="feature-check">✓</span> Custom SLAs</li>
            </ul>
            <button className="price-btn">Contact Us</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
