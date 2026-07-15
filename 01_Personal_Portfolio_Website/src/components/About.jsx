import { FiCode, FiCloud, FiShield } from 'react-icons/fi';

export default function About() {
  const features = [
    {
      icon: <FiCode size={24} />,
      title: "Full-Stack Development",
      desc: "Building responsive, dynamic web applications with React, Node.js, and modern CSS."
    },
    {
      icon: <FiCloud size={24} />,
      title: "Cloud & Serverless",
      desc: "Architecting scalable infrastructure using AWS Lambda, S3, API Gateway, and Docker."
    },
    {
      icon: <FiShield size={24} />,
      title: "Cyber Security",
      desc: "Implementing secure authentication, proxy gateways, and network auditing tools."
    }
  ];

  return (
    <section id="about" style={{ position: 'relative' }}>
      <div className="container">
        <h2 className="section-title">About Me</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          
          <div className="glass-panel" style={{ padding: '3rem 2rem' }}>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: 'var(--primary)' }}>Education</h3>
            <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              B.Sc. Computer Science
            </p>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              Sukkur IBA University <br/>
              <span style={{ fontSize: '0.9rem' }}>Expected Graduation: Aug 2026</span>
            </p>
            
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.7' }}>
              I am deeply passionate about engineering robust systems. My journey spans from crafting pixel-perfect mobile applications in React Native to deploying resilient serverless architectures on AWS. I thrive on challenges, whether it's building a compiler IDE, a real-time collaborative doc-editor, or simulating blockchain consensus mechanisms.
            </p>
          </div>

          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {features.map((f, i) => (
              <div key={i} className="glass-panel" style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', padding: '1.5rem' }}>
                <div style={{ 
                  background: 'rgba(99, 102, 241, 0.1)', 
                  padding: '1rem', 
                  borderRadius: '12px',
                  color: 'var(--secondary)'
                }}>
                  {f.icon}
                </div>
                <div>
                  <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{f.title}</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
