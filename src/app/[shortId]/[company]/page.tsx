/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import _companiesData from "../../../../public/data/companies.json";

import Navbar from "@/components/Navbar";
import Trampoline from "@/components/Trampoline";
import { SkillCardsTop, SkillCardsBottom } from "@/components/SkillCards";
import Achievements from "@/components/Achievements";
import EmailDesigns from "@/components/EmailDesigns";
import Testimonials from "@/components/Testimonials";
import WrittenTestimonials from "@/components/WrittenTestimonials";
import MidCTA from "@/components/MidCTA";
import CaseStudies from "@/components/CaseStudies";
import CTA from "@/components/CTA";

// ============================================================
// Portfolio — Dynamic Company Page
// ============================================================
// An exact copy of joshandrewz.com with a personalized hero
// and the Sonata video inserted beneath the hero subtext.

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

// Brand logos — identical to Hero.tsx
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
const allLogos = Array(4).fill(brands).flat();

// ── Static Generation ───────────────────────────────────

export const dynamicParams = false;

export async function generateStaticParams() {
  const params = companiesData.map((company) => ({
    shortId: company.shortId,
    company: company.slug,
  }));

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
      title: "Josh Andrews | Email Marketer",
      description: "Email marketer and lifecycle marketing specialist.",
    };
  }

  return {
    title: `Josh Andrews | Email Marketer`,
    description: `A personalized introduction from Josh Andrews for the ${data.roleTitle} role at ${data.companyName}.`,
  };
}

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
        <Navbar />
        <section className="cx-hero" id="hero">
          <div className="container" style={{ textAlign: "center", paddingTop: 80 }}>
            <h1 className="cx-hero-title">Page Not Found</h1>
            <p className="cx-hero-subtitle">This company page doesn&apos;t exist yet.</p>
            <a href="https://joshandrewz.com" className="btn-gradient">
              ← Visit My Portfolio
            </a>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      {/* Reduce hero padding so pill+headline+stats+video+CTA are above the fold */}
      <style>{`
        .cx-hero { padding-top: calc(var(--header-height) + 2rem) !important; padding-bottom: 2rem !important; }
        .cx-hero-title { margin-bottom: 1rem !important; }
        .cx-hero-subtitle { margin-bottom: 1.5rem !important; }
        .cx-pill { margin-bottom: 1rem !important; }
      `}</style>
      <Navbar />

      {/* ── Personalized Hero (same structure as homepage Hero) ── */}
      <section className="cx-hero" id="hero">
        <div className="container">
          <div className="cx-pill">
            {data.companyName.toUpperCase()}, LOOKING FOR {/^[AEIOU]/i.test(data.roleTitle) ? "AN" : "A"} {data.roleTitle.toUpperCase()}?
          </div>
          <h1 className="cx-hero-title">
            I Build Email Systems So Sharp,<br />
            <span className="cx-highlight">They Should Come With a Disclaimer.</span>
          </h1>

          {/* Desktop stats */}
          <p className="cx-hero-subtitle hero-stats-desktop">
            <span className="hero-metric">100+ Clients</span>
            <span className="hero-metric-divider"> | </span>
            <span className="hero-metric">$1.5M+ Generated</span>
            <span className="hero-metric-divider"> | </span>
            <span className="hero-metric">500K+ Subscribers Managed</span>
          </p>

          {/* Mobile stats */}
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

          {/* ── Sonata Video — full width matching headline ── */}
          {data.videoUrl && (
            <div style={{
              width: "100%",
              maxWidth: 960,
              margin: "1.25rem auto",
              borderRadius: 16,
              overflow: "hidden",
              border: "2px solid rgba(255,255,255,0.08)",
              background: "#000",
              boxShadow: "0 8px 48px rgba(0,0,0,0.5)",
              aspectRatio: "16/9",
            }}>
              <video
                src={data.videoUrl}
                controls
                playsInline
                preload="metadata"
                style={{ width: "100%", height: "100%", display: "block", objectFit: "contain" }}
              >
                Your browser does not support the video tag.
              </video>
            </div>
          )}

          <a
            href="https://www.linkedin.com/in/josh-andrews/"
            className="btn-gradient"
          >
            Let&apos;s Chat
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>

        {/* Trust Marquee — identical to homepage */}
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

      {/* ── Rest of the page: exact same as homepage ── */}
      <div className="section-divider" />
      <Trampoline />
      <section className="five-reasons-headline">
        <h2 className="cx-section-title cx-title-xl">
          Here are Top 5 Reasons Why You Should <s>Fear</s> Consider Me
        </h2>
      </section>

      <SkillCardsTop />
      <Achievements />
      <SkillCardsBottom />

      <section className="testimonials-headline">
        <h2 className="cx-section-title cx-title-xl">
          And Here Are 50+ More Reasons <span className="text-gradient">From Other People</span>
        </h2>
      </section>
      <Testimonials />
      <WrittenTestimonials />
      <MidCTA />
      <CaseStudies />
      <EmailDesigns />
      <CTA />
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Josh Andrews. All rights reserved.</p>
      </footer>
    </>
  );
}
