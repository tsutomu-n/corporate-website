import Hero from "@/components/sections/Hero";
import CompanyStrengths from "@/components/sections/CompanyStrengths";
import ProjectShowcase from "@/components/sections/ProjectShowcase";
import RegionalContribution from "@/components/sections/RegionalContribution";
import { FadeIn } from "@/components/ui/fade-in";

export default function Home() {
  return (
    <div>
      <Hero />
      <FadeIn>
        <ProjectShowcase />
        <RegionalContribution />
        <CompanyStrengths />
      </FadeIn>
    </div>
  );
}