import { useEffect, useRef, useState } from "react";
import "./HomePage.css";

/* ── Animated Counter ── */
function Counter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      let start = 0;
      const duration = 1500;
      const step = (timestamp) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        setCount(Math.floor(progress * target));
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* ── Typewriter ── */
const ROLES = ["Full-Stack Developer", "UI/UX Enthusiast", "Problem Solver", "Open Source Contributor"];

function Typewriter() {
  const [text, setText] = useState("");
  const [roleIdx, setRoleIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = ROLES[roleIdx];
    const speed = deleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!deleting) {
        if (text.length < current.length) {
          setText(current.slice(0, text.length + 1));
        } else {
          setTimeout(() => setDeleting(true), 1800);
        }
      } else {
        if (text.length > 0) {
          setText(current.slice(0, text.length - 1));
        } else {
          setDeleting(false);
          setRoleIdx((i) => (i + 1) % ROLES.length);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [text, deleting, roleIdx]);

  return (
    <span className="typewriter">
      {text}
      <span className="typewriter-cursor">|</span>
    </span>
  );
}

/* ── Main Component ── */
export default function HomePage({ navigate, portfolio }) {
  const profile = portfolio?.profile || {};
  const projects = portfolio?.projects || [];

  return (
    <div className="home-page">
      {/* Hero */}
      <section className="hero">
        {/* Background grid */}
        <div className="hero__grid" aria-hidden />

        {/* Floating orbs */}
        <div className="hero__orb hero__orb--1" />
        <div className="hero__orb hero__orb--2" />

        <div className="hero__content container">
          <div className="hero__text-block">
            <span className="section-label">Portfolio — {new Date().getFullYear()}</span>
            <h1 className="hero__headline">
              Hello, I'm <br />
              <em>{profile.name || "Your Name"}</em>
            </h1>
            <div className="hero__role">
              <span className="hero__role-prefix">I'm a </span>
              <Typewriter />
            </div>
            <p className="hero__description">
              I design and build exceptional digital experiences from pixel-perfect interfaces to robust backend systems. Let's create something remarkable together.
            </p>
            <div className="hero__actions">
              <button className="btn btn-primary" onClick={() => navigate("contact")}>
                Start a Project →
              </button>
              <button className="btn btn-ghost" onClick={() => navigate("about")}>
                Learn More
              </button>
            </div>
          </div>

          {/* Hero visual: abstract card */}
          <div className="hero__visual">
            <div className="hero-card">
              <div className="hero-card__header">
                <span className="hero-card__dot" style={{background:"#ff5f57"}}/>
                <span className="hero-card__dot" style={{background:"#febc2e"}}/>
                <span className="hero-card__dot" style={{background:"#28c840"}}/>
                <span style={{flex:1}}/>
                <span className="hero-card__label">portfolio.dev</span>
              </div>
              <div className="hero-card__body">
                <div className="code-line"><span className="c-kw">const</span> <span className="c-var">dev</span> <span className="c-op">=</span> {'{'}</div>
                <div className="code-line code-indent"><span className="c-key">name</span><span className="c-op">:</span> <span className="c-str">"{profile.name || "Your Name"}"</span><span className="c-op">,</span></div>
                <div className="code-line code-indent"><span className="c-key">role</span><span className="c-op">:</span> <span className="c-str">"{profile.role || "Full-Stack Dev"}"</span><span className="c-op">,</span></div>
                <div className="code-line code-indent"><span className="c-key">available</span><span className="c-op">:</span> <span className="c-bool">true</span><span className="c-op">,</span></div>
                <div className="code-line code-indent"><span className="c-key">skills</span><span className="c-op">:</span> <span className="c-op">[</span><span className="c-str">"React"</span><span className="c-op">,</span> <span className="c-str">"Node"</span><span className="c-op">,</span> <span className="c-str">"..."</span><span className="c-op">],</span></div>
                <div className="code-line">{'}'}<span className="c-op">;</span></div>
                <div className="code-line code-spacer" />
                <div className="code-line"><span className="c-kw">export default</span> <span className="c-var">dev</span><span className="c-op">;</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hero__scroll">
          <div className="scroll-mouse"><div className="scroll-wheel" /></div>
          <span>Scroll to explore</span>
        </div>
      </section>

      {/* Stats bar */}
      <section className="stats-bar">
        <div className="container">
          <div className="stats-bar__grid">
            {[
              { label: "Projects Delivered", target: 40, suffix: "+" },
              { label: "Happy Clients",      target: 25, suffix: "+" },
              { label: "Years Experience",   target: 5,  suffix: "+" },
              { label: "Technologies",       target: 20, suffix: "+" },
            ].map((stat) => (
              <div className="stat-item" key={stat.label}>
                <div className="stat-number">
                  <Counter target={stat.target} suffix={stat.suffix} />
                </div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Work */}
      <section className="featured section-pad">
        <div className="container">
          <span className="section-label">Selected Work</span>
          <span className="gold-line" />
          <h2 className="section-title">Recent Projects</h2>

          <div className="projects-grid">
            {projects.map((project) => (
              <article className="project-card" key={project.num}>
                <div className="project-card__num" style={{ color: project.color }}>
                  {project.num}
                </div>
                <div className="project-card__tag">{project.tag}</div>
                <h3 className="project-card__title">{project.title}</h3>
                <p className="project-card__desc">{project.desc}</p>
                <div className="project-card__tech">
                  {project.tech.map((t) => (
                    <span key={t} className="tech-chip">{t}</span>
                  ))}
                </div>
                <div className="project-card__footer">
                  {project.link ? (
                    <a className="project-card__btn" href={project.link} target="_blank" rel="noopener noreferrer">
                      View Project
                    </a>
                  ) : (
                    <button className="project-card__btn">View Project</button>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="cta-strip">
        <div className="container">
          <div className="cta-strip__inner">
            <div>
              <h2 className="cta-strip__title">Ready to build something?</h2>
              <p className="cta-strip__sub">Let's discuss your next project over a call.</p>
            </div>
            <div className="cta-strip__actions">
              <button className="btn btn-primary" onClick={() => navigate("contact")}>
                Schedule a Call
              </button>
              <button className="btn btn-ghost" onClick={() => navigate("skills")}>
                View Skills
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
