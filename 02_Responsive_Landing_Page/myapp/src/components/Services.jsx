import React from 'react';

const Services = () => {
  const services = [
    {
      title: "Fast Performance",
      desc: "Optimized for speed and efficiency, delivering lightning-fast load times for your users.",
      icon: "⚡"
    },
    {
      title: "Responsive Design",
      desc: "Flawless experience across all devices, from mobile phones to ultra-wide desktop monitors.",
      icon: "📱"
    },
    {
      title: "Secure Architecture",
      desc: "Built with industry-leading security practices to keep your data and users safe at all times.",
      icon: "🔒"
    },
    {
      title: "Analytics Dashboard",
      desc: "Gain deep insights into your metrics with our intuitive and comprehensive reporting tools.",
      icon: "📊"
    },
    {
      title: "Cloud Integration",
      desc: "Seamlessly connect with top cloud providers for infinite scalability and reliability.",
      icon: "☁️"
    },
    {
      title: "24/7 Support",
      desc: "Our dedicated team of experts is available around the clock to assist you with any issues.",
      icon: "🎧"
    }
  ];

  return (
    <section id="services" className="section">
      <div className="container">
        <h2 className="section-title">Why Choose Us</h2>
        <div className="services-grid">
          {services.map((service, index) => (
            <div className="service-card glass" key={index}>
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-desc">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
