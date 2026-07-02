import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/home/TrustBar";
import { CategoryShowcase } from "@/components/home/CategoryShowcase";
import { FeaturedParts } from "@/components/home/FeaturedParts";

export function HomePage() {
  return (
    <main>
      <Hero />
      <TrustBar />
      <CategoryShowcase />
      <FeaturedParts />
    </main>
  );
}
