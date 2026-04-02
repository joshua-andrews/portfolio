/* eslint-disable @next/next/no-img-element */
"use client";
import { useRef } from "react";

const emailDesigns = [
  { brand: "Habitual Herbs", image: "/images/email-designs/habitual-herbs.png" },
  { brand: "Marsdance", image: "/images/email-designs/marsdance.png" },
  { brand: "Tafari Wraps", image: "/images/email-designs/tafari-wraps.png" },
  { brand: "Woolf", image: "/images/email-designs/woolf.png" },
  { brand: "Alveos Labs", image: "/images/email-designs/alveos-labs.png" },
  { brand: "Deeps", image: "/images/email-designs/deeps.png" },
];

export default function EmailDesigns() {
  return (
    <section className="profit-engine-section" id="designs">
      <div className="profit-engine-header">
        <h2 className="cx-section-title cx-title-lg">
          It&apos;s Time to Turn Your Klaviyo Into a{" "}
          <span className="text-gradient">Predictable Profit Engine.</span>
        </h2>
      </div>

      <div className="profit-engine-scroll-container">
        <div className="profit-engine-scroll-track">
          {[...emailDesigns, ...emailDesigns].map((design, i) => (
            <EmailDesignCard key={i} design={design} />
          ))}
        </div>
      </div>

      <p className="profit-engine-hint">Hover cards to scroll emails vertically</p>
    </section>
  );
}

function EmailDesignCard({
  design,
}: {
  design: { brand: string; image: string };
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number | null>(null);

  function handleMouseEnter() {
    const el = scrollRef.current;
    if (!el) return;
    const scrollMax = el.scrollHeight - el.clientHeight;
    if (scrollMax <= 0) return;

    let direction = 1;
    function step() {
      if (!el) return;
      el.scrollTop += direction * 1.2;
      if (el.scrollTop >= scrollMax) direction = -1;
      if (el.scrollTop <= 0) direction = 1;
      animRef.current = requestAnimationFrame(step);
    }
    animRef.current = requestAnimationFrame(step);
  }

  function handleMouseLeave() {
    if (animRef.current) cancelAnimationFrame(animRef.current);
  }

  return (
    <div
      className="profit-engine-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="profit-engine-card-scroll" ref={scrollRef}>
        <img src={design.image} alt={design.brand} loading="lazy" />
      </div>
    </div>
  );
}
