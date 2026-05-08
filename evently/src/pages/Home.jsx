import Hero from "../components/Hero";
import Categories from "../components/Categories";
import FeaturedCarousel from "../components/FeaturedCarousel";
import TrendingGrid from "../components/TrendingGrid";
import CTABanner from "../components/CTABanner";

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <FeaturedCarousel />
      <TrendingGrid />
      <CTABanner />
    </>
  );
}
