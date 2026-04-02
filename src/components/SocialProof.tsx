const brands = [
  { name: "Nerdwax", logo: "https://copyculture.io/Brand%20Logos/Nerdwax.png" },
  { name: "Alveos", logo: "https://copyculture.io/Brand%20Logos/Alveos.png" },
  { name: "3 Brothers Decking", logo: "https://copyculture.io/Brand%20Logos/3%20Brothers%20Decking.png" },
  { name: "Habitual Herbs", logo: "https://copyculture.io/Brand%20Logos/Habitual%20Herbs.png" },
  { name: "Tafari Wraps", logo: "https://copyculture.io/Brand%20Logos/Tafari%20Wraps.png" },
];

export default function SocialProof() {
  return (
    <section className="social-proof">
      <p className="social-proof-text">
        Members of our team have contributed to projects from these companies
      </p>
      <div className="social-proof-logos">
        {brands.map((brand) => (
          <img
            key={brand.name}
            src={brand.logo}
            alt={brand.name}
            loading="lazy"
          />
        ))}
      </div>
    </section>
  );
}
