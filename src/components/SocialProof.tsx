const brands = [
  "Rainfactory",
  "Viasox",
  "ReelView",
  "Native",
  "nerdwax",
  "Alveos",
  "3 Brothers Decking",
  "Habituel",
  "Cooler Master",
  "Publishing Life",
  "Stile de Amor",
];

export default function SocialProof() {
  // Duplicate array for seamless infinite scroll
  const allBrands = [...brands, ...brands];

  return (
    <section className="social-proof">
      <p className="social-proof-text">
        Members of our team have contributed to projects from these companies
      </p>
      <div className="marquee-container">
        <div className="marquee-track">
          {allBrands.map((brand, i) => (
            <span key={`${brand}-${i}`}>
              <span className="marquee-item">{brand}</span>
              {i < allBrands.length - 1 && <span className="marquee-dot" />}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
