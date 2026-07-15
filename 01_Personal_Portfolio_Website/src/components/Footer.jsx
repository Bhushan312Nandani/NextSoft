import { FiGithub, FiLinkedin, FiMail, FiPhone } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer id="contact" style={{ 
      background: 'rgba(10, 10, 14, 0.8)', 
      borderTop: '1px solid var(--border-glass)',
      padding: '4rem 0 2rem 0',
      marginTop: '4rem'
    }}>
      <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem', fontFamily: 'Outfit' }}>
          Let's Build Something <span className="text-gradient">Together</span>
        </h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: '500px', marginBottom: '2.5rem' }}>
          I'm currently seeking new opportunities to apply my skills in Software Engineering, AI/ML, and Cloud Infrastructure. My inbox is always open!
        </p>
        
        <a href="mailto:bhushankumarbrahman@gmail.com" className="btn-primary" style={{ marginBottom: '4rem' }}>
          Say Hello
        </a>

        <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem', color: 'var(--text-muted)' }}>
          <a href="https://github.com/Bhushan312Nandani" target="_blank" rel="noreferrer" style={{ transition: 'all 0.2s' }} onMouseOver={e=>{e.target.style.color='var(--primary)'; e.target.style.transform='translateY(-3px)'}} onMouseOut={e=>{e.target.style.color='var(--text-muted)'; e.target.style.transform='translateY(0)'}}>
            <FiGithub size={24} />
          </a>
          <a href="https://linkedin.com/in/bhushan-kumar-brahman" target="_blank" rel="noreferrer" style={{ transition: 'all 0.2s' }} onMouseOver={e=>{e.target.style.color='var(--primary)'; e.target.style.transform='translateY(-3px)'}} onMouseOut={e=>{e.target.style.color='var(--text-muted)'; e.target.style.transform='translateY(0)'}}>
            <FiLinkedin size={24} />
          </a>
          <a href="mailto:bhushankumarbrahman@gmail.com" style={{ transition: 'all 0.2s' }} onMouseOver={e=>{e.target.style.color='var(--primary)'; e.target.style.transform='translateY(-3px)'}} onMouseOut={e=>{e.target.style.color='var(--text-muted)'; e.target.style.transform='translateY(0)'}}>
            <FiMail size={24} />
          </a>
          <a href="tel:+923332529504" style={{ transition: 'all 0.2s' }} onMouseOver={e=>{e.target.style.color='var(--primary)'; e.target.style.transform='translateY(-3px)'}} onMouseOut={e=>{e.target.style.color='var(--text-muted)'; e.target.style.transform='translateY(0)'}}>
            <FiPhone size={24} />
          </a>
        </div>
        
        <div style={{ width: '100%', height: '1px', background: 'var(--border-glass)', marginBottom: '2rem' }}></div>
        
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          © {new Date().getFullYear()} Bhushan Kumar. Engineered with React & Vite.
        </p>

      </div>
    </footer>
  );
}
