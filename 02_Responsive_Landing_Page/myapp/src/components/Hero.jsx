import React from 'react';

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="hero-bg">
        <div className="hero-blob-1"></div>
        <div className="hero-blob-2"></div>
      </div>
      <div className="container">
        <div className="hero-content">
          <div className="hero-tag">✨ Next-Generation Platform</div>
          <h1 className="hero-title">
            Build Faster With <span>Modern Solutions</span>
          </h1>
          <p className="hero-desc">
            Empower your business with our cutting-edge responsive web solutions. 
            Experience seamless performance, stunning aesthetics, and scalable architecture.
          </p>
          <div className="hero-btns">
            <button className="btn btn-primary">Start Free Trial</button>
            <button className="btn btn-secondary">View Documentation</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
