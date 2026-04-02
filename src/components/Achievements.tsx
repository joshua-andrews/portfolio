"use client";
import { useEffect, useRef, useState, useCallback } from "react";

/* ── Animated Counter Hook ── */
function useCounter(target: number, duration: number, isActive: boolean) {
  const [value, setValue] = useState(0);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isActive) return;
    const start = performance.now();
    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [target, duration, isActive]);

  return value;
}

/* ── Upwork SVG (exact: viewBox 0 0 24 24, fill #16a34a, 32x32) ── */
function UpworkSVG() {
  return (
    <svg viewBox="0 0 24 24" fill="#16a34a" style={{ width: 32, height: 32 }}>
      <path
        d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z"
        fill="#16a34a"
      />
    </svg>
  );
}

/* ── Klaviyo SVG (exact: white rect bg, red flag, viewBox 0 0 24 24, 32x32) ── */
function KlaviyoSVG() {
  return (
    <svg viewBox="0 0 24 24" fill="#ef4444" style={{ width: 32, height: 32 }}>
      <rect x="2" y="2" width="20" height="20" rx="4" fill="white" stroke="#e5e5e5" strokeWidth="1" />
      <path d="M16 7L13 9.5L16 12H8V17H6V7H16Z" fill="#ef4444" />
    </svg>
  );
}

/* eslint-disable @next/next/no-img-element */
function McMasterLogo() {
  return (
    <img src="https://owlmd.ca/images/mcmaster-logo.png" alt="McMaster" style={{ width: 32, height: 32, objectFit: 'contain', borderRadius: 4 }} />
  );
}

function MohawkLogo() {
  return (
    <img src="https://www.mohawkcollege.ca/sites/default/files/styles/gallery_large/public/default_images/event-m-mohawk-780x430.jpg?itok=Hy5QK5XB" alt="Mohawk" style={{ width: 32, height: 32, objectFit: 'contain', borderRadius: 4 }} />
  );
}

/* ── Badge Data ── */
const badges = [
  {
    Logo: KlaviyoSVG,
    title: <>PRODUCT<br />CERTIFICATE</>,
    ribbon: "KLAVIYO",
    year: "2026",
  },
  {
    Logo: KlaviyoSVG,
    title: <>PRODUCT<br />DELIVERABILITY</>,
    ribbon: "KLAVIYO",
    year: "2026",
  },
  {
    Logo: KlaviyoSVG,
    title: <>DEVELOPER<br />CERTIFICATE</>,
    ribbon: "KLAVIYO",
    year: "2026",
  },
  {
    Logo: UpworkSVG,
    title: <>100% JOB<br />SUCCESS SCORE</>,
    ribbon: "UPWORK",
    year: "2026",
  },
  {
    Logo: UpworkSVG,
    title: <>TOP<br />RATED</>,
    ribbon: "UPWORK",
    year: "2024",
  },
  {
    Logo: McMasterLogo,
    title: <>B.TECH DEGREE<br />AUTOMOTIVE ENG.</>,
    ribbon: "MCMASTER",
    year: "2019",
  },
  {
    Logo: MohawkLogo,
    title: <>M. ENG. TECH<br />ADVANCED DIPLOMA</>,
    ribbon: "MOHAWK",
    year: "2019",
  },
  {
    Logo: MohawkLogo,
    title: <>BUSINESS ADMIN.<br />MGMT & OPS</>,
    ribbon: "MOHAWK",
    year: "2019",
  },
];

export default function Achievements() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const counter1 = useCounter(27, 3500, isVisible);
  const counter2 = useCounter(500, 3500, isVisible);
  const counter3 = useCounter(100, 3500, isVisible);

  const observerCallback = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !isVisible) {
        setIsVisible(true);
      }
    });
  }, [isVisible]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(observerCallback, { threshold: 0.2 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [observerCallback]);

  return (
    <section className="achievements-section" id="achievements" ref={sectionRef}>
      <div className="achievements-header">
        <span className="skill-card-label" style={{ marginBottom: '1rem', display: 'inline-block' }}>3. Achievements</span>
      </div>

      <div className="sp-stats-grid">
        <div className="sp-stat-item">
          <div className="sp-stat-number">
            ${(counter1 / 10).toFixed(1)}
            <span className="stat-suffix-gradient">M+</span>
          </div>
          <div className="sp-stat-label">Revenue Generated</div>
        </div>
        <div className="sp-stat-item">
          <div className="sp-stat-number">
            {counter2}
            <span className="stat-suffix-gradient">K+</span>
          </div>
          <div className="sp-stat-label">Email/SMS Subscribers Managed</div>
        </div>
        <div className="sp-stat-item">
          <div className="sp-stat-number">
            {counter3}
            <span className="stat-suffix-gradient">+</span>
          </div>
          <div className="sp-stat-label">Clients Worked With</div>
        </div>
      </div>

      {/* Badges Grid — exact 1:1 replica of copyculture.io/agency */}
      <div className="sp-badges-grid">
        {badges.map((badge, i) => (
          <div key={i} className="sp-badge badge-green">
            <div className="badge-content">
              <div className="badge-logo">
                <badge.Logo />
              </div>
              <div className="badge-title">{badge.title}</div>
              <div className="badge-ribbon">{badge.ribbon}</div>
              <div className="badge-year">{badge.year}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
