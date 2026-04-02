const badges = [
  { icon: "🔍", title: "Google Ads Search Certified", subtitle: "Google" },
  { icon: "📧", title: "Klaviyo Product Certified", subtitle: "Klaviyo" },
  { icon: "🎨", title: "Meta Creative Strategy", subtitle: "Meta" },
  { icon: "📊", title: "Meta Media Buying", subtitle: "Meta" },
  { icon: "📦", title: "Amazon Ads Certified", subtitle: "Amazon" },
  { icon: "💬", title: "Klaviyo SMS Certified", subtitle: "Klaviyo" },
];

export default function Badges() {
  return (
    <section className="badges-section" id="badges">
      <div className="badges-header">
        <span className="section-label">Certifications</span>
        <h2 className="section-title">
          Badges & Certifications
        </h2>
      </div>
      <div className="badges-grid">
        {badges.map((badge) => (
          <div key={badge.title} className="badge-card">
            <div className="badge-icon">{badge.icon}</div>
            <h4>{badge.title}</h4>
            <p>{badge.subtitle}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
