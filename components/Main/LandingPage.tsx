import { FeatureSection } from "@/components/LandingPagecomponents/FeatureSection";
import { Hero } from "@/components/LandingPagecomponents/Hero";
import { ImageSection } from "@/components/LandingPagecomponents/Image";
import Navbar from "@/components/LandingPagecomponents/Navbar";
export default function LandingPage() {
  return (
    <div className="flex flex-col justify-center items-center overflow-x-hidden">
      
      <div className="relative">
        <Navbar/>
        <div className="absolute inset-y-0 left-0 w-[2px] bg-gradient-to-b from-transparent via-neutral-400 to-transparent"></div>
        <div className="absolute inset-y-0 right-0 w-[2px] bg-gradient-to-b from-transparent via-neutral-400 to-transparent"></div>

        <Hero />

        <div className="w-full h-px bg-gradient-to-r from-transparent via-neutral-500/50 to-transparent"></div>

        <ImageSection />

        <div className="w-full h-px bg-gradient-to-r from-transparent via-neutral-500/50 to-transparent"></div>

        <FeatureSection />

        <div className="w-full h-px bg-gradient-to-r from-transparent via-neutral-500/50 to-transparent"></div>
      </div>

    </div>
  );
}
