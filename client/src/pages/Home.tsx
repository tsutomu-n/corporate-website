import Hero from "@/components/sections/Hero";
import CompanyStrengths from "@/components/sections/CompanyStrengths";
import RecentProjects from "@/components/sections/RecentProjects";
import News from "@/components/sections/News";

export default function Home() {
  return (
    <div>
      <Hero />
      <CompanyStrengths />
      <RecentProjects />
      <News />
    </div>
  );
}
