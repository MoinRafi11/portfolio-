import "./AboutPage.css";

const TIMELINE = [
  {
    year: "2024–Present",
    role: "Senior Full-Stack Developer",
    company: "Tech Startup",
    desc: "Leading development of a SaaS platform serving 10k+ users. Architected microservices infrastructure reducing latency by 60%.",
  },
  {
    year: "2022–2024",
    role: "Frontend Engineer",
    company: "Digital Agency",
    desc: "Built high-performance React applications for Fortune 500 clients. Delivered 15+ projects with 98% client satisfaction.",
  },
  {
    year: "2020–2022",
    role: "Junior Developer",
    company: "Web Studio",
    desc: "Developed e-commerce solutions and landing pages. Wrote clean, maintainable code using modern web standards.",
  },
  {
    year: "2019–2020",
    role: "CS Graduate",
    company: "University",
    desc: "Bachelor's in Computer Science. Specialized in web technologies and software engineering principles.",
  },
];

const VALUES = [
  { icon: "◈", label: "Clean Code", desc: "Maintainability and readability are non-negotiable." },
  { icon: "◉", label: "User-First", desc: "Every decision starts with the end user's experience." },
  { icon: "◎", label: "Continuous Growth", desc: "Constantly learning, adapting, and improving." },
  { icon: "◇", label: "Collaboration", desc: "Great products are built by great teams." },
];

export default function AboutPage({ navigate, portfolio }) {
  const profile = portfolio?.profile || {};
  const timeline = portfolio?.timeline || TIMELINE;
  const facts = [
    { label: "Location", value: profile.location || "Jammu & Kashmir, India" },
    { label: "Experience", value: profile.experience || "5+ Years" },
    { label: "Speciality", value: profile.speciality || "Full-Stack Development" },
    { label: "Languages", value: profile.languages || "English, Hindi, Urdu" },
  ];

  return (
    <div className="about-page">
      {/* Page Hero */}
      <section className="about-hero">
        <div className="about-hero__bg" />
        <div className="container">
          <span className="section-label">About Me</span>
          <span className="gold-line" />
          <h1 className="about-hero__title">
            The Person Behind <br />
            <em>The Code</em>
          </h1>
        </div>
      </section>

      {/* Bio Section */}
      <section className="bio-section">
        <div className="container">
          <div className="bio-grid">
            {/* Avatar / Visual */}
            <div className="bio-visual">
              <div className="bio-avatar">
                <div className="bio-avatar__frame">
                  <div className="bio-avatar__initials">{profile.initials || "MR"}</div>
                </div>
                <div className="bio-avatar__badge">
                  <span className="availability-dot" />
                  Available for work
                </div>
              </div>

              {/* Quick Facts */}
              <div className="bio-facts">
                {facts.map((f) => (
                  <div className="fact-row" key={f.label}>
                    <span className="fact-label">{f.label}</span>
                    <span className="fact-value">{f.value}</span>
                  </div>
                ))}
              </div>

              <button className="btn btn-primary" style={{ width: "100%" }} onClick={() => navigate("contact")}>
                Let's Work Together
              </button>
            </div>

            {/* Text */}
            <div className="bio-text">
              <h2 className="bio-text__heading">
                I build software that <span className="gold-text">matters</span>.
              </h2>

              {(profile.bio || []).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}

              <div className="bio-text__cta">
                <a href="/resume.pdf" className="btn btn-outline" target="_blank" rel="noopener noreferrer">
                  Download CV ↓
                </a>
                <button className="btn btn-ghost" onClick={() => navigate("skills")}>
                  View Skills
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="values-section">
        <div className="container">
          <span className="section-label">Core Values</span>
          <span className="gold-line" />
          <h2 className="section-heading">What I Stand For</h2>
          <div className="values-grid">
            {VALUES.map((v) => (
              <div className="value-card" key={v.label}>
                <div className="value-card__icon">{v.icon}</div>
                <h3 className="value-card__label">{v.label}</h3>
                <p className="value-card__desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="timeline-section">
        <div className="container">
          <span className="section-label">Experience</span>
          <span className="gold-line" />
          <h2 className="section-heading">My Journey</h2>
          <div className="timeline">
            {timeline.map((item, i) => (
              <div className="timeline-item" key={i}>
                <div className="timeline-item__year">{item.year}</div>
                <div className="timeline-item__connector">
                  <div className="timeline-dot" />
                  {i < TIMELINE.length - 1 && <div className="timeline-line" />}
                </div>
                <div className="timeline-item__content">
                  <h3 className="timeline-item__role">{item.role}</h3>
                  <span className="timeline-item__company">{item.company}</span>
                  <p className="timeline-item__desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
