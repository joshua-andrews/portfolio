"use client";
import { useRef, useEffect, useCallback } from "react";

const videoTestimonials = [
  {
    name: "Adam H.",
    role: "CEO",
    company: "ELO",
    src: "https://testimony-videos-josh.s3.us-east-2.amazonaws.com/Adam%20-%20Email%20Marketing%20-%20eCommerce%20CEO%20Testimonial%20For%20Josh.mp4#t=2",
  },
  {
    name: "Fahad Z.",
    role: "Senior Video Editor",
    company: "Viasox",
    src: "https://testimony-videos-josh.s3.us-east-2.amazonaws.com/Fahad%20-%20Email%20Marketing%20-%20Senior%20Video%20Editor%20Testimonial%20For%20Josh.mp4#t=0.5",
  },
  {
    name: "Spencer",
    role: "Chief Operating Officer (COO)",
    company: "Viasox",
    src: "https://testimony-videos-josh.s3.us-east-2.amazonaws.com/Spencer%20-%20Email%20Marketing%20-%20eCommerce%20CCO%20Testimonial%20For%20Josh.mp4#t=0.5",
  },
  {
    name: "Suki",
    role: "Creator Growth Strategist",
    company: "TikTok",
    src: "https://testimony-videos-josh.s3.us-east-2.amazonaws.com/Suki%20Testimonial.mp4#t=1",
  },
  {
    name: "Shabnam",
    role: "SEO Strategist",
    company: "Viasox",
    src: "https://testimony-videos-josh.s3.us-east-2.amazonaws.com/Shabnu%20-%20Email%20Marketing%20-%20%20SEO%20Strategist%20Testimonial%20For%20Josh.mp4#t=0.5",
  },
  {
    name: "Tonya A.",
    role: "Payroll Specialist",
    company: "Viasox",
    src: "https://testimony-videos-josh.s3.us-east-2.amazonaws.com/Tania%20-%20Email%20Marketing%20-%20Senior%20Accountant%20Testimonial%20For%20Josh.mp4#t=0.5",
  },
  {
    name: "Wes H.",
    role: "Managing Director",
    company: "Rez Media",
    src: "https://testimony-videos-josh.s3.us-east-2.amazonaws.com/Wes%20-%20Email%20Marketing%20-%20Production%20Manager%20Testimonial%20For%20Josh.mp4#t=0.5",
  },
  {
    name: "Carina M.",
    role: "Email Marketing Specialist",
    company: "Rainfactory",
    src: "https://testimony-videos-josh.s3.us-east-2.amazonaws.com/Carina.mp4#t=3",
  },
];

// Triple the array for infinite scroll with no visible end
const allVideos = [...videoTestimonials, ...videoTestimonials, ...videoTestimonials];

export default function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);

  // Reset scroll position seamlessly when reaching end for infinite feel
  const handleScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const scrollWidth = track.scrollWidth;
    const clientWidth = track.parentElement?.clientWidth || 0;
    const maxScroll = scrollWidth - clientWidth;
    const currentScroll = track.parentElement?.scrollLeft || 0;

    // If near end, jump back to 1/3 position seamlessly
    if (currentScroll > maxScroll * 0.85) {
      track.parentElement!.scrollLeft = currentScroll - (scrollWidth / 3);
    }
    // If scrolled to start, jump forward
    if (currentScroll < 10) {
      track.parentElement!.scrollLeft = currentScroll + (scrollWidth / 3);
    }
  }, []);

  useEffect(() => {
    const container = trackRef.current?.parentElement;
    if (!container) return;
    container.addEventListener("scroll", handleScroll);
    // Start at 1/3 to allow scrolling in both directions
    setTimeout(() => {
      if (container && trackRef.current) {
        container.scrollLeft = trackRef.current.scrollWidth / 3;
      }
    }, 100);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <section className="testimonials-section" id="testimonials" style={{ padding: '2rem 0' }}>
      <div className="video-scroll-container">
        <div className="video-scroll-track" ref={trackRef}>
          {allVideos.map((vt, i) => (
            <div key={i} className="video-testimonial-card-v2">
              <div className="video-testimonial-player">
                <video
                  controls
                  preload="metadata"
                  playsInline
                >
                  <source src={vt.src} type="video/mp4" />
                </video>
              </div>
              <div className="video-testimonial-info">
                <h4>{vt.name}</h4>
                <p>{vt.role} @ {vt.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
