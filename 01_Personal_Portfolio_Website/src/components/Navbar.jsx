import { useState, useEffect } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
  ];

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      width: '100%',
      zIndex: 1000,
      transition: 'all 0.3s ease',
      background: isScrolled ? 'rgba(10, 10, 14, 0.8)' : 'transparent',
      backdropFilter: isScrolled ? 'blur(12px)' : 'none',
      borderBottom: isScrolled ? '1px solid var(--border-glass)' : '1px solid transparent',
      padding: isScrolled ? '1rem 0' : '1.5rem 0'
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="#home" style={{ fontSize: '1.5rem', fontWeight: '800', fontFamily: 'Outfit', color: 'var(--text-main)' }}>
          Bhushan<span className="text-gradient">.dev</span>
        </a>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }} className="desktop-nav">
          <ul style={{ display: 'flex', gap: '2rem' }}>
            {navLinks.map((link) => (
              <li key={link.name}>
                <a 
                  href={link.href} 
                  style={{ color: 'var(--text-muted)', fontSize: '0.95rem', fontWeight: '500', transition: 'color 0.2s' }}
                  onMouseOver={(e) => e.target.style.color = 'var(--primary)'}
                  onMouseOut={(e) => e.target.style.color = 'var(--text-muted)'}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          <a href="#contact" className="btn-outline" style={{ padding: '0.5rem 1.2rem', fontSize: '0.9rem' }}>Let's Talk</a>
        </div>
      </div>
    </nav>
  );
}
