import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import Container from "./ui/Container";
import SectionHeading from "./ui/SectionHeading";
import { fadeUp, staggerContainer, viewportOnce } from "../lib/motion";

const TESTIMONIALS = [
  {
    quote:
      "Nebula rebuilt our marketing site in six weeks and doubled trial signups in the first quarter. The craft is genuinely best-in-class.",
    name: "Amelia Torres",
    role: "VP Marketing, Helios Labs",
    color: "from-brand-400/30 to-accent-400/20",
  },
  {
    quote:
      "The level of taste and engineering rigor is unusual. Our lighthouse scores went from 62 to 99 without sacrificing any motion or polish.",
    name: "David Okonkwo",
    role: "Head of Design, Parallax",
    color: "from-accent-400/30 to-brand-400/20",
  },
  {
    quote:
      "Working with them felt like hiring a senior in-house team overnight. They owned strategy, design and ship — every week compounded.",
    name: "Mei Tanaka",
    role: "CEO, Obsidian",
    color: "from-brand-500/30 to-accent-500/20",
  },
  {
    quote:
      "They cared more about our funnel than we did. Post-launch CRO work paid back the entire engagement inside eight weeks.",
    name: "Julien Moreau",
    role: "Growth Lead, Northwind",
    color: "from-accent-500/30 to-brand-400/20",
  },
  {
    quote:
      "Thoughtful, precise, and genuinely kind to work with. Our sales team still sends the site to every prospect.",
    name: "Priya Varma",
    role: "Founder, Vertex",
    color: "from-brand-400/30 to-accent-400/20",
  },
  {
    quote:
      "They turned a brand refresh into a real competitive advantage. Enterprise deal cycles got noticeably shorter after launch.",
    name: "Samuel Bergmann",
    role: "CMO, Monolith",
    color: "from-accent-400/30 to-brand-500/20",
  },
];

function Stars() {
  return (
    <div className="flex items-center gap-0.5 text-brand-300">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="size-3.5 fill-current" />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="relative py-24 md:py-36 border-t border-white/5">
      <Container>
        <SectionHeading
          eyebrow="Testimonials"
          title="Loved by the teams we partner with."
          description="Long-term relationships built on craft, clarity and outcomes."
        />

        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {TESTIMONIALS.map((t) => (
            <motion.figure
              key={t.name}
              variants={fadeUp}
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 200, damping: 22 }}
              className="relative flex flex-col justify-between rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-7 overflow-hidden"
            >
              <div
                className={`pointer-events-none absolute -top-24 -right-24 size-56 rounded-full blur-3xl opacity-70 bg-gradient-to-br ${t.color}`}
              />

              <div className="relative">
                <div className="flex items-center justify-between">
                  <Quote className="size-6 text-brand-300 rotate-180" />
                  <Stars />
                </div>
                <blockquote className="mt-5 text-[15px] leading-relaxed text-mist-100">
                  “{t.quote}”
                </blockquote>
              </div>

              <figcaption className="relative mt-8 flex items-center gap-3">
                <div className="grid place-items-center size-10 rounded-full bg-gradient-to-br from-brand-400 to-accent-400 text-white text-sm font-semibold">
                  {t.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <div>
                  <div className="text-sm font-medium text-white">{t.name}</div>
                  <div className="text-xs text-mist-400">{t.role}</div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
