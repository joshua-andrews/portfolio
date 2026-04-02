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
    src: "https://testimony-videos-josh.s3.us-east-2.amazonaws.com/Fahad%20-%20Email%20Marketing%20-%20Senior%20Video%20Editor%20Testimonial%20For%20Josh.mp4",
  },
  {
    name: "Spencer",
    role: "Chief Operating Officer (COO)",
    company: "Viasox",
    src: "https://testimony-videos-josh.s3.us-east-2.amazonaws.com/Spencer%20-%20Email%20Marketing%20-%20eCommerce%20CCO%20Testimonial%20For%20Josh.mp4",
  },
  {
    name: "Suki",
    role: "Project Manager",
    company: "Rainfactory",
    src: "https://testimony-videos-josh.s3.us-east-2.amazonaws.com/Suki%20Testimonial.mp4#t=1",
  },
  {
    name: "Shabnam",
    role: "SEO Strategist",
    company: "Viasox",
    src: "https://testimony-videos-josh.s3.us-east-2.amazonaws.com/Shabnu%20-%20Email%20Marketing%20-%20%20SEO%20Strategist%20Testimonial%20For%20Josh.mp4",
  },
  {
    name: "Tonya A.",
    role: "Payroll Specialist",
    company: "Viasox",
    src: "https://testimony-videos-josh.s3.us-east-2.amazonaws.com/Tania%20-%20Email%20Marketing%20-%20Senior%20Accountant%20Testimonial%20For%20Josh.mp4",
  },
  {
    name: "Wes H.",
    role: "Managing Director",
    company: "Rez Media",
    src: "https://testimony-videos-josh.s3.us-east-2.amazonaws.com/Wes%20-%20Email%20Marketing%20-%20Production%20Manager%20Testimonial%20For%20Josh.mp4",
  },
  {
    name: "Carina M.",
    role: "Email Marketing Specialist",
    company: "Rainfactory",
    src: "https://testimony-videos-josh.s3.us-east-2.amazonaws.com/Carina.mp4#t=3",
  },
];

export default function Testimonials() {
  return (
    <section className="testimonials-section" id="testimonials" style={{ padding: '2rem 0' }}>
      <div className="video-scroll-container">
        <div className="video-scroll-track">
          {[...videoTestimonials, ...videoTestimonials].map((vt, i) => (
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
