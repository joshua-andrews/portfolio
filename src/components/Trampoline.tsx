export default function Trampoline() {
  return (
    <section className="trampoline-section section" id="trampoline">
      <div className="trampoline-content">
        <h2>
          I like to <span className="highlight">bounce high</span>...
        </h2>
        <h2>And keep your bounce rate low.</h2>
        <div className="trampoline-video">
          {/* 
            Placeholder for the trampoline park video.
            Replace src with the actual video file when available.
          */}
          <div
            className="animation-placeholder"
            style={{ height: 350, borderRadius: 0 }}
          >
            <span className="animation-placeholder-icon">🤸</span>
          </div>
        </div>
        <p style={{ maxWidth: 600, margin: "0 auto" }}>
          Email deliverability is the foundation of everything. If your emails
          aren&apos;t landing in the inbox, nothing else matters. I combine
          technical expertise with proven strategies to make sure every send
          counts.
        </p>
      </div>
    </section>
  );
}
