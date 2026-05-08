import { motion } from "framer-motion";
import { ArrowUpRight, Play, Sparkles } from "lucide-react";
import Container from "./ui/Container";
import Button from "./ui/Button";
import { EASE, fadeUp, staggerContainer } from "../lib/motion";
import heroImage from "../assets/hero.png";

function AnimatedBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Fine grid masked to the viewport center */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 90% 70% at 50% 35%, black 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 70% at 50% 35%, black 40%, transparent 100%)",
        }}
      />

      {/* Core violet glow — sits behind the hero image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, ease: EASE }}
        className="absolute right-[-8%] lg:right-[2%] top-[18%] h-[620px] w-[820px] rounded-full blur-[130px]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(138,92,255,0.5), rgba(79,91,255,0.12) 55%, transparent 75%)",
        }}
      />

      {/* Secondary drifting cyan orb on the left */}
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, -18, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-[-8%] top-[55%] size-[420px] rounded-full blur-[110px]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(92,240,255,0.25), transparent 70%)",
        }}
      />

      {/* Seam fade into next section */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink-950" />
    </div>
  );
}

function HeroArtwork() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.1, ease: EASE, delay: 0.25 }}
      className="relative mx-auto aspect-square w-full max-w-md lg:max-w-lg"
    >
      {/* Soft violet halo directly behind the artwork */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(138,92,255,0.35), transparent 70%)",
        }}
      />

      {/* Floating on the vertical axis */}
      <motion.img
        src={heroImage}
        alt="Design translated into production — layered card illustration"
        draggable={false}
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="relative h-full w-full select-none object-contain drop-shadow-[0_40px_60px_rgba(79,91,255,0.35)]"
      />

      {/* Floating caption chips around the artwork */}
      <motion.div
        initial={{ opacity: 0, x: -20, y: -10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.9, ease: EASE, delay: 1.2 }}
        className="absolute left-0 top-[18%] hidden sm:flex items-center gap-2 rounded-full border border-white/10 bg-ink-900/70 px-3 py-1.5 text-xs text-mist-100 backdrop-blur-md shadow-[0_10px_30px_-12px_rgba(0,0,0,0.6)]"
      >
        <span className="size-1.5 rounded-full bg-mist-300" />
        Wireframe
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 20, y: 10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.9, ease: EASE, delay: 1.35 }}
        className="absolute right-0 bottom-[18%] hidden sm:flex items-center gap-2 rounded-full border border-brand-400/30 bg-brand-500/[0.12] px-3 py-1.5 text-xs text-brand-100 backdrop-blur-md shadow-[0_10px_30px_-12px_rgba(79,91,255,0.5)]"
      >
        <span className="size-1.5 rounded-full bg-brand-300 shadow-[0_0_10px_2px_rgba(138,92,255,0.8)]" />
        Production build
      </motion.div>
    </motion.div>
  );
}

const METRICS = [
  { value: "120+", label: "Brands shipped" },
  { value: "4.9/5", label: "Avg. client rating" },
  { value: "<14 days", label: "To first launch" },
];

export default function Hero() {
  return (
    <section id="top" className="relative isolate pt-32 md:pt-36 pb-20 md:pb-28">
      <AnimatedBackdrop />

      <Container className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Copy column */}
          <motion.div
            variants={staggerContainer(0.1, 0.1)}
            initial="hidden"
            animate="show"
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            <motion.a
              variants={fadeUp}
              href="#work"
              className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] pl-1.5 pr-4 py-1.5 text-xs md:text-sm text-mist-200 backdrop-blur-sm hover:border-white/20 transition-colors"
            >
              <span className="inline-flex items-center gap-1 rounded-full bg-brand-500/20 px-2 py-0.5 text-[11px] font-medium text-brand-200 border border-brand-400/30">
                <Sparkles className="size-3" />
                New
              </span>
              AI-native workflows for agencies — see the case study
              <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </motion.a>

            <motion.h1
              variants={fadeUp}
              className="mt-7 text-5xl sm:text-6xl md:text-[68px] lg:text-[76px] font-semibold leading-[0.98] tracking-[-0.035em]"
            >
              <span className="text-gradient-brand">From design</span>
              <br />
              <span className="text-white">to </span>
              <span className="italic font-serif font-normal text-white/95">production</span>
              <span className="text-white">,</span>
              <br />
              <span className="text-white">without compromise.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-7 max-w-xl text-base md:text-lg leading-relaxed text-mist-300"
            >
              Nebula is a boutique web studio partnering with ambitious startups and
              enterprise teams to design, build, and scale high-performance digital
              experiences — from first pixel to production.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-9 flex flex-col sm:flex-row items-start sm:items-center gap-3"
            >
              <Button variant="solid" size="lg" as="a" href="#contact">
                Book a strategy call
                <ArrowUpRight className="size-4" />
              </Button>
              <Button variant="outline" size="lg" as="a" href="#work">
                <Play className="size-3.5 fill-current" />
                See our work
              </Button>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-14 md:mt-16 w-full max-w-xl"
            >
              <div className="grid grid-cols-3 gap-0 divide-x divide-white/10 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md">
                {METRICS.map((m) => (
                  <div key={m.label} className="px-4 py-5">
                    <div className="text-xl md:text-2xl font-semibold tracking-tight text-white">
                      {m.value}
                    </div>
                    <div className="mt-1 text-xs md:text-sm text-mist-300">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Artwork column */}
          <div className="lg:col-span-5 order-first lg:order-last">
            <HeroArtwork />
          </div>
        </div>
      </Container>
    </section>
  );
}
