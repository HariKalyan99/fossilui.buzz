import { motion } from "framer-motion";
import { Scissors, Tag, Factory, Layers, ArrowUpRight } from "lucide-react";
import Container from "./ui/Container";
import SectionLabel from "./ui/SectionLabel";
import Reveal from "./ui/Reveal";
import { SERVICES } from "../data/content";

const ICONS = {
  custom: Scissors,
  private: Tag,
  bulk: Factory,
  fabric: Layers,
};

function ServiceCard({ service, index }) {
  const Icon = ICONS[service.id];
  return (
    <motion.a
      href="#contact"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        delay: index * 0.08,
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -4 }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-bone-300/10 bg-ink-900 transition-colors hover:border-bone-300/30"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <motion.img
          src={service.image}
          alt={service.title}
          className="h-full w-full object-cover"
          initial={{ scale: 1.05 }}
          whileHover={{ scale: 1.12 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/20 to-transparent" />
        <div className="absolute left-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-bone-50/95 text-ink-950 shadow-lg shadow-ink-950/40">
          <Icon className="h-5 w-5" strokeWidth={1.75} />
        </div>
        <div className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-ink-950/60 text-bone-50 backdrop-blur transition-all duration-300 group-hover:bg-accent-lime group-hover:text-ink-950">
          <ArrowUpRight className="h-5 w-5" strokeWidth={1.75} />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6 md:p-8">
        <h3 className="font-display text-2xl tracking-tight text-bone-50 md:text-3xl">
          {service.title}
        </h3>
        <p className="text-sm leading-relaxed text-bone-300 md:text-base">
          {service.description}
        </p>
        <ul className="mt-auto flex flex-wrap gap-2 pt-2">
          {service.bullets.map((b) => (
            <li
              key={b}
              className="rounded-full border border-bone-300/15 px-3 py-1 text-xs text-bone-200"
            >
              {b}
            </li>
          ))}
        </ul>
      </div>
    </motion.a>
  );
}

export default function Services() {
  return (
    <section id="services" className="relative bg-ink-950 py-24 md:py-36">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-12">
          <div className="max-w-2xl">
            <SectionLabel>What we do</SectionLabel>
            <Reveal delay={0.1}>
              <h2 className="mt-6 font-display text-5xl leading-[0.95] tracking-tight text-bone-50 md:text-7xl">
                End-to-end <br />
                <span className="italic text-accent-lime">apparel production.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2} className="max-w-md">
            <p className="text-base text-bone-300 md:text-lg">
              Four core services — stitched together by the same obsessive
              quality control. Pick what you need, we handle the rest.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:mt-20 md:grid-cols-2 md:gap-8">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
