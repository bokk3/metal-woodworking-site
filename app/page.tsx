import { Hero } from "@/components/sections/Hero";
import { Portfolio } from "@/components/sections/Portfolio";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <Portfolio />
    </div>
  );
}
