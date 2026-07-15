import React from 'react';

const Footer = () => {
  return (
    <footer className="footer glass">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <div className="logo" style={{marginBottom: '1rem'}}>
              Nexus<span style={{color: 'var(--primary-color)'}}>Soft</span>
            </div>
            <p style={{color: 'var(--text-secondary)', marginBottom: '1.5rem'}}>
              Building the future of web applications with modern design and powerful functionality.
            </p>
          </div>
          <div className="footer-col">
            <h3>Product</h3>
            <ul>
              <li><a href="#">Features</a></li>
              <li><a href="#">Pricing</a></li>
              <li><a href="#">Security</a></li>
              <li><a href="#">Updates</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h3>Company</h3>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h3>Legal</h3>
            <ul>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          &copy; {new Date().getFullYear()} NexusSoft. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
