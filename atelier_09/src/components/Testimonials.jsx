import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import Container from "./ui/Container";
import SectionLabel from "./ui/SectionLabel";
import Reveal from "./ui/Reveal";
import { TESTIMONIALS } from "../data/content";

function TestimonialCard({ t, index }) {
  return (
    <motion.blockquote
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        delay: index * 0.1,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative flex h-full flex-col justify-between gap-8 rounded-3xl border border-bone-300/10 bg-ink-900 p-8 md:p-10"
    >
      <Quote
        className="absolute right-6 top-6 h-10 w-10 text-accent-lime/25"
        strokeWidth={1.5}
      />
      <div>
        <div className="mb-5 flex items-center gap-1 text-accent-lime">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-4 w-4" fill="currentColor" strokeWidth={0} />
          ))}
        </div>
        <p className="font-display text-xl leading-snug tracking-tight text-bone-50 md:text-2xl">
          "{t.quote}"
        </p>
      </div>
      <div className="flex items-center gap-4">
        <img
          src={t.image}
          alt={t.name}
          className="h-12 w-12 rounded-full object-cover grayscale"
        />
        <div>
          <div className="font-medium text-bone-50">{t.name}</div>
          <div className="text-xs uppercase tracking-[0.2em] text-bone-300">
            {t.role}
          </div>
        </div>
      </div>
    </motion.blockquote>
  );
}

export default function Testimonials() {
  return (
    <section className="relative bg-ink-950 py-24 md:py-36">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-12">
          <div className="max-w-2xl">
            <SectionLabel>Voices from our brands</SectionLabel>
            <Reveal delay={0.1}>
              <h2 className="mt-6 font-display text-5xl leading-[0.95] tracking-tight text-bone-50 md:text-7xl">
                Trusted by the <br />
                <span className="italic text-accent-lime">next generation.</span>
              </h2>
            </Reveal>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:mt-20 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={t.name} t={t} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
