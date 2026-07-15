import { FiDownload, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

export default function Hero() {
  return (
    <section id="home" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: '80px' }}>
      <div className="container animate-fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', maxWidth: '800px' }}>
        
        <div style={{
          padding: '0.5rem 1rem',
          background: 'rgba(99, 102, 241, 0.1)',
          border: '1px solid rgba(99, 102, 241, 0.2)',
          borderRadius: '50px',
          color: 'var(--primary)',
          fontSize: '0.85rem',
          fontWeight: '600',
          marginBottom: '2rem',
          letterSpacing: '1px',
          textTransform: 'uppercase'
        }}>
          Available for Opportunities
        </div>

        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: '1.1', marginBottom: '1.5rem' }}>
          Hi, I'm <span className="text-gradient">Bhushan Kumar</span><br/>
          Software Engineer.
        </h1>
        
        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '2.5rem', maxWidth: '600px', lineHeight: '1.8' }}>
          Motivated Computer Science student specializing in Software Development, AI/ML Engineering, and Cloud Infrastructure. Bridging the gap between intelligent algorithms and scalable full-stack applications.
        </p>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '3rem' }}>
          <a href="/BhushanResume.pdf" download className="btn-primary">
            <FiDownload size={18} /> Download CV
          </a>
          <a href="#projects" className="btn-outline">
            View My Work
          </a>
        </div>

        <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--text-muted)' }}>
          <a href="https://github.com/Bhushan312Nandani" target="_blank" rel="noreferrer" style={{ transition: 'color 0.2s' }} onMouseOver={e=>e.target.style.color='#fff'} onMouseOut={e=>e.target.style.color='var(--text-muted)'}>
            <FiGithub size={24} />
          </a>
          <a href="https://linkedin.com/in/bhushan-kumar-brahman" target="_blank" rel="noreferrer" style={{ transition: 'color 0.2s' }} onMouseOver={e=>e.target.style.color='#fff'} onMouseOut={e=>e.target.style.color='var(--text-muted)'}>
            <FiLinkedin size={24} />
          </a>
          <a href="mailto:bhushankumarbrahman@gmail.com" style={{ transition: 'color 0.2s' }} onMouseOver={e=>e.target.style.color='#fff'} onMouseOut={e=>e.target.style.color='var(--text-muted)'}>
            <FiMail size={24} />
          </a>
        </div>
      </div>
    </section>
  );
}
