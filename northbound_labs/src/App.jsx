import { ThemeProvider } from "./context/ThemeContext";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { Hero } from "./components/sections/Hero";
import { SocialProof } from "./components/sections/SocialProof";
import { Services } from "./components/sections/Services";
import { Solutions } from "./components/sections/Solutions";
import { Process } from "./components/sections/Process";
import { Portfolio } from "./components/sections/Portfolio";
import { CaseStudies } from "./components/sections/CaseStudies";
import { Testimonials } from "./components/sections/Testimonials";
import { TechStack } from "./components/sections/TechStack";
import { CTA } from "./components/sections/CTA";

export default function App() {
  return (
    <ThemeProvider>
      <a
        href="#top"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-[var(--fg)] focus:px-3 focus:py-2 focus:text-sm focus:text-[var(--bg)]"
      >
        Skip to content
      </a>
      <Navbar />
      <main className="relative">
        <Hero />
        <SocialProof />
        <Services />
        <Solutions />
        <Process />
        <Portfolio />
        <CaseStudies />
        <Testimonials />
        <TechStack />
        <CTA />
      </main>
      <Footer />
    </ThemeProvider>
  );
}
