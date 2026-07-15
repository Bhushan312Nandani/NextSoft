import React from 'react';

const Navbar = () => {
  return (
    <nav className="navbar glass">
      <div className="container">
        <div className="logo">Nexus<span style={{color: 'var(--primary-color)'}}>Soft</span></div>
        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#pricing">Pricing</a></li>
          <li><a href="#about">About</a></li>
        </ul>
        <button className="nav-btn">Get Started</button>
        <button className="mobile-menu-btn">☰</button>
      </div>
    </nav>
  );
};

export default Navbar;
