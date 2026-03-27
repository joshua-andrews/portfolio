const designs = [
  {
    tag: "Bespoke Design",
    title: "Custom Brand Email",
    color: "#8B5CF6",
  },
  {
    tag: "Performance-Driven",
    title: "Revenue Focused Email",
    color: "#F97316",
  },
  {
    tag: "Data-Led",
    title: "Segmented Campaign",
    color: "#22C55E",
  },
  {
    tag: "Bespoke Design",
    title: "Welcome Flow Email",
    color: "#8B5CF6",
  },
  {
    tag: "Performance-Driven",
    title: "Win-Back Campaign",
    color: "#F97316",
  },
  {
    tag: "Data-Led",
    title: "Post-Purchase Flow",
    color: "#22C55E",
  },
];

export default function EmailDesigns() {
  return (
    <section className="email-designs-section section" id="designs">
      <div className="email-designs-header">
        <span className="section-label">Portfolio</span>
        <h2 className="section-title">
          <span className="text-gradient">Email Designs That Convert</span>
        </h2>
        <p className="section-subtitle" style={{ margin: "0 auto" }}>
          Hover to scroll emails vertically. Every design is crafted for maximum
          engagement and revenue.
        </p>
      </div>
      <div className="email-designs-grid">
        {designs.map((design, i) => (
          <div key={i} className="email-design-card">
            <div className="email-design-preview">
              {/* Replace with actual email design screenshots */}
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  background: `linear-gradient(135deg, ${design.color}15 0%, ${design.color}08 100%)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "4rem",
                  opacity: 0.4,
                }}
              >
                ✉️
              </div>
            </div>
            <div className="email-design-info">
              <span
                className="email-design-tag"
                style={{
                  background: `${design.color}20`,
                  color: design.color,
                }}
              >
                {design.tag}
              </span>
              <h4>{design.title}</h4>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
