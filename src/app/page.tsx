import Hero from "@/components/Hero";
import SocialProof from "@/components/SocialProof";
import SkillCards from "@/components/SkillCards";
import Trampoline from "@/components/Trampoline";
import Badges from "@/components/Badges";
import EmailDesigns from "@/components/EmailDesigns";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <SocialProof />
      <Trampoline />
      <SkillCards />
      <Badges />
      <EmailDesigns />
      <Testimonials />
      <CTA />
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Josh Andrews. All rights reserved.</p>
      </footer>
    </>
  );
}
