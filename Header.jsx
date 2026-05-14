import { useState, useEffect } from "react";
import "./Header.css";

const NAV_LINKS = [
  { id: "home",    label: "Home" },
  { id: "about",   label: "About" },
  { id: "skills",  label: "Skills" },
  { id: "contact", label: "Contact" },
];

export default function Header({ currentPage, navigate, authUser, onAuthChange }) {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const isAdmin = authUser?.role === "admin";
  const isLoggedIn = Boolean(authUser);

  const logout = () => {
    localStorage.removeItem("portfolioToken");
    localStorage.removeItem("portfolioUserRole");
    localStorage.removeItem("portfolioUserName");
    onAuthChange?.(null);
    navigate("home");
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on page change
  useEffect(() => { setMenuOpen(false); }, [currentPage]);

  return (
    <header className={`header ${scrolled ? "header--scrolled" : ""}`}>
      <div className="header__inner container">

        {/* Logo / Wordmark */}
        <button className="header__logo" onClick={() => navigate("home")} aria-label="Go home">
          <span className="logo-bracket">[</span>
          <span className="logo-name">Portfolio</span>
          <span className="logo-bracket">]</span>
          <span className="logo-dot" />
        </button>

        {/* Desktop Nav */}
        <nav className="header__nav" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              className={`nav-link ${currentPage === link.id ? "nav-link--active" : ""}`}
              onClick={() => navigate(link.id)}
            >
              <span className="nav-link__label">{link.label}</span>
              {currentPage === link.id && <span className="nav-link__dot" />}
            </button>
          ))}
        </nav>

        {/* CTA */}
        <button className="header__cta btn btn-primary" onClick={() => (isLoggedIn && !isAdmin ? logout() : navigate(isAdmin ? "admin" : "login"))}>
          {isAdmin ? "Admin" : isLoggedIn ? "Logout" : "Login"}
        </button>

        {/* Mobile Hamburger */}
        <button
          className={`header__burger ${menuOpen ? "header__burger--open" : ""}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile Drawer */}
      <div className={`mobile-nav ${menuOpen ? "mobile-nav--open" : ""}`}>
        <nav>
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              className={`mobile-nav__link ${currentPage === link.id ? "active" : ""}`}
              onClick={() => navigate(link.id)}
            >
              <span className="mobile-nav__index">0{NAV_LINKS.indexOf(link) + 1}</span>
              {link.label}
            </button>
          ))}
        </nav>
        <button className="btn btn-primary mobile-nav__cta" onClick={() => navigate("contact")}>
          Schedule a Call
        </button>
        <button className="btn btn-outline mobile-nav__cta" onClick={() => (isLoggedIn && !isAdmin ? logout() : navigate(isAdmin ? "admin" : "login"))}>
          {isAdmin ? "Admin Panel" : isLoggedIn ? "Logout" : "Login"}
        </button>
      </div>
    </header>
  );
}
