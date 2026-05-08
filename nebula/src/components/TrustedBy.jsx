import { motion } from "framer-motion";
import Container from "./ui/Container";
import { fadeUp, staggerContainer, viewportOnce } from "../lib/motion";

/**
 * Logos are rendered as pure SVG wordmarks so we don't pull in third-party
 * brand assets. Each is simple, monochrome and sits at a uniform optical weight.
 */
const LOGOS = [
  { name: "Lumen", render: LumenMark },
  { name: "Helios", render: HeliosMark },
  { name: "Quanta", render: QuantaMark },
  { name: "Northwind", render: NorthwindMark },
  { name: "Parallax", render: ParallaxMark },
  { name: "Obsidian", render: ObsidianMark },
  { name: "Vertex", render: VertexMark },
  { name: "Monolith", render: MonolithMark },
];

export default function TrustedBy() {
  const loop = [...LOGOS, ...LOGOS];

  return (
    <section className="relative py-20 md:py-24 border-y border-white/5 bg-ink-950">
      <Container>
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="flex flex-col items-center gap-2"
        >
          <motion.p
            variants={fadeUp}
            className="text-xs md:text-sm uppercase tracking-[0.22em] text-mist-400"
          >
            Trusted by teams at
          </motion.p>
        </motion.div>

        <div className="relative mt-10 overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 z-10 bg-gradient-to-r from-ink-950 to-transparent" />
          <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 z-10 bg-gradient-to-l from-ink-950 to-transparent" />

          <div className="flex animate-marquee gap-14 md:gap-20 w-max">
            {loop.map((logo, i) => {
              const Mark = logo.render;
              return (
                <div
                  key={`${logo.name}-${i}`}
                  className="shrink-0 text-mist-300 hover:text-white transition-colors duration-300"
                >
                  <Mark className="h-7 md:h-8 w-auto" />
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------- Wordmarks ------------------------------- */

function LumenMark({ className }) {
  return (
    <svg viewBox="0 0 140 32" fill="none" className={className} aria-label="Lumen">
      <circle cx="14" cy="16" r="9" stroke="currentColor" strokeWidth="2.2" />
      <circle cx="14" cy="16" r="3" fill="currentColor" />
      <text x="32" y="22" fontFamily="Inter" fontSize="18" fontWeight="600" fill="currentColor" letterSpacing="-0.5">
        Lumen
      </text>
    </svg>
  );
}

function HeliosMark({ className }) {
  return (
    <svg viewBox="0 0 150 32" fill="none" className={className} aria-label="Helios">
      <g stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
        <circle cx="14" cy="16" r="5" fill="currentColor" stroke="none" />
        <path d="M14 3v4M14 25v4M3 16h4M21 16h4M6 8l3 3M19 21l3 3M6 24l3-3M19 11l3-3" />
      </g>
      <text x="32" y="22" fontFamily="Inter" fontSize="18" fontWeight="600" fill="currentColor" letterSpacing="-0.5">
        Helios
      </text>
    </svg>
  );
}

function QuantaMark({ className }) {
  return (
    <svg viewBox="0 0 150 32" fill="none" className={className} aria-label="Quanta">
      <rect x="4" y="6" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2.2" />
      <path d="M19 21l6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <text x="34" y="22" fontFamily="Inter" fontSize="18" fontWeight="600" fill="currentColor" letterSpacing="-0.5">
        Quanta
      </text>
    </svg>
  );
}

function NorthwindMark({ className }) {
  return (
    <svg viewBox="0 0 170 32" fill="none" className={className} aria-label="Northwind">
      <path d="M5 26V6l14 20V6" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" fill="none" />
      <text x="28" y="22" fontFamily="Inter" fontSize="18" fontWeight="600" fill="currentColor" letterSpacing="-0.5">
        Northwind
      </text>
    </svg>
  );
}

function ParallaxMark({ className }) {
  return (
    <svg viewBox="0 0 160 32" fill="none" className={className} aria-label="Parallax">
      <g stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
        <path d="M5 22c4-10 10-10 14 0" fill="none" />
        <path d="M9 22c3-6 7-6 10 0" fill="none" />
      </g>
      <text x="28" y="22" fontFamily="Inter" fontSize="18" fontWeight="600" fill="currentColor" letterSpacing="-0.5">
        Parallax
      </text>
    </svg>
  );
}

function ObsidianMark({ className }) {
  return (
    <svg viewBox="0 0 160 32" fill="none" className={className} aria-label="Obsidian">
      <path d="M14 4l9 8-9 16-9-16 9-8z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" fill="none" />
      <path d="M14 4v24M5 12h18" stroke="currentColor" strokeWidth="1.6" opacity="0.8" />
      <text x="30" y="22" fontFamily="Inter" fontSize="18" fontWeight="600" fill="currentColor" letterSpacing="-0.5">
        Obsidian
      </text>
    </svg>
  );
}

function VertexMark({ className }) {
  return (
    <svg viewBox="0 0 140 32" fill="none" className={className} aria-label="Vertex">
      <path d="M4 6l10 20L24 6" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" fill="none" />
      <text x="28" y="22" fontFamily="Inter" fontSize="18" fontWeight="600" fill="currentColor" letterSpacing="-0.5">
        Vertex
      </text>
    </svg>
  );
}

function MonolithMark({ className }) {
  return (
    <svg viewBox="0 0 160 32" fill="none" className={className} aria-label="Monolith">
      <rect x="6" y="4" width="14" height="24" rx="2" stroke="currentColor" strokeWidth="2.2" fill="none" />
      <rect x="10" y="8" width="6" height="4" fill="currentColor" opacity="0.8" />
      <text x="28" y="22" fontFamily="Inter" fontSize="18" fontWeight="600" fill="currentColor" letterSpacing="-0.5">
        Monolith
      </text>
    </svg>
  );
}
