import { Hero } from "@/components/sections/Hero";
import { Portfolio } from "@/components/sections/Portfolio";
import { Services } from "@/components/sections/Services";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <Portfolio />
      <Services />
    </div>
  );
}
