"use client";
import { useRef, useEffect, useState } from "react";

const reviews = [
  {
    text: `"Josh skyrocketed our email revenue from <strong>19% to 34%</strong>, making us <strong>$2.7M in just 3 months!</strong>"`,
    name: "Adam H.",
    role: "CEO @ ELO",
  },
  {
    text: `"Josh is a <strong>WIZARD at Klaviyo email marketing</strong>. His strategic genius is matched by his stunning graphic designs & sophisticated use of AI for razor-sharp segmentation."`,
    name: "Michael T.",
    role: "Marketing Director @ 3 Brothers Decking",
  },
  {
    text: `"I’d like to recognize Josh for his exceptional ability with refining email strategy. His thorough analysis, well-structured recommendations, and proactive process improvements set a high standard... an incredible asset to any team."`,
    name: "Dominic L.",
    role: "Dir. Marketing @ Rainfactory | $1B+ Generated",
  },
  {
    text: `"Josh has completely redefined what I expect from an email marketing specialist. He's not only incredibly professional, proactive and creative, he's also one of the kindest and most thoughtful I've ever met."`,
    name: "Suki H.",
    role: "Creator Growth Strategist @ TikTok",
  },
  {
    text: `"He never stopped thinking about how to improve our processes and continually worked to develop creative solutions. If you're looking for someone with a never-ending passion for problem solving, Josh is your guy."`,
    name: "Christie Z.",
    role: "Head of Comms @ Rainfactory",
  },
  {
    text: `"We are so happy to have you! The CFO and I just called, and both of us agreed that you are <strong>one of the best writers we have!</strong> So lucky 🍀"`,
    name: "Laura M.",
    role: "CEO @ Publishing Life Services",
  },
  {
    text: `"Josh is a Klaviyo MASTER — generated ~$1000 in 3 days for our start up, 65%+ open rates, 7%+ click rates. Working with him transformed our email marketing from zero to hero."`,
    name: "Isaac B.",
    role: "Founder @ Stile dè Amor Galleria",
  },
  {
    text: `"Josh has a rare combination of technical skill, strategic thinking, and genuine curiosity. His ability to brainstorm innovative ways to automate processes... genuinely transformed the way we approach projects."`,
    name: "Tasha S.",
    role: "Enterprise Account Manager @ Fluz",
  },
];

export default function WrittenTestimonials() {
  // Duplicate for infinite scroll
  const allReviews = [...reviews, ...reviews];
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Only start animation when section enters viewport
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="written-testimonials-section" id="written-reviews" ref={sectionRef}>
      <div className="written-reviews-marquee">
        <div
          className="written-reviews-track"
          style={{
            animationPlayState: isVisible ? "running" : "paused",
          }}
        >
          {allReviews.map((review, i) => (
            <div key={i} className="written-review-card" role="listitem">
              <div className="written-review-stars">★★★★★</div>
              <p
                className="written-review-text"
                dangerouslySetInnerHTML={{ __html: review.text }}
              />
              <div className="written-review-author">
                <div className="written-author-name">{review.name}</div>
                <div className="written-author-role">{review.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
