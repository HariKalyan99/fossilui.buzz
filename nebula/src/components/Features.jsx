import { motion } from "framer-motion";
import {
  ShieldCheck,
  Accessibility,
  Zap,
  Blocks,
  Globe2,
  Sparkles,
} from "lucide-react";
import Container from "./ui/Container";
import SectionHeading from "./ui/SectionHeading";
import { fadeUp, staggerContainer, viewportOnce } from "../lib/motion";

const FEATURES = [
  {
    icon: Zap,
    title: "Built for speed",
    description:
      "Edge-rendered Next.js, image optimization and zero-hydration components — consistently in the green on Core Web Vitals.",
  },
  {
    icon: Blocks,
    title: "Design systems that scale",
    description:
      "Shared tokens, component libraries and motion rules that let your team ship new pages without breaking cohesion.",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise-grade quality",
    description:
      "TypeScript, automated tests and Lighthouse gates in CI. Shipped sites stay stable long after handoff.",
  },
  {
    icon: Accessibility,
    title: "Accessible by default",
    description:
      "WCAG 2.2 AA compliant markup, keyboard flows and motion preferences respected across every component.",
  },
  {
    icon: Globe2,
    title: "Global-ready",
    description:
      "Multi-locale architecture, CDN-backed media and compliance-ready cookie tooling for international rollouts.",
  },
  {
    icon: Sparkles,
    title: "AI-augmented workflows",
    description:
      "Copilot-assisted content, programmatic SEO and internal tooling tuned to your workflow — without the gimmicks.",
  },
];

export default function Features() {
  return (
    <section id="features" className="relative py-24 md:py-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-24 h-[420px] blur-3xl opacity-60"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 0%, rgba(106,119,255,0.18), transparent 70%)",
        }}
      />

      <Container className="relative">
        <SectionHeading
          eyebrow="Why teams pick us"
          title="Engineering craft, design taste, measurable outcomes."
          description="The pieces most agencies treat as extras — performance, accessibility, analytics — are the foundation of how we work."
        />

        <motion.div
          variants={staggerContainer(0.06)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px rounded-3xl border border-white/10 overflow-hidden bg-white/5"
        >
          {FEATURES.map(({ icon: Icon, title, description }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              className="group relative bg-ink-950 p-8 md:p-10 flex flex-col gap-4 hover:bg-ink-900/80 transition-colors"
            >
              <div className="inline-grid place-items-center size-11 rounded-xl border border-white/10 bg-white/[0.03] text-brand-200 group-hover:text-white transition-colors">
                <Icon className="size-5" />
              </div>
              <h3 className="text-lg font-semibold tracking-tight text-white">
                {title}
              </h3>
              <p className="text-sm leading-relaxed text-mist-300">
                {description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
