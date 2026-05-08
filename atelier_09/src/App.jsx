import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import BrandStrip from "./components/BrandStrip";
import Services from "./components/Services";
import ProductShowcase from "./components/ProductShowcase";
import Process from "./components/Process";
import Factory from "./components/Factory";
import Testimonials from "./components/Testimonials";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="relative min-h-screen bg-ink-950 text-bone-100">
      <Navbar />
      <main>
        <Hero />
        <BrandStrip />
        <Services />
        <ProductShowcase />
        <Process />
        <Factory />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
