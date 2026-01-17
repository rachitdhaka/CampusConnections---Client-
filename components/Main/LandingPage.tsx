import { Container } from "@/components/LandingPagecomponents/Container";
import { FeatureSection } from "@/components/LandingPagecomponents/FeatureSection";
import { Hero } from "@/components/LandingPagecomponents/Hero";
import { NavbarDemo } from "@/components/LandingPagecomponents/Navbar";


export default function LandingPage() {
  return (
    <div>
      <NavbarDemo>
        <Container>
          <Hero />
          <FeatureSection />
          
        </Container>
      </NavbarDemo>
    </div>
  );
}
