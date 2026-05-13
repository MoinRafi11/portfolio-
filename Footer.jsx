import "./Footer.css";

const SOCIALS = [
  { label: "GitHub",   href: "https://github.com",   icon: "GH" },
  { label: "LinkedIn", href: "https://linkedin.com",  icon: "LI" },
  { label: "Twitter",  href: "https://twitter.com",   icon: "TW" },
  { label: "Email",    href: "mailto:hello@portfolio.dev", icon: "✉" },
];

const QUICK_LINKS = [
  { id: "home",    label: "Home" },
  { id: "about",   label: "About" },
  { id: "skills",  label: "Skills" },
  { id: "contact", label: "Contact" },
];

export default function Footer({ navigate }) {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__top container">

        {/* Brand */}
        <div className="footer__brand">
          <div className="footer__logo">
            <span className="logo-bracket">[</span>
            <span>Portfolio</span>
            <span className="logo-bracket">]</span>
          </div>
          <p className="footer__tagline">
            Crafting digital experiences with precision and purpose.
          </p>
          <div className="footer__socials">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="social-chip"
                aria-label={s.label}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer__section">
          <h4 className="footer__heading">Navigation</h4>
          <ul>
            {QUICK_LINKS.map((l) => (
              <li key={l.id}>
                <button onClick={() => navigate(l.id)} className="footer__link">
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Status / Availability */}
        <div className="footer__section">
          <h4 className="footer__heading">Status</h4>
          <div className="availability-badge">
            <span className="availability-dot" />
            Available for new projects
          </div>
          <p className="footer__note">
            Based in Jammu &amp; Kashmir, India.<br />
            Open to remote collaboration worldwide.
          </p>
          <button className="btn btn-outline footer__cta" onClick={() => navigate("contact")}>
            Schedule a Call →
          </button>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer__bottom container">
        <p className="footer__copy">
          © {year} Portfolio. All rights reserved.
        </p>
        <p className="footer__built">
          Built with{" "}
          <span className="footer__heart">♥</span>
          {" "}using React
        </p>
      </div>
    </footer>
  );
}
