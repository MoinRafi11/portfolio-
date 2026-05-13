import { useState, useEffect, useRef } from "react";
import "./SkillsPage.css";

/* ── Data ── */
const SKILL_CATEGORIES = [
  {
    category: "Frontend",
    color: "#4c7cc9",
    skills: [
      { name: "React / Next.js",  level: 95 },
      { name: "HTML & CSS",       level: 98 },
      { name: "TypeScript",       level: 85 },
      { name: "Vue.js",           level: 75 },
      { name: "Tailwind CSS",     level: 90 },
    ],
  },
  {
    category: "Backend",
    color: "#c9a84c",
    skills: [
      { name: "Node.js / Express", level: 90 },
      { name: "Python / Django",   level: 80 },
      { name: "REST APIs",         level: 93 },
      { name: "GraphQL",           level: 72 },
      { name: "WebSockets",        level: 78 },
    ],
  },
  {
    category: "Database",
    color: "#4caf7d",
    skills: [
      { name: "PostgreSQL",   level: 88 },
      { name: "MongoDB",      level: 85 },
      { name: "Redis",        level: 75 },
      { name: "MySQL",        level: 80 },
      { name: "Firebase",     level: 82 },
    ],
  },
  {
    category: "DevOps & Tools",
    color: "#c94c4c",
    skills: [
      { name: "Docker",       level: 80 },
      { name: "Git / GitHub", level: 95 },
      { name: "AWS",          level: 70 },
      { name: "CI/CD",        level: 75 },
      { name: "Linux",        level: 85 },
    ],
  },
];

const TECH_STACK = [
  "React", "Next.js", "TypeScript", "Node.js", "Python",
  "PostgreSQL", "MongoDB", "Docker", "AWS", "Redis",
  "GraphQL", "Tailwind", "Git", "Linux", "Firebase",
  "Express", "Django", "Vue.js", "Figma", "Prisma",
];

/* ── Skill Bar (animated on scroll) ── */
function SkillBar({ name, level, color }) {
  const [width, setWidth] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setWidth(level), 100);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [level]);

  return (
    <div className="skill-bar" ref={ref}>
      <div className="skill-bar__header">
        <span className="skill-bar__name">{name}</span>
        <span className="skill-bar__pct">{level}%</span>
      </div>
      <div className="skill-bar__track">
        <div
          className="skill-bar__fill"
          style={{
            width: `${width}%`,
            background: `linear-gradient(90deg, ${color}99, ${color})`,
            boxShadow: `0 0 10px ${color}44`,
          }}
        />
      </div>
    </div>
  );
}

/* ── Main Component ── */
export default function SkillsPage({ navigate, portfolio }) {
  const [activeTab, setActiveTab] = useState(0);
  const categories = portfolio?.skillCategories?.length ? portfolio.skillCategories : SKILL_CATEGORIES;
  const activeCategory = categories[activeTab] || categories[0];
  const services = portfolio?.services?.length ? portfolio.services : [];

  return (
    <div className="skills-page">
      {/* Hero */}
      <section className="skills-hero">
        <div className="skills-hero__bg" />
        <div className="container">
          <span className="section-label">Skills & Expertise</span>
          <span className="gold-line" />
          <h1 className="skills-hero__title">
            My Technical <br />
            <em>Toolkit</em>
          </h1>
          <p className="skills-hero__desc">
            Five years of hands-on experience across the full stack — from crafting pixel-perfect UIs to designing resilient backend architectures.
          </p>
        </div>
      </section>

      {/* Skill Bars — Tabbed */}
      <section className="skills-bars-section">
        <div className="container">
          {/* Tab nav */}
          <div className="skill-tabs">
            {categories.map((cat, i) => (
              <button
                key={cat.category}
                className={`skill-tab ${activeTab === i ? "skill-tab--active" : ""}`}
                style={activeTab === i ? { borderBottomColor: cat.color, color: cat.color } : {}}
                onClick={() => setActiveTab(i)}
              >
                {cat.category}
              </button>
            ))}
          </div>

          {/* Skill list */}
          <div className="skills-panel">
            {activeCategory.skills.map((skill) => (
              <SkillBar
                key={skill.name}
                {...skill}
                color={activeCategory.color}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Tech grid */}
      <section className="tech-grid-section">
        <div className="container">
          <span className="section-label">Technologies</span>
          <span className="gold-line" />
          <h2 className="section-heading">Tools I Work With</h2>

          <div className="tech-grid">
            {TECH_STACK.map((tech) => (
              <div className="tech-pill" key={tech}>
                <span className="tech-pill__dot" />
                {tech}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="services-section">
        <div className="container">
          <span className="section-label">What I Offer</span>
          <span className="gold-line" />
          <h2 className="section-heading">Services</h2>

          <div className="services-grid">
            {(services.length ? services : [
              {
                icon: "⬡",
                title: "Web Development",
                desc: "End-to-end web applications — from architecture planning to deployment and maintenance.",
                tags: ["React", "Node.js", "PostgreSQL"],
              },
              {
                icon: "◈",
                title: "UI/UX Design",
                desc: "User-centered interfaces that are both beautiful and intuitive. Figma to production-ready code.",
                tags: ["Figma", "CSS", "Framer"],
              },
              {
                icon: "◉",
                title: "API Development",
                desc: "Robust, well-documented REST and GraphQL APIs. Built to scale and easy to consume.",
                tags: ["REST", "GraphQL", "OpenAPI"],
              },
              {
                icon: "◎",
                title: "Performance Optimization",
                desc: "Auditing and optimizing web apps for speed, SEO, and Core Web Vitals excellence.",
                tags: ["Lighthouse", "Webpack", "CDN"],
              },
              {
                icon: "◇",
                title: "DevOps & Deployment",
                desc: "CI/CD pipelines, containerization, and cloud deployment on AWS or similar platforms.",
                tags: ["Docker", "AWS", "GitHub Actions"],
              },
              {
                icon: "◆",
                title: "Technical Consulting",
                desc: "Architecture reviews, code audits, and tech stack recommendations for teams and startups.",
                tags: ["Strategy", "Review", "Mentoring"],
              },
            ]).map((service) => (
              <div className="service-card" key={service.title}>
                <div className="service-card__icon">{service.icon}</div>
                <h3 className="service-card__title">{service.title}</h3>
                <p className="service-card__desc">{service.desc}</p>
                <div className="service-card__tags">
                  {service.tags.map((t) => (
                    <span key={t} className="tech-chip">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="skills-cta">
        <div className="container">
          <h2>Interested in working together?</h2>
          <p>Let's talk about how my skills can serve your project.</p>
          <button className="btn btn-primary" onClick={() => navigate("contact")}>
            Schedule a Conversation →
          </button>
        </div>
      </section>
    </div>
  );
}
