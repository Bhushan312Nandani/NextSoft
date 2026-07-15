import React, { useState, useEffect } from 'react';
import './index.css';

function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="logo">Afzal / Shumaila</div>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <section className="hero" id="home">
        <div className="hero-content">
          <h1>Building <span className="highlight">Intelligent</span> Software Ecosystems</h1>
          <p>
            Full-Stack & AI Engineer. Creator of VisaAI - an advanced unified academic and immigration intelligence platform. 
            I build shared architectures, dynamic recommendation engines, and modern user experiences.
          </p>
          <div className="hero-btns">
            <a href="#projects" className="btn btn-primary">View Projects</a>
            <a href="#contact" className="btn btn-secondary">Contact Me</a>
          </div>
        </div>
      </section>

      <section id="skills">
        <h2 className="section-title">Technical Expertise</h2>
        <div className="skills-grid">
          <div className="skill-card glass">
            <div className="skill-icon">🧠</div>
            <h3>AI & ML Integration</h3>
            <p>FastAPI, LLM Intelligence, Profile Generation, Recommendation Engines</p>
          </div>
          <div className="skill-card glass">
            <div className="skill-icon">⚡</div>
            <h3>Backend Systems</h3>
            <p>Node.js, Express, Microservices, REST APIs, OAuth</p>
          </div>
          <div className="skill-card glass">
            <div className="skill-icon">🗄️</div>
            <h3>Databases</h3>
            <p>PostgreSQL, Prisma ORM, MongoDB, Redis</p>
          </div>
          <div className="skill-card glass">
            <div className="skill-icon">🎨</div>
            <h3>Frontend Architecture</h3>
            <p>React.js, Vite, Unified Frontends, Dynamic UI</p>
          </div>
        </div>
      </section>

      <section id="projects">
        <h2 className="section-title">Featured Work</h2>
        <div className="projects-grid">
          <div className="project-card glass">
            <div className="project-image" style={{ background: 'linear-gradient(45deg, #111, #333)' }}></div>
            <div className="project-content">
              <h3 className="project-title">VisaAI / GoGlobal AI</h3>
              <p className="project-desc">
                A unified academic, career, and immigration intelligence platform. Features AI profile enhancements via GitHub/LinkedIn, eligibility engine, and smart checklist.
              </p>
              <div className="project-tags">
                <span className="tag">Node.js</span>
                <span className="tag">React</span>
                <span className="tag">Python</span>
                <span className="tag">PostgreSQL</span>
              </div>
              <a href="#" className="project-link">View Project →</a>
            </div>
          </div>

          <div className="project-card glass">
            <div className="project-image" style={{ background: 'linear-gradient(45deg, #001f3f, #0074D9)' }}></div>
            <div className="project-content">
              <h3 className="project-title">AI Document Workspace</h3>
              <p className="project-desc">
                Advanced text editor for SOP generation. Integrates AI detection analysis, plagiarism check, and grammar review to build perfect academic documents.
              </p>
              <div className="project-tags">
                <span className="tag">Vite</span>
                <span className="tag">React</span>
                <span className="tag">LLM API</span>
              </div>
              <a href="#" className="project-link">View Project →</a>
            </div>
          </div>
          
          <div className="project-card glass">
            <div className="project-image" style={{ background: 'linear-gradient(45deg, #2ECC40, #3D9970)' }}></div>
            <div className="project-content">
              <h3 className="project-title">Professor Matching System</h3>
              <p className="project-desc">
                An algorithm comparing professor research areas against student profiles to calculate compatibility scores and provide strategic advice.
              </p>
              <div className="project-tags">
                <span className="tag">Python</span>
                <span className="tag">FastAPI</span>
                <span className="tag">Machine Learning</span>
              </div>
              <a href="#" className="project-link">View Project →</a>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" style={{ textAlign: 'center' }}>
        <h2 className="section-title">Let's Connect</h2>
        <p style={{ color: '#aaa', marginBottom: '2rem' }}>
          Interested in collaborating on AI-driven platforms or modern web applications?
        </p>
        <a href="mailto:contact@example.com" className="btn btn-primary">Get in Touch</a>
      </section>

      <footer>
        <div className="social-links">
          <a href="#">GitHub</a>
          <a href="#">LinkedIn</a>
          <a href="#">Twitter</a>
        </div>
        <p style={{ color: '#666', fontSize: '0.9rem' }}>© 2026 Crafted with precision and AI.</p>
      </footer>
    </>
  );
}

export default App;
