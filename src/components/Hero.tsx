export default function Hero() {
  return (
    <section className="hero" id="hero">
      <span className="hero-label animate-fade-in">Email Marketer</span>
      <h1 className="animate-fade-in animate-fade-in-delay-1">
        I Build Email Systems So Sharp,{" "}
        <span className="text-gradient">They Should Come With a Disclaimer.</span>
      </h1>
      <p className="hero-subtitle animate-fade-in animate-fade-in-delay-2">
        Get emails that cut deep and automations that never sleep.
      </p>
      <a
        href="https://www.linkedin.com/in/joshuaandrewsmarketing/"
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-primary animate-fade-in animate-fade-in-delay-3"
      >
        Increase Email Aura Now
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </a>
      <div className="hero-stats animate-fade-in animate-fade-in-delay-4">
        <div className="hero-stat">
          <div className="hero-stat-value">$2.7M+</div>
          <div className="hero-stat-label">Revenue Generated</div>
        </div>
        <div className="hero-stat">
          <div className="hero-stat-value">500K+</div>
          <div className="hero-stat-label">Subscribers Managed</div>
        </div>
        <div className="hero-stat">
          <div className="hero-stat-value">100+</div>
          <div className="hero-stat-label">Clients Served</div>
        </div>
      </div>
    </section>
  );
}
