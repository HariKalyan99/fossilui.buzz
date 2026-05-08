import { motion } from "framer-motion";
import Container from "./ui/Container";
import { BRANDS, METRICS } from "../data/content";

export default function BrandStrip() {
  return (
    <section className="relative border-y border-bone-300/10 bg-ink-900">
      <Container className="py-14 md:py-20">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          {METRICS.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-2"
            >
              <div className="font-display text-4xl tracking-tight text-bone-50 md:text-5xl">
                {m.value}
              </div>
              <div className="text-xs uppercase tracking-[0.2em] text-bone-300">
                {m.label}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>

      <div className="relative overflow-hidden border-t border-bone-300/10">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-ink-900 to-transparent md:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-ink-900 to-transparent md:w-32" />
        <div className="marquee-track flex w-max items-center gap-16 whitespace-nowrap py-6 md:gap-24">
          {[...BRANDS, ...BRANDS, ...BRANDS].map((b, i) => (
            <span
              key={i}
              className="font-display text-2xl tracking-tight text-bone-300/80 md:text-3xl"
            >
              {b}
              <span className="ml-16 inline-block h-1.5 w-1.5 rounded-full bg-accent-lime/70 align-middle md:ml-24" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
