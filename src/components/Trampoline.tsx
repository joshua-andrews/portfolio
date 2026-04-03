"use client";

export default function Trampoline() {
  return (
    <section className="trampoline-section" id="trampoline">
      <div className="container">
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
          <p className="trampoline-desc-desktop">
            I pair buyer psychology with advanced email marketing strategies to turn<br />your customers into raving fans. I also randomly have an engineering degree.
          </p>
          <p className="trampoline-desc-mobile">
            I pair buyer psychology with advanced email marketing strategies to turn<br />your customers into raving fans.
          </p>
        </div>
      </div>
    </section>
  );
}
