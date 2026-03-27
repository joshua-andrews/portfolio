const skills = [
  {
    label: "Email Deliverability",
    title: "Literally nothing else matters if this isn't perfect 💡",
    description:
      "Google and the big ESPs love email marketers.. so much they even created the promotions tab for us 😳\n\nIf you're not using modern tools & strategies to stay in the inbox, you'll be talking but no one's listening.",
    visual: "deliverability",
    footnote: "What's your highscore?",
  },
  {
    label: "Project Management",
    title: "The Project Management Powerpack 📋",
    description:
      "From Asana boards to cross-functional sprints, I keep every deliverable on track and every stakeholder in the loop. No missed deadlines, no dropped balls.",
    visual: "placeholder",
    placeholderIcon: "📋",
    footnote: null,
  },
  {
    label: "Programming",
    title: "My favorite duo? Python & AWS. 🐍",
    description:
      "Custom scripts, data pipelines, and serverless functions when off-the-shelf tools aren't enough. I write code that makes email marketing smarter and faster.",
    visual: "placeholder",
    placeholderIcon: "⚡",
    footnote: null,
  },
  {
    label: "Automation",
    title: "The Automation Architect 🤖",
    description:
      "From Make.com to Zapier to custom workflows, I build the invisible engines behind every great lifecycle program. If it can be automated, it should be.",
    visual: "placeholder",
    placeholderIcon: "🔧",
    footnote: null,
  },
];

export default function SkillCards() {
  return (
    <section className="skills-section section" id="skills">
      <div className="skills-header">
        <span className="section-label">Core Skills</span>
        <h2 className="section-title">
          Hire someone without these 5 skills,
          <br />
          <span className="text-gradient">
            and you&apos;ll start losing customers you already paid for:
          </span>
        </h2>
      </div>
      <div className="skills-grid">
        {skills.map((skill, index) => (
          <div
            key={skill.label}
            className={`skill-card ${index === 0 ? "full-width" : ""}`}
          >
            <div className="skill-card-content">
              <span className="skill-card-label">{skill.label}</span>
              <h3>{skill.title}</h3>
              {skill.description.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
              {skill.footnote && (
                <p style={{ marginTop: 12, fontStyle: "italic", opacity: 0.7 }}>
                  {skill.footnote}
                </p>
              )}
            </div>
            <div className="skill-card-visual">
              {skill.visual === "placeholder" ? (
                <div className="animation-placeholder">
                  <span className="animation-placeholder-icon">
                    {skill.placeholderIcon}
                  </span>
                </div>
              ) : (
                <div className="animation-placeholder">
                  <span className="animation-placeholder-icon">📧</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
