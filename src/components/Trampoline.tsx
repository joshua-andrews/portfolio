"use client";

export default function Trampoline() {
  return (
    <section className="trampoline-section" id="trampoline">
      <div className="container">
        {/* Desktop: split layout (video left, text right) */}
        <div className="trampoline-split trampoline-desktop-only">
          <div className="trampoline-video-side">
            <div className="trampoline-video">
              <video autoPlay muted loop playsInline>
                <source
                  src="https://framerusercontent.com/assets/RfGCklbRWQjYgp5SN5GSRXcowE.mp4"
                  type="video/mp4"
                />
              </video>
            </div>
          </div>
          <div className="trampoline-text-side">
            <div className="cx-pill" style={{ marginBottom: "1.25rem" }}>HEY, MY NAME&apos;S JOSH</div>
            <h2>
              I like to bounce high<br />and keep your bounce rates low.
            </h2>
            <p className="trampoline-desc-desktop">
              I pair buyer psychology with advanced email marketing strategies to turn<br />your customers into raving fans. I also randomly have an engineering degree.
            </p>
          </div>
        </div>

        {/* Mobile: stacked layout (pill → heading → video → text) */}
        <div className="trampoline-mobile-only">
          <div className="trampoline-intro">
            <div className="cx-pill" style={{ marginBottom: "1.25rem" }}>HEY, MY NAME&apos;S JOSH</div>
            <h2>
              I like to bounce high<br />and keep your bounce rates low.
            </h2>
          </div>
          <div className="trampoline-video-block">
            <div className="trampoline-video">
              <video autoPlay muted loop playsInline>
                <source
                  src="https://framerusercontent.com/assets/RfGCklbRWQjYgp5SN5GSRXcowE.mp4"
                  type="video/mp4"
                />
              </video>
            </div>
          </div>
          <div className="trampoline-desc-block">
            <p className="trampoline-desc-mobile">
              I pair buyer psychology with advanced email marketing strategies to turn<br />your customers into raving fans.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
