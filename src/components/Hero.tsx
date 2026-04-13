/* eslint-disable @next/next/no-img-element */

// Brand logos - same as copyculture.io + additional
const brands = [
  { name: "Nerdwax", logo: "https://copyculture.io/Brand%20Logos/Nerdwax.png" },
  { name: "Alveos", logo: "https://copyculture.io/Brand%20Logos/Alveos.png" },
  { name: "3 Brothers Decking", logo: "https://copyculture.io/Brand%20Logos/3%20Brothers%20Decking.png" },
  { name: "Habitual Herbs", logo: "https://copyculture.io/Brand%20Logos/Habitual%20Herbs.png" },
  { name: "Funday", logo: "/logos/funday.svg" },
  { name: "Tafari Wraps", logo: "https://copyculture.io/Brand%20Logos/Tafari%20Wraps.png" },
  { name: "Rainfactory", logo: "/logos/rainfactory.svg" },
  { name: "Viasox", logo: "https://ca.viasox.com/cdn/shop/files/Viasox_Logo_Real.svg?v=1718991331&width=120" },
  { name: "Publishing Life Services", logo: "https://publishingservices.com/cdn/shop/files/PS_final_gold-2_200x.png?v=1673438297" },
  { name: "Copy Culture", logo: "https://copyculture.io/assets/logo-final.png" },
  { name: "Lion Marketing", logo: "/logos/lionmarketing.svg" },
];

// Duplicate 4x for seamless infinite loop
const allLogos = Array(4).fill(brands).flat();

export default function Hero() {
  return (
    <section className="cx-hero" id="hero">
      <div className="container">
        <div className="cx-pill">LOOKING FOR AN EMAIL MARKETER?</div>
        <h1 className="cx-hero-title">
          I Build Email Systems So Sharp,<br />
          <span className="cx-highlight">They Should Come With a Disclaimer.</span>
        </h1>
        {/* Desktop: pipe-separated, no checkmarks */}
        <p className="cx-hero-subtitle hero-stats-desktop">
          <span className="hero-metric">100+ Clients</span>
          <span className="hero-metric-divider"> | </span>
          <span className="hero-metric">$1.5M+ Generated</span>
          <span className="hero-metric-divider"> | </span>
          <span className="hero-metric">500K+ Subscribers Managed</span>
        </p>

        {/* Mobile: circular checkmarks */}
        <p className="cx-hero-subtitle hero-stats-mobile">
          <span className="hero-metric hero-stat-check">
            <span className="hero-check-circle">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
            </span>
            <span>100+ Clients</span>
          </span>
          <span className="hero-metric hero-stat-check">
            <span className="hero-check-circle">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
            </span>
            <span>$1.5M+ Generated</span>
          </span>
          <span className="hero-metric hero-stat-check">
            <span className="hero-check-circle">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
            </span>
            <span>500K+ Subscribers Managed</span>
          </span>
        </p>

        <a
          href="https://www.linkedin.com/in/josh-andrews/"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gradient"
        >
          Let&apos;s Chat
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>

      </div>

      {/* Trust Marquee - exact structure from copyculture.io */}
      <div className="container" style={{ marginTop: "3.8rem" }}>

        <div className="marquee" aria-label="Brands we've worked with">
          <div className="track" role="list">
            {allLogos.map((brand, i) => (
              <div key={i} className="logo-item" role="listitem">
                <img src={brand.logo} alt={brand.name} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
