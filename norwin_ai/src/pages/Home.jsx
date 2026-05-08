import PageTransition from '../components/layout/PageTransition';
import Hero from '../components/sections/Hero';
import LogoCloud from '../components/sections/LogoCloud';
import FeatureGrid from '../components/sections/FeatureGrid';
import HowItWorks from '../components/sections/HowItWorks';
import Testimonials from '../components/sections/Testimonials';
import CTA from '../components/sections/CTA';

export default function Home() {
  return (
    <PageTransition>
      <Hero />
      <LogoCloud />
      <FeatureGrid />
      <HowItWorks />
      <Testimonials />
      <CTA />
    </PageTransition>
  );
}
