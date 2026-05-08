import type { Metadata } from "next";
import _companiesData from "../../../../public/data/companies.json";

// ============================================================
// Portfolio — Dynamic Company Page
// ============================================================
// Generated at build time from public/data/companies.json.
// URL: joshandrewz.com/{shortId}/{company-slug}
// The shortId is a random 5-char alphanumeric string that makes
// each URL unique and non-guessable.

interface CompanyPageData {
  shortId: string;
  slug: string;
  companyName: string;
  roleTitle: string;
  videoUrl: string;
  highlights: string[];
  introText: string;
  createdAt: string;
}

const companiesData = _companiesData as CompanyPageData[];

// ── Static Generation ───────────────────────────────────

export const dynamicParams = false;

export async function generateStaticParams() {
  const params = companiesData.map((company) => ({
    shortId: company.shortId,
    company: company.slug,
  }));

  // Placeholder to satisfy Next.js 16 static export
  if (!params.some((p) => p.shortId === "_" && p.company === "_")) {
    params.push({ shortId: "_", company: "_" });
  }

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ shortId: string; company: string }>;
}): Promise<Metadata> {
  const { shortId, company: slug } = await params;
  const data = companiesData.find(
    (c) => c.shortId === shortId && c.slug === slug
  );

  if (!data) {
    return {
      title: "Josh Andrews",
      description: "Email marketer and lifecycle marketing specialist.",
    };
  }

  return {
    title: `Josh Andrews × ${data.companyName}`,
    description: `A personalized introduction from Josh Andrews for the ${data.roleTitle} role at ${data.companyName}.`,
  };
}

// ── View Tracking Script ────────────────────────────────
const VIEW_TRACK_SCRIPT = `
(function() {
  var endpoint = document.querySelector('meta[name="view-track"]');
  if (endpoint && endpoint.content) {
    var path = window.location.pathname;
    fetch(endpoint.content + '?path=' + encodeURIComponent(path) + '&r=' + encodeURIComponent(document.referrer), {
      method: 'GET',
      mode: 'no-cors'
    }).catch(function() {});
  }
})();
`;

export default async function CompanyPage({
  params,
}: {
  params: Promise<{ shortId: string; company: string }>;
}) {
  const { shortId, company: slug } = await params;
  const data = companiesData.find(
    (c) => c.shortId === shortId && c.slug === slug
  );

  if (!data) {
    return (
      <>
        <style>{pageStyles}</style>
        <div className="company-page">
          <div className="company-container">
            <div className="company-not-found">
              <h1>Page Not Found</h1>
              <p>This company page doesn&apos;t exist yet.</p>
              <a href="/" className="company-cta-btn">
                ← Visit My Portfolio
              </a>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{pageStyles}</style>
      <meta
        name="view-track"
        content={process.env.VIEW_TRACK_ENDPOINT || ""}
      />
      <script dangerouslySetInnerHTML={{ __html: VIEW_TRACK_SCRIPT }} />

      <div className="company-page">
        {/* ── Nav Bar ───────────────────────────────── */}
        <nav className="company-nav">
          <a href="/" className="company-logo">Josh Andrews</a>
          <div className="company-nav-links">
            <a href="/#skills">Skills</a>
            <a href="/#achievements">Achievements</a>
            <a href="/#testimonials">Testimonials</a>
            <a href="/#case-studies">Case Studies</a>
          </div>
        </nav>

        <div className="company-container">
          {/* ── Hero Section ────────────────────────── */}
          <header className="company-hero">
            <div className="company-eyebrow">
              {data.companyName.toUpperCase()} LOOKING FOR A {data.roleTitle.toUpperCase()}?
            </div>
            <h1 className="company-title">
              A Personal Message for{" "}
              <span className="company-gradient">{data.companyName}</span>
            </h1>
            <p className="company-subtitle">
              {data.roleTitle} • Personalized for you
            </p>
          </header>

          {/* ── Intro Text ─────────────────────────── */}
          {data.introText && (
            <section className="company-intro-section">
              <div className="company-intro-card">
                <p>{data.introText}</p>
              </div>
            </section>
          )}

          {/* ── Highlights ─────────────────────────── */}
          {data.highlights && data.highlights.length > 0 && (
            <section className="company-highlights">
              <h2>What I Bring to the Table</h2>
              <div className="company-highlights-grid">
                {data.highlights.map((highlight, i) => (
                  <div key={i} className="company-highlight-item">
                    <div className="company-highlight-number">{i + 1}</div>
                    <p>{highlight}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ── Video — 16:9, between content and CTA ── */}
          {data.videoUrl && (
            <section className="company-video-section">
              <div className="company-video-wrapper">
                <video
                  src={data.videoUrl}
                  controls
                  playsInline
                  preload="metadata"
                  className="company-video"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </section>
          )}

          {/* ── CTA ────────────────────────────────── */}
          <section className="company-cta-section">
            <a href="/" className="company-cta-btn company-cta-primary">
              Let&apos;s Chat →
            </a>
          </section>

          {/* ── Footer ─────────────────────────────── */}
          <footer className="company-footer">
            <p>
              &copy; {new Date().getFullYear()} Josh Andrews. This page was
              created specifically for {data.companyName}.
            </p>
          </footer>
        </div>
      </div>
    </>
  );
}

// ── Page Styles ─────────────────────────────────────────
const pageStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@700;800&display=swap');

  .company-page {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    background: #07070d;
    color: #eaeaf4;
    line-height: 1.7;
    min-height: 100vh;
  }

  .company-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 40px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .company-logo {
    font-family: 'Outfit', sans-serif;
    font-weight: 800;
    font-size: 1.1rem;
    color: #eaeaf4;
    text-decoration: none;
  }

  .company-nav-links {
    display: flex;
    gap: 24px;
  }

  .company-nav-links a {
    color: rgba(234, 234, 244, 0.6);
    text-decoration: none;
    font-size: 0.85rem;
    font-weight: 500;
    transition: color 0.2s;
  }

  .company-nav-links a:hover {
    color: #eaeaf4;
  }

  .company-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px 24px 40px;
  }

  .company-hero {
    text-align: center;
    margin-bottom: 40px;
    padding-top: 40px;
  }

  .company-eyebrow {
    display: inline-block;
    padding: 6px 16px;
    border-radius: 999px;
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    background: rgba(249, 115, 22, 0.1);
    color: #f97316;
    border: 1px solid rgba(249, 115, 22, 0.25);
    margin-bottom: 24px;
  }

  .company-title {
    font-family: 'Outfit', sans-serif;
    font-weight: 800;
    font-size: 2.6rem;
    margin-bottom: 12px;
    letter-spacing: -0.02em;
    line-height: 1.2;
  }

  .company-gradient {
    background: linear-gradient(135deg, #f97316, #ec4899, #a855f7);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .company-subtitle {
    font-size: 1.05rem;
    color: rgba(234, 234, 244, 0.55);
  }

  /* ── Video — 16:9 screen recording ── */
  .company-video-section {
    margin-bottom: 32px;
    display: flex;
    justify-content: center;
  }

  .company-video-wrapper {
    position: relative;
    width: 100%;
    max-width: 800px;
    aspect-ratio: 16 / 9;
    border-radius: 16px;
    overflow: hidden;
    border: 2px solid rgba(255, 255, 255, 0.08);
    background: #000;
    box-shadow: 0 8px 48px rgba(0, 0, 0, 0.5);
  }

  .company-video {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
  }

  /* ── CTA ── */
  .company-cta-section {
    text-align: center;
    margin-bottom: 48px;
  }

  .company-cta-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 14px 32px;
    border-radius: 10px;
    font-family: 'Inter', sans-serif;
    font-size: 0.95rem;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.2s ease;
    cursor: pointer;
    border: none;
  }

  .company-cta-primary {
    background: linear-gradient(135deg, #f97316, #ec4899, #a855f7);
    color: white;
    box-shadow: 0 4px 16px rgba(249, 115, 22, 0.3);
  }

  .company-cta-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 24px rgba(249, 115, 22, 0.45);
  }

  /* ── Highlights ── */
  .company-highlights {
    margin-bottom: 48px;
  }

  .company-highlights h2 {
    font-family: 'Outfit', sans-serif;
    font-weight: 700;
    font-size: 1.5rem;
    text-align: center;
    margin-bottom: 24px;
  }

  .company-highlights-grid {
    display: grid;
    gap: 16px;
  }

  .company-highlight-item {
    display: flex;
    align-items: center;
    gap: 16px;
    background: #0e0e18;
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 12px;
    padding: 20px 24px;
    transition: all 0.25s ease;
  }

  .company-highlight-item:hover {
    border-color: rgba(249, 115, 22, 0.3);
    transform: translateX(4px);
  }

  .company-highlight-number {
    flex-shrink: 0;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: linear-gradient(135deg, #f97316, #ec4899);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Outfit', sans-serif;
    font-weight: 800;
    font-size: 0.9rem;
    color: white;
  }

  .company-highlight-item p {
    margin: 0;
    font-size: 0.95rem;
    color: rgba(234, 234, 244, 0.7);
  }

  .company-intro-section {
    margin-bottom: 48px;
  }

  .company-intro-card {
    background: #0e0e18;
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 16px;
    padding: 32px;
  }

  .company-intro-card p {
    font-size: 1.05rem;
    line-height: 1.8;
    color: rgba(234, 234, 244, 0.7);
    margin: 0;
  }

  .company-footer {
    text-align: center;
    padding: 24px 0;
    border-top: 1px solid rgba(255, 255, 255, 0.06);
  }

  .company-footer p {
    font-size: 0.8rem;
    color: rgba(234, 234, 244, 0.3);
    margin: 0;
  }

  .company-not-found {
    text-align: center;
    padding: 80px 0;
  }

  .company-not-found h1 {
    font-family: 'Outfit', sans-serif;
    font-weight: 800;
    font-size: 2rem;
    margin-bottom: 12px;
  }

  .company-not-found p {
    color: rgba(234, 234, 244, 0.55);
    margin-bottom: 24px;
  }

  @media (max-width: 640px) {
    .company-title {
      font-size: 1.8rem;
    }

    .company-container {
      padding: 24px 16px;
    }

    .company-nav {
      padding: 12px 16px;
    }

    .company-nav-links {
      display: none;
    }

    .company-video-wrapper {
      max-width: 100%;
    }
  }
`;
