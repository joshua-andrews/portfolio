"use client";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const links = [
    { href: "#skills", label: "Skills" },
    { href: "#achievements", label: "Achievements" },
    { href: "#testimonials", label: "Testimonials" },
    { href: "#case-studies", label: "Case Studies" },
    { href: "#designs", label: "Email Designs" },
  ];

  function handleLinkClick() {
    setMenuOpen(false);
  }

  return (
    <>
      <nav className="navbar">
        <div className="navbar-inner">
          <span className="navbar-logo">Josh Andrews</span>
          <div className="navbar-links">
            {links.map((link) => (
              <a key={link.href} href={link.href} className="navbar-link">
                {link.label}
              </a>
            ))}
            <a
              href="https://www.linkedin.com/in/josh-andrews/"
              target="_blank"
              rel="noopener noreferrer"
              className="navbar-cta"
            >
              Let&apos;s Chat
            </a>
          </div>

          {/* Hamburger — mobile only */}
          <button
            className={`navbar-hamburger ${menuOpen ? "navbar-hamburger-open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div className={`navbar-mobile-overlay ${menuOpen ? "navbar-mobile-overlay-open" : ""}`}>
        <div className="navbar-mobile-menu">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="navbar-mobile-link"
              onClick={handleLinkClick}
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://www.linkedin.com/in/josh-andrews/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gradient navbar-mobile-cta"
            onClick={handleLinkClick}
          >
            Let&apos;s Chat
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>
    </>
  );
}
