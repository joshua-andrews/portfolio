export default function CTA() {
  return (
    <section className="cta-section" id="cta">
      <h2>
        Ready to <span className="text-gradient">Get Started?</span>
      </h2>
      <p>
        Let&apos;s build an email system that prints money while you sleep.
      </p>
      <a
        href="https://www.linkedin.com/in/joshuaandrewsmarketing/"
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-primary"
      >
        Let&apos;s Connect
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </a>
    </section>
  );
}
