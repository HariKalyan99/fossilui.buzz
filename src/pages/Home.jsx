import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Code2,
  Layers,
  Star,
  Box,
  Layout,
  Zap,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Section, SectionHeader } from "../components/ui/Section";
import { Button } from "../components/ui/Button";
import { Tag } from "../components/ui/Tag";
import { TemplateCard } from "../components/TemplateCard";
import { GithubIcon } from "../components/icons/Brand";
import { TEMPLATES, CATEGORIES } from "../data/templates";
import { DINO_FACTS } from "../data/dinoFacts";
import { Hero3D } from "../components/Hero3D";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: "8", label: "Production templates" },
  { value: "100%", label: "Unlimited demos" },
  { value: "0", label: "Lock-in" },
  { value: "∞", label: "Reuse" },
];

const FEATURES = [
  {
    icon: Code2,
    title: "Real source, not screenshots",
    desc: "Browse every file with CodeMirror 6. Copy what you need, leave what you don't.",
  },
  {
    icon: Zap,
    title: "Live previews",
    desc: "Open a working deployment for any template in one click — no install required.",
  },
  {
    icon: Layers,
    title: "Composable patterns",
    desc: "Sections and components that hold up across portfolio, SaaS, dashboard and shop.",
  },
  {
    icon: Box,
    title: "Modern stack",
    desc: "React, Vite, Tailwind, Framer Motion, Gsap, Three.js — predictable and easy to extend.",
  },
];

export default function Home() {
  const heroRef = useRef(null);
  const tickerViewportRef = useRef(null);
  const tickerMeasureRef = useRef(null);
  const [randomFact] = useState(
    () => DINO_FACTS[Math.floor(Math.random() * DINO_FACTS.length)],
  );
  const [isBadgeCollapsed, setIsBadgeCollapsed] = useState(false);
  const [tickerWidths, setTickerWidths] = useState({ viewport: 0, content: 0 });
  const shouldMarquee =
    !isBadgeCollapsed && tickerWidths.content > tickerWidths.viewport;
  const measureTicker = () => {
    const viewportWidth = tickerViewportRef.current?.offsetWidth ?? 0;
    const contentWidth = tickerMeasureRef.current?.scrollWidth ?? 0;
    setTickerWidths({ viewport: viewportWidth, content: contentWidth });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray("[data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 88%" },
          },
        );
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    // Delay a frame so motion width animation and layout settle first.
    let raf2 = 0;
    let timeoutId = 0;
    const raf1 = window.requestAnimationFrame(() => {
      raf2 = window.requestAnimationFrame(measureTicker);
    });
    timeoutId = window.setTimeout(measureTicker, 220);

    if (document.fonts?.ready) {
      document.fonts.ready.then(() => measureTicker());
    }

    const observer = new ResizeObserver(() => measureTicker());
    if (tickerViewportRef.current) observer.observe(tickerViewportRef.current);
    if (tickerMeasureRef.current) observer.observe(tickerMeasureRef.current);

    window.addEventListener("resize", measureTicker, { passive: true });
    return () => {
      window.cancelAnimationFrame(raf1);
      window.cancelAnimationFrame(raf2);
      window.clearTimeout(timeoutId);
      observer.disconnect();
      window.removeEventListener("resize", measureTicker);
    };
  }, [randomFact.id, isBadgeCollapsed]);

  const featured = TEMPLATES.slice(0, 6);

  return (
    <div ref={heroRef}>
      <section
        className="relative isolate overflow-hidden min-h-[100vh]"
        data-hero-zone="true"
      >
        <div className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-[0.85]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] bg-gradient-to-b from-white via-white to-transparent" />

        {/* Full hero background model across all breakpoints */}
        <div className="absolute inset-0 -z-10" data-model-zone="true">
          <Hero3D className="h-full w-full" scaleTarget={0.27} />
        </div>
        <div className="pointer-events-none absolute inset-0 -z-[9] bg-gradient-to-b from-white/80 via-white/55 to-white/70" />

        <div className="container-page relative z-10 pt-20 md:pt-28 pb-6 md:pb-8">
          <div className="grid items-center gap-10 md:gap-14">
            <div className="max-w-2xl">
              <div className="flex flex-col items-start gap-2">
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1 text-[12px] text-neutral-600 shadow-[0_1px_2px_rgba(15,23,42,0.04)]"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-[pulse-soft_2s_ease-in-out_infinite]" />
                  v1 — 8 free templates available now
                </motion.div>
              </div>

              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55 }}
                className="mt-6 text-[clamp(2.2rem,5.2vw,4.4rem)] leading-[1.03] font-semibold tracking-[-0.03em] text-neutral-900 text-balance"
              >
                <img
                  src="/Rex.svg"
                  alt=""
                  aria-hidden="true"
                  className="inline-block align-middle h-[0.9em] w-auto mb-1"
                  draggable="false"
                />{" "}
                Fossil UI —{" "}
                <span className="text-neutral-900">
                  UI that never goes extinct
                </span>
                .
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="mt-6 max-w-xl text-[16px] md:text-[17px] leading-[1.6] text-neutral-600"
              >
                Production-ready templates and components with real source code.
                <br />
                Plug, play, and ship fast with React, Tailwind, and modern
                tooling.
                <br />
                Backend dev bonus: focus on logic and DB, not UI setup.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18, duration: 0.5 }}
                className="mt-8 flex flex-wrap items-center gap-3"
              >
                <Button as={Link} to="/templates" variant="primary" size="lg">
                  Browse templates
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button
                  as="a"
                  href="https://github.com/HariKalyan99/fossilui.buzz"
                  target="_blank"
                  rel="noreferrer"
                  variant="secondary"
                  size="lg"
                >
                  <GithubIcon className="h-4 w-4" />
                  Star on GitHub
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.32, duration: 0.5 }}
                className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12.5px] text-neutral-500"
              >
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  MIT licensed
                </span>
                <span className="hidden sm:inline-block h-3 w-px bg-neutral-200" />
                <span>Built with React + Tailwind</span>
                <span className="hidden sm:inline-block h-3 w-px bg-neutral-200" />
                <span>No sign-up required</span>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative -mt-1 md:-mt-2">
        <div className="container-page">
          <div className="card grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-neutral-200">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="flex flex-col items-center justify-center gap-1 py-7 px-4"
                data-reveal
              >
                <span className="text-2xl md:text-3xl font-semibold tracking-tight text-neutral-900">
                  {s.value}
                </span>
                <span className="text-[11px] uppercase tracking-[0.18em] text-neutral-500">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Section>
        <div data-reveal>
          <SectionHeader
            eyebrow="Featured"
            title="Hand-picked templates"
            description={
              <>
                Browse a small set of premium templates, all{" "}
                <span className="rounded bg-emerald-100 px-1.5 py-0.5 font-semibold text-emerald-700">
                  FREE to use
                </span>
                , ready to clone and ship. Open a live demo or explore the
                source instantly.
              </>
            }
          />
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((t, i) => (
            <TemplateCard key={t.slug} template={t} index={i} />
          ))}
        </div>
        <div className="mt-12 flex justify-center" data-reveal>
          <Button as={Link} to="/templates" variant="secondary" size="md">
            See all templates
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </Section>

      <Section className="border-t border-neutral-200 bg-neutral-50/40">
        <div data-reveal>
          <SectionHeader
            eyebrow="Categories"
            title="Find something for every product"
            description="From editorial portfolios to operational dashboards. Pick your starting point and tailor it from there."
          />
        </div>
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {CATEGORIES.filter((c) => c !== "All").map((cat) => {
            const count = TEMPLATES.filter((t) => t.category === cat).length;
            return (
              <Link
                key={cat}
                to={`/templates?category=${encodeURIComponent(cat)}`}
                className="card card-hover p-5 flex flex-col gap-3"
                data-reveal
              >
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-neutral-100 text-neutral-700">
                  <Layout className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-[15px] font-medium text-neutral-900">
                    {cat}
                  </div>
                  <div className="text-[12px] text-neutral-500 mt-0.5">
                    {count} template{count === 1 ? "" : "s"}
                  </div>
                </div>
                <div className="mt-auto inline-flex items-center gap-1 text-[12px] text-indigo-600">
                  Browse <ArrowRight className="h-3 w-3" />
                </div>
              </Link>
            );
          })}
        </div>
      </Section>

      <Section className="border-t border-neutral-200">
        <div data-reveal>
          <SectionHeader
            eyebrow="Why FossilUI"
            title="Designed to be developer-first"
            description="No sign-ups, no paywalls, no inflated marketing. Just clean source code and live previews you can use today."
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <div key={f.title} className="card card-hover p-6" data-reveal>
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-neutral-100 text-neutral-800">
                <f.icon className="h-4 w-4" />
              </span>
              <h3 className="mt-4 text-[15px] font-semibold text-neutral-900 tracking-tight">
                {f.title}
              </h3>
              <p className="mt-1.5 text-[13.5px] text-neutral-600 leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
        <div
          className="mt-6 rounded-xl border border-indigo-100 bg-indigo-50/70 px-5 py-4 text-[13.5px] md:text-[14px] text-indigo-900"
          data-reveal
        >
          Plug-and-play by design: use ready sections, wire your data, and ship
          faster. Backend dev bonus: keep your focus on logic, APIs, and DB
          schemas — your UI setup can stay simple and effective.
        </div>
      </Section>

      <Section className="border-t border-neutral-200">
        <div className="relative card overflow-hidden p-10 md:p-14" data-reveal>
          <div className="pointer-events-none absolute inset-0 bg-grid opacity-50" />
          <div className="relative max-w-2xl">
            <Tag tone="accent">Open source</Tag>
            <h3 className="mt-4 text-3xl md:text-4xl font-semibold tracking-[-0.025em] text-neutral-900">
              Build something developers will love.
            </h3>
            <p className="mt-3 text-neutral-600 max-w-xl">
              Star FossilUI on GitHub to support the project — and grab the
              templates you need without signing up.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button as={Link} to="/templates" variant="primary" size="lg">
                Browse templates
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                as="a"
                href="https://github.com/HariKalyan99/fossilui.buzz"
                target="_blank"
                rel="noreferrer"
                variant="outline"
                size="lg"
              >
                <Star className="h-4 w-4" />
                Star on GitHub
              </Button>
            </div>
          </div>
        </div>
      </Section>

      <motion.button
        type="button"
        key={randomFact.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{
          opacity: 1,
          y: 0,
          width: isBadgeCollapsed ? 56 : "min(92vw, 560px)",
          borderRadius: isBadgeCollapsed ? 9999 : 9999,
        }}
        whileTap={{ scale: 0.985 }}
        onClick={() => setIsBadgeCollapsed((prev) => !prev)}
        onAnimationComplete={measureTicker}
        transition={{
          type: "spring",
          stiffness: 230,
          damping: 24,
          mass: 0.75,
        }}
        aria-expanded={!isBadgeCollapsed}
        aria-label={
          isBadgeCollapsed
            ? "Expand dinosaur fact badge"
            : "Collapse dinosaur fact badge"
        }
        className="fixed bottom-4 left-1/2 z-40 -translate-x-1/2 overflow-hidden rounded-full border border-amber-200/80 bg-amber-50 px-3 py-1 text-[11px] text-amber-900 shadow-[0_10px_25px_rgba(15,23,42,0.12)] backdrop-blur-sm"
      >
        <span
          ref={tickerMeasureRef}
          className="absolute pointer-events-none -z-10 whitespace-nowrap opacity-0"
        >
          <span className="font-semibold">Did you know?</span> {randomFact.fact}
        </span>
        <motion.div
          animate={{
            opacity: isBadgeCollapsed ? 0 : 1,
            y: isBadgeCollapsed ? 6 : 0,
          }}
          transition={{ duration: 0.22 }}
          className={
            isBadgeCollapsed ? "pointer-events-none absolute inset-0" : ""
          }
        >
          <div
            ref={tickerViewportRef}
            className="overflow-hidden whitespace-nowrap text-left"
          >
            {shouldMarquee ? (
              <motion.div
                key={`marquee-${randomFact.id}-${tickerWidths.content}-${tickerWidths.viewport}`}
                className="inline-flex items-center whitespace-nowrap"
                animate={{ x: [0, -(tickerWidths.content + 32)] }}
                transition={{
                  duration: Math.max(8, (tickerWidths.content + 32) / 32),
                  ease: "linear",
                  repeat: Infinity,
                }}
              >
                <span className="shrink-0 pr-8">
                  <span className="font-semibold">Did you know?</span>{" "}
                  {randomFact.fact}
                </span>
                <span className="shrink-0 pr-8" aria-hidden="true">
                  <span className="font-semibold">Did you know?</span>{" "}
                  {randomFact.fact}
                </span>
              </motion.div>
            ) : (
              <span>
                <span className="font-semibold">Did you know?</span>{" "}
                {randomFact.fact}
              </span>
            )}
          </div>
        </motion.div>

        {isBadgeCollapsed && (
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="inline-flex items-center justify-center whitespace-nowrap py-0.5"
          >
            <img
              src="/Rex.svg"
              alt=""
              aria-hidden="true"
              draggable="false"
              className="h-5 w-auto"
            />
          </motion.span>
        )}
      </motion.button>
    </div>
  );
}
