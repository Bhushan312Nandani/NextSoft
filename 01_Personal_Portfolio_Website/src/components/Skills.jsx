export default function Skills() {
  const skillCategories = [
    {
      title: "Frontend & Mobile",
      skills: ["React.js", "React Native", "JavaScript (ES6+)", "HTML5/CSS3", "Vite", "Responsive Design"]
    },
    {
      title: "Backend & APIs",
      skills: ["Node.js", "Express.js", "Spring Boot", "REST APIs", "WebSocket", "PHP", "Java", "Python"]
    },
    {
      title: "Cloud & DevOps",
      skills: ["AWS Lambda", "AWS S3", "API Gateway", "Docker", "Kubernetes", "CI/CD (GitHub Actions)", "Linux CLI"]
    },
    {
      title: "Databases & Security",
      skills: ["MongoDB", "MySQL", "PostgreSQL", "Nmap", "Wireshark", "Metasploit", "OWASP ZAP", "JWT Auth"]
    }
  ];

  return (
    <section id="skills" style={{ background: 'rgba(255, 255, 255, 0.01)' }}>
      <div className="container">
        <h2 className="section-title">Technical Arsenal</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          {skillCategories.map((cat, idx) => (
            <div key={idx} className="glass-panel" style={{ display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ 
                fontSize: '1.2rem', 
                marginBottom: '1.5rem', 
                color: 'var(--text-main)',
                borderBottom: '1px solid var(--border-glass)',
                paddingBottom: '0.8rem'
              }}>
                {cat.title}
              </h3>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
                {cat.skills.map((skill, i) => (
                  <span key={i} style={{
                    background: 'rgba(99, 102, 241, 0.1)',
                    border: '1px solid rgba(99, 102, 241, 0.2)',
                    color: '#c7d2fe',
                    padding: '0.4rem 0.8rem',
                    borderRadius: '6px',
                    fontSize: '0.85rem',
                    fontWeight: '500',
                    transition: 'all 0.3s ease',
                    cursor: 'default'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.background = 'var(--primary)';
                    e.target.style.color = 'white';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = 'rgba(99, 102, 241, 0.1)';
                    e.target.style.color = '#c7d2fe';
                  }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
