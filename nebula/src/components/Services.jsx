import { motion } from "framer-motion";
import {
  Palette,
  Code2,
  LineChart,
  Rocket,
  Wand2,
  Gauge,
  ArrowUpRight,
} from "lucide-react";
import Container from "./ui/Container";
import SectionHeading from "./ui/SectionHeading";
import { fadeUp, staggerContainer, viewportOnce } from "../lib/motion";

const SERVICES = [
  {
    icon: Palette,
    title: "Brand & Identity",
    description:
      "Distinctive visual systems — logos, type, color and motion — built to flex across every surface.",
  },
  {
    icon: Wand2,
    title: "Product Design",
    description:
      "End-to-end UX/UI for web apps, dashboards and marketing sites — with design systems that scale.",
  },
  {
    icon: Code2,
    title: "Engineering",
    description:
      "Pixel-faithful Next.js builds with TypeScript, edge rendering and a CMS your team will actually use.",
  },
  {
    icon: Gauge,
    title: "Performance & SEO",
    description:
      "Core Web Vitals in the green, structured data, and content architecture that ranks and converts.",
  },
  {
    icon: LineChart,
    title: "Growth & CRO",
    description:
      "Analytics, experimentation and iterative redesigns focused on measurable revenue outcomes.",
  },
  {
    icon: Rocket,
    title: "Launch & Scale",
    description:
      "Ongoing partnership post-launch — sprints, audits and roadmap support so the site keeps compounding.",
  },
];

function ServiceCard({ icon: Icon, title, description }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="group relative flex flex-col rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-7 overflow-hidden"
    >
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(400px circle at var(--x,50%) var(--y,0%), rgba(138,92,255,0.18), transparent 60%)",
        }}
      />
      <div className="relative">
        <div className="inline-grid place-items-center size-11 rounded-xl border border-white/10 bg-white/[0.04] text-brand-200 group-hover:text-white group-hover:border-brand-400/50 transition-colors">
          <Icon className="size-5" />
        </div>

        <h3 className="mt-6 text-lg font-semibold tracking-tight text-white">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-mist-300">
          {description}
        </p>

        <div className="mt-6 flex items-center gap-1.5 text-sm text-mist-300 group-hover:text-white transition-colors">
          Learn more
          <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="services" className="relative py-24 md:py-36">
      <Container>
        <SectionHeading
          eyebrow="Services"
          title="A full-stack studio for modern web teams."
          description="From strategy to ship, we combine design craft, engineering rigor and growth thinking under one roof."
        />

        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {SERVICES.map((svc) => (
            <ServiceCard key={svc.title} {...svc} />
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
