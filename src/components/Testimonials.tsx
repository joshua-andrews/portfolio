const textTestimonials = [
  {
    quote:
      "Josh skyrocketed our email revenue from 19% to 34%, making us $2.7M in just 3 months!",
    name: "Anette A.",
    role: "Rainfactory",
    initials: "AA",
  },
  {
    quote:
      "Josh is a WIZARD at Klaviyo email marketing. His strategic genius is matched by his stunning graphic designs & sophisticated use of AI for razor-sharp segmentation.",
    name: "Kaitlyn W.",
    role: "Rainfactory",
    initials: "KW",
  },
  {
    quote:
      "His thorough analysis and process adjustments are exemplary. The video addition explaining the rationale provided clear knowledge transfer. Great job, Josh! 🎉 🍾",
    name: "Michael T.",
    role: "3 Brothers Decking",
    initials: "MT",
  },
  {
    quote:
      "He's hands down the best email marketer I've ever worked with. Josh doesn't just check the boxes. He elevates the entire process, and it shows in the results.",
    name: "Laura M.",
    role: "Publishing Life Services",
    initials: "LM",
  },
  {
    quote:
      "He continually worked to develop creative solutions that would save the company money. If you're looking for someone with a never-ending passion for problem solving, Josh is your guy.",
    name: "Isaac B.",
    role: "Stile dè Amor Galleria",
    initials: "IB",
  },
  {
    quote:
      "We are so happy to have you! The CFO and I just called, and both of us agreed that you are one of the best writers we have! So lucky 🍀",
    name: "Team Lead",
    role: "Client",
    initials: "TL",
  },
  {
    quote:
      "Josh is a Klaviyo MASTER — generated ~$1000 in 3 days for our start up, 65%+ open rates, 7%+ click rates. Working with him transformed our email marketing from zero to hero.",
    name: "Startup Founder",
    role: "Client",
    initials: "SF",
  },
];

const videoTestimonials = [
  { name: "Suki H.", role: "Rainfactory", initials: "SH" },
  { name: "Carina M.", role: "Rainfactory", initials: "CM" },
  { name: "Adam H.", role: "Viasox", initials: "AH" },
  { name: "Fahad Z.", role: "Viasox", initials: "FZ" },
];

export default function Testimonials() {
  return (
    <section className="testimonials-section section" id="testimonials">
      <div className="testimonials-header">
        <span className="section-label">Testimonials</span>
        <h2 className="section-title">
          <span className="text-gradient">Real Results. Real Stories.</span>
        </h2>
        <p className="section-subtitle" style={{ margin: "0 auto" }}>
          Hear and read the impact made directly from team members across
          multiple niches.
        </p>
      </div>

      <div className="testimonials-grid">
        {textTestimonials.map((t, i) => (
          <div key={i} className="testimonial-card">
            <div className="testimonial-stars">
              {[...Array(5)].map((_, j) => (
                <span key={j}>★</span>
              ))}
            </div>
            <p className="testimonial-quote">&ldquo;{t.quote}&rdquo;</p>
            <div className="testimonial-author">
              <div className="testimonial-avatar">{t.initials}</div>
              <div>
                <div className="testimonial-name">{t.name}</div>
                <div className="testimonial-role">{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Video Testimonials */}
      <div style={{ textAlign: "center", marginTop: 60 }}>
        <h3>
          <span className="text-gradient">Video Testimonials</span>
        </h3>
      </div>
      <div className="video-testimonials">
        {videoTestimonials.map((vt, i) => (
          <div key={i} className="video-testimonial-card">
            {/* Replace with actual video files */}
            <div
              className="animation-placeholder"
              style={{
                aspectRatio: "9/16",
                borderRadius: 0,
              }}
            >
              <span className="animation-placeholder-icon">🎬</span>
            </div>
            <div className="video-testimonial-info">
              <h4>{vt.name}</h4>
              <p>{vt.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
