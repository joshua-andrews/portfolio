/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import WelcomeFlowAnimation from "./WelcomeFlowAnimation";
import AbandonedCheckoutFlow from "./AbandonedCheckoutFlow";
import UpsellFlow from "./UpsellFlow";

const caseStudies = [
  {
    brand: "Nerdwax",
    type: "Full Klaviyo Lifecycle Rebuild",
    image: "/images/case-studies/nerdwax.png",
    hasFlowAnimation: true,
    metrics: [
      { value: "+257%", label: "KLAVIYO REV", color: "#22c55e" },
      { value: "$286K", label: "Q1 ATTRIBUTED", color: "#f59e0b" },
      { value: "+1,245%", label: "FLOW GROWTH", color: "#a855f7" },
    ],
    details:
      "Rebuilt the entire Klaviyo flow ecosystem from scratch for Nerdwax. Grew total Klaviyo-attributed revenue from $80K to $286K (+257% YoY). Flow revenue exploded from $6.1K to $82.7K (+1,245%) by activating 5+ dormant flows, fixing structural bugs, and optimizing the Welcome Series which now drives 54.2% open rates and 6.8% click rates. Campaign revenue per 1K emails delivered grew 40%. Reduced abandoned checkout unsubscribes by 93%.",
  },
  {
    brand: "Alveos",
    type: "Kickstarter Campaign Email Marketing",
    image: "/images/case-studies/alveos.png",
    metrics: [
      { value: "$80K+", label: "RAISED", color: "#f59e0b" },
      { value: "40%+", label: "OPEN RATE", color: "#ec4899" },
      { value: "3.5%+", label: "CONVERSION", color: "#8b5cf6" },
    ],
    details:
      "Managed the entire email marketing campaign for Alveos on Kickstarter. Built segmented flows, A/B tested subject lines, and drove consistent engagement that resulted in over $80K raised with open rates exceeding 40%.",
  },
  {
    brand: "Kombi",
    type: "Kickstarter Campaign Email Marketing",
    image: "/images/case-studies/kombi.png",
    metrics: [
      { value: "$200K+", label: "RAISED", color: "#f59e0b" },
      { value: "45%+", label: "OPEN RATE", color: "#ec4899" },
      { value: "40%+", label: "DEPOSITOR CONV.", color: "#8b5cf6" },
    ],
    details:
      "Led the email marketing strategy for Kombi's Kickstarter launch. Designed high-converting sequences that achieved 45%+ open rates and converted 40% of depositors into backers, raising over $200K.",
  },
  {
    brand: "Stile de Amor",
    type: "Klaviyo Flow Setup & Optimization",
    image: "/images/case-studies/stile.webp",
    metrics: [
      { value: "~$1000", label: "3-DAY REV", color: "#f59e0b" },
      { value: "65%+", label: "OPEN RATE", color: "#ec4899" },
      { value: "7%+", label: "CLICK RATE", color: "#8b5cf6" },
    ],
    details:
      "Set up and optimized Klaviyo flows from scratch for Stile de Amor. Within 3 days, the system generated ~$1000 in revenue with open rates exceeding 65% and click rates above 7%.",
  },
  {
    brand: "Viasox",
    type: "Klaviyo Email Marketing",
    image: "/images/case-studies/viasox.jpg",
    metrics: [
      { value: "$1.2M+", label: "GENERATED", color: "#f59e0b" },
      { value: "22%+", label: "PREV. CONV. RATE", color: "#ec4899" },
      { value: "45%+", label: "NEW CONV. RATE", color: "#8b5cf6" },
    ],
    details:
      "Managed the full Klaviyo email marketing system for Viasox, generating over $1.2M in attributable revenue. Improved conversion rates from 22% to 45% through strategic flow optimization and segmentation.",
  },
];

/* Flow tabs for Nerdwax modal */
const FLOW_TABS = [
  { id: "welcome", label: "Welcome Series" },
  { id: "abandoned-checkout", label: "Abandoned Checkout" },
  { id: "upsell", label: "Upsell" },
  // Future tabs:
  // { id: "abandoned-cart", label: "Abandoned Cart" },
  // { id: "price-drop", label: "Price Drop" },
  // { id: "upsell", label: "Upsell" },
];

export default function CaseStudies() {
  const [activeStudy, setActiveStudy] = useState<number | null>(null);
  const [activeFlowTab, setActiveFlowTab] = useState("welcome");

  const activeData = activeStudy !== null ? caseStudies[activeStudy] : null;
  const isNerdwax = activeData && (activeData as any).hasFlowAnimation;

  return (
    <section className="case-studies-section" id="case-studies">
      <div className="case-studies-header">
        <h2 className="cx-section-title case-studies-title-hero">
          Real Results.<br /><span className="text-gradient">Real Impact.</span>
        </h2>

      </div>
      <div className="case-studies-grid">
        {caseStudies.map((study, i) => (
          <div
            key={i}
            className="case-study-card"
            onClick={() => { setActiveStudy(i); setActiveFlowTab("welcome"); }}
          >
            <div className="case-study-image">
              <img src={study.image} alt={study.brand} loading="lazy" />
              <div className="case-study-hover-overlay">
                <span className="case-study-hover-label">View Case Study</span>
              </div>
            </div>
            <div className="case-study-info">
              <h3 className="case-study-brand">{study.brand}</h3>
              <p className="case-study-type">{study.type}</p>
              <div className="case-study-metrics">
                {study.metrics.map((m, j) => (
                  <div key={j} className="case-study-metric">
                    <span
                      className="case-study-metric-value"
                      style={{ color: m.color }}
                    >
                      {m.value}
                    </span>
                    <span className="case-study-metric-label">{m.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Popup modal */}
      {activeStudy !== null && activeData && (
        <div
          className="case-study-modal-backdrop"
          onClick={() => setActiveStudy(null)}
        >
          <div
            className={`case-study-modal ${isNerdwax ? "case-study-modal-wide" : ""}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="case-study-modal-close"
              onClick={() => setActiveStudy(null)}
            >
              ✕
            </button>

            {isNerdwax ? (
              /* ── Nerdwax: Flow animation modal ── */
              <>
                <div className="case-study-modal-content">
                  <h3>{activeData.brand}</h3>
                  <p className="case-study-modal-type">{activeData.type}</p>
                  <p className="case-study-modal-details">{activeData.details}</p>
                  <div className="case-study-metrics">
                    {activeData.metrics.map((m, j) => (
                      <div key={j} className="case-study-metric">
                        <span className="case-study-metric-value" style={{ color: m.color }}>{m.value}</span>
                        <span className="case-study-metric-label">{m.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Flow tabs */}
                <div className="nw-flow-tabs">
                  {FLOW_TABS.map((tab) => (
                    <button
                      key={tab.id}
                      className={`nw-flow-tab ${activeFlowTab === tab.id ? "nw-flow-tab-active" : ""}`}
                      onClick={() => setActiveFlowTab(tab.id)}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Flow animation */}
                <div className="nw-flow-container">
                  {activeFlowTab === "welcome" && <WelcomeFlowAnimation />}
                  {activeFlowTab === "abandoned-checkout" && <AbandonedCheckoutFlow />}
                  {activeFlowTab === "upsell" && <UpsellFlow />}
                </div>
              </>
            ) : (
              /* ── Standard case study modal ── */
              <>
                <div className="case-study-modal-image">
                  <img src={activeData.image} alt={activeData.brand} />
                </div>
                <div className="case-study-modal-content">
                  <h3>{activeData.brand}</h3>
                  <p className="case-study-modal-type">{activeData.type}</p>
                  <p className="case-study-modal-details">{activeData.details}</p>
                  <div className="case-study-metrics">
                    {activeData.metrics.map((m, j) => (
                      <div key={j} className="case-study-metric">
                        <span className="case-study-metric-value" style={{ color: m.color }}>{m.value}</span>
                        <span className="case-study-metric-label">{m.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
