import { FiExternalLink, FiGithub } from 'react-icons/fi';

export default function Projects() {
  const projectList = [
    {
      title: "Serverless Resume-as-a-Service",
      tech: ["AWS Lambda", "S3", "API Gateway", "IAM", "Vanilla JS"],
      desc: "Enterprise-grade serverless resume publishing system. Built a zero-trust frontend with a password gatekeeper Lambda and secure S3 POST uploads, fully within AWS Free Tier.",
      github: "https://github.com/Bhushan312Nandani/serverless-resume-project",
      featured: true
    },
    {
      title: "MySQL Proxy Audit Gateway",
      tech: ["Python", "AWS Lambda", "mysql-mimic", "IAM"],
      desc: "Developed a MySQL Workbench proxy that forwards read queries to production but intercepts write/DDL commands, routing them to an AWS Lambda endpoint for administrative auditing and approval.",
      github: "https://github.com/Bhushan312Nandani/mysql-proxy-audit-gateway",
      featured: true
    },
    {
      title: "DecodeLabs Engineering Portfolio",
      tech: ["AI/ML", "DevOps", "Cyber Security", "Blockchain"],
      desc: "Collection of advanced engineering projects including KNN classifiers, automated EC2 deployment pipelines, MITM attack simulations, and custom Python Proof-of-Work blockchain ledgers.",
      github: "https://github.com/Bhushan312Nandani",
      featured: false
    },
    {
      title: "Database-Driven Event Management",
      tech: ["React", "Node.js", "Express", "MongoDB"],
      desc: "Architected a full-stack event management platform featuring real-time dynamic pricing algorithms, scheduling structures, and secure asset handling.",
      github: "https://github.com/Bhushan312Nandani",
      featured: false
    },
    {
      title: "Agri-Rent Mobile Application",
      tech: ["React Native", "Node.js", "REST APIs"],
      desc: "Cross-platform mobile application facilitating the renting and leasing of agricultural equipment. Engineered seamless navigation and real-time inventory tracking.",
      github: "https://github.com/Bhushan312Nandani",
      featured: false
    },
    {
      title: "Collaborative Doc-Editor",
      tech: ["React", "Node.js", "WebSockets"],
      desc: "Engineered a web-based document editing platform utilizing WebSockets for real-time text formatting and multi-user concurrent collaboration.",
      github: "https://github.com/Bhushan312Nandani",
      featured: false
    }
  ];

  return (
    <section id="projects">
      <div className="container">
        <h2 className="section-title">Featured Projects</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {projectList.map((project, idx) => (
            <div key={idx} className="glass-panel" style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative', overflow: 'hidden' }}>
              
              {project.featured && (
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '-2rem',
                  background: 'var(--accent)',
                  color: 'white',
                  padding: '0.2rem 2.5rem',
                  transform: 'rotate(45deg)',
                  fontSize: '0.75rem',
                  fontWeight: 'bold',
                  boxShadow: '0 2px 10px rgba(236, 72, 153, 0.4)'
                }}>
                  FEATURED
                </div>
              )}

              <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', color: 'var(--text-main)', paddingRight: '2rem' }}>
                {project.title}
              </h3>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
                {project.tech.map((t, i) => (
                  <span key={i} style={{ color: 'var(--primary)', fontSize: '0.8rem', fontWeight: '600' }}>
                    {t}{i < project.tech.length - 1 ? ' •' : ''}
                  </span>
                ))}
              </div>
              
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6', flexGrow: 1, marginBottom: '2rem' }}>
                {project.desc}
              </p>
              
              <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto' }}>
                {project.github && (
                  <a href={project.github} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)', transition: 'color 0.2s' }} onMouseOver={e=>e.target.style.color='var(--primary)'} onMouseOut={e=>e.target.style.color='var(--text-main)'}>
                    <FiGithub size={20} /> Code
                  </a>
                )}
                {project.featured && (
                  <a href={project.github} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)', transition: 'color 0.2s', marginLeft: 'auto' }} onMouseOver={e=>e.target.style.color='var(--secondary)'} onMouseOut={e=>e.target.style.color='var(--text-main)'}>
                    <FiExternalLink size={20} /> Live Demo
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
