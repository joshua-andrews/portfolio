import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Trampoline from "@/components/Trampoline";
import { SkillCardsTop, SkillCardsBottom } from "@/components/SkillCards";
import Achievements from "@/components/Achievements";
import EmailDesigns from "@/components/EmailDesigns";
import Testimonials from "@/components/Testimonials";
import WrittenTestimonials from "@/components/WrittenTestimonials";
import MidCTA from "@/components/MidCTA";
import CaseStudies from "@/components/CaseStudies";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <div className="section-divider" />
      <Trampoline />
      <section className="five-reasons-headline">
        <h2 className="cx-section-title cx-title-xl">
          Here are Top 5 Reasons Why You Should <s>Fear</s> Consider Me
        </h2>
      </section>

      {/* 1. Email Deliverability + 2. Project Management */}
      <SkillCardsTop />

      {/* 3. Achievements + Badges */}
      <Achievements />

      {/* 4. Klaviyo + 5. Full-Stack AI Development */}
      <SkillCardsBottom />

      {/* And here's 50+ more reasons from other people */}
      <section className="testimonials-headline">
        <h2 className="cx-section-title cx-title-xl">
          And Here&apos;s 50+ More Reasons <span className="text-gradient">From Other People</span>
        </h2>
      </section>
      <Testimonials />
      <WrittenTestimonials />

      {/* Mid-page CTA */}
      <MidCTA />

      {/* Case Studies */}
      <CaseStudies />

      {/* Profit Engine / Email Designs */}
      <EmailDesigns />

      {/* Final CTA */}
      <CTA />
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Josh Andrews. All rights reserved.</p>
      </footer>
    </>
  );
}
