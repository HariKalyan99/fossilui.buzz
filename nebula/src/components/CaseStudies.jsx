import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Container from "./ui/Container";
import SectionHeading from "./ui/SectionHeading";
import { fadeUp, staggerContainer, viewportOnce } from "../lib/motion";

const CASES = [
  {
    client: "Helios Labs",
    tag: "SaaS · Fintech",
    title: "A 240% lift in free-trial signups after a full rebuild.",
    metric: "+240%",
    metricLabel: "trial signups",
    gradient:
      "radial-gradient(120% 120% at 10% 10%, #5cf0ff 0%, #4f5bff 35%, #0b0b12 75%)",
    featured: true,
  },
  {
    client: "Parallax",
    tag: "Marketplace",
    title: "Headless commerce build that halved time-to-launch.",
    metric: "2.1x",
    metricLabel: "faster launch",
    gradient:
      "radial-gradient(120% 120% at 80% 20%, #ff6ad1 0%, #8a5cff 45%, #0b0b12 80%)",
  },
  {
    client: "Northwind",
    tag: "B2B · Climate",
    title: "A brand system and site that won $18M in new pipeline.",
    metric: "$18M",
    metricLabel: "net new pipeline",
    gradient:
      "radial-gradient(120% 120% at 70% 80%, #8ff0ff 0%, #3d46e8 50%, #0b0b12 85%)",
  },
  {
    client: "Obsidian",
    tag: "Developer Tools",
    title: "Docs + marketing site rebuilt around a unified system.",
    metric: "99",
    metricLabel: "Lighthouse score",
    gradient:
      "radial-gradient(120% 120% at 30% 70%, #b8c0ff 0%, #2f36bd 45%, #0b0b12 80%)",
  },
  {
    client: "Vertex",
    tag: "AI Infrastructure",
    title: "An enterprise refresh shipped in under four weeks.",
    metric: "27 days",
    metricLabel: "brief to live",
    gradient:
      "radial-gradient(120% 120% at 50% 50%, #14b8e0 0%, #6a77ff 45%, #0b0b12 80%)",
  },
];

function CaseCard({ item, span }) {
  return (
    <motion.a
      href="#"
      variants={fadeUp}
      whileHover="hover"
      initial="rest"
      animate="rest"
      className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-ink-900 p-6 md:p-8 ${span}`}
    >
      <motion.div
        aria-hidden="true"
        variants={{
          rest: { scale: 1, opacity: 0.85 },
          hover: { scale: 1.06, opacity: 1 },
        }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
        style={{ backgroundImage: item.gradient }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/40 to-transparent" />
      <div className="absolute inset-0 bg-noise opacity-[0.35] mix-blend-soft-light" />

      <div className="relative flex items-start justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-white/70">
            {item.tag}
          </div>
          <div className="mt-1 text-[15px] font-medium text-white">
            {item.client}
          </div>
        </div>
        <motion.div
          variants={{
            rest: { x: 0, y: 0, opacity: 0.8 },
            hover: { x: 2, y: -2, opacity: 1 },
          }}
          transition={{ type: "spring", stiffness: 400, damping: 24 }}
          className="grid place-items-center size-10 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm text-white"
        >
          <ArrowUpRight className="size-4" />
        </motion.div>
      </div>

      <div className="relative mt-16 md:mt-24">
        <h3
          className={`font-semibold tracking-tight text-white ${
            item.featured ? "text-2xl md:text-3xl lg:text-[34px] max-w-xl" : "text-xl md:text-2xl"
          }`}
        >
          {item.title}
        </h3>

        <motion.div
          variants={{
            rest: { opacity: 0, y: 12 },
            hover: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 flex items-center gap-3"
        >
          <div className="inline-flex items-baseline gap-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-3 py-1.5">
            <span className="text-base font-semibold text-white">
              {item.metric}
            </span>
            <span className="text-xs text-white/80">{item.metricLabel}</span>
          </div>
          <span className="text-sm text-white/80 inline-flex items-center gap-1">
            Read case study
            <ArrowUpRight className="size-3.5" />
          </span>
        </motion.div>
      </div>
    </motion.a>
  );
}

export default function CaseStudies() {
  return (
    <section id="work" className="relative py-24 md:py-36 border-t border-white/5">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <SectionHeading
            align="left"
            eyebrow="Selected work"
            title="Outcomes our clients can point to."
            description="A small sample of recent launches — each one built to move a specific business metric, not chase trends."
          />
          <a
            href="#"
            className="inline-flex items-center gap-1.5 text-sm text-mist-200 hover:text-white transition-colors"
          >
            View all case studies
            <ArrowUpRight className="size-4" />
          </a>
        </div>

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-[280px] md:auto-rows-[340px]"
        >
          <CaseCard item={CASES[0]} span="md:col-span-2 md:row-span-2" />
          <CaseCard item={CASES[1]} span="" />
          <CaseCard item={CASES[2]} span="" />
          <CaseCard item={CASES[3]} span="" />
          <CaseCard item={CASES[4]} span="md:col-span-2" />
        </motion.div>
      </Container>
    </section>
  );
}
