import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDown } from "lucide-react";
import Container from "./ui/Container";
import Button from "./ui/Button";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=2000&q=80";

const SIDE_IMAGE =
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=80";

const word = {
  hidden: { y: "110%" },
  show: { y: "0%" },
};

function HeroTitle() {
  const lines = [
    ["We", "manufacture"],
    ["what", "brands"],
    ["dream."],
  ];
  return (
    <h1 className="font-display text-[14vw] leading-[0.92] tracking-[-0.04em] text-bone-50 md:text-[clamp(3.5rem,8vw,9rem)]">
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.span
            className="inline-block"
            initial="hidden"
            animate="show"
            transition={{
              duration: 0.9,
              delay: 0.15 + i * 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
            variants={word}
          >
            {line.join(" ")}
            {i === 2 && (
              <motion.span
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.1, duration: 0.6 }}
                className="mt-2 ml-0 block w-fit rounded-full bg-accent-lime px-4 py-2 font-sans text-xs font-medium tracking-[0.2em] uppercase text-ink-950 md:mt-0 md:ml-6 md:inline-block md:align-middle md:text-sm"
              >
                Est. 2011
              </motion.span>
            )}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const scaleBg = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const opacityOverlay = useTransform(scrollYProgress, [0, 0.8], [0.55, 0.9]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative isolate grain min-h-[100svh] w-full overflow-hidden bg-ink-950 pt-28 md:pt-32"
    >
      <motion.div
        style={{ y: yBg, scale: scaleBg }}
        className="absolute inset-0 -z-10"
      >
        <img
          src={HERO_IMAGE}
          alt="Fashion model in modern streetwear"
          className="h-full w-full object-cover object-[center_30%] md:object-[center_20%]"
          loading="eager"
        />
      </motion.div>

      <motion.div
        style={{ opacity: opacityOverlay }}
        className="absolute inset-0 -z-10 bg-gradient-to-b from-ink-950/60 via-ink-950/55 to-ink-950"
      />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(214,255,61,0.12),transparent_55%)]" />

      <Container className="relative z-10 flex flex-col justify-between gap-16 pb-16 md:gap-24 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7 }}
          className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] leading-relaxed font-medium uppercase tracking-[0.22em] text-bone-200 md:text-xs md:tracking-[0.3em]"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent-lime" />
          Apparel manufacturing · Since 2011 · Tiruppur · Global
        </motion.div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <HeroTitle />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.7 }}
            className="lg:col-span-4"
          >
            <p className="max-w-md text-base text-bone-200 md:text-lg">
              A full-stack clothing factory for independent brands,
              Gen&nbsp;Z startups and heritage labels. Design, sampling,
              cut-&-sew, finishing and delivery — under one roof.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button href="#contact" variant="primary">
                Start your brand
              </Button>
              <Button href="#services" variant="ghost">
                Explore services
              </Button>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.7 }}
          className="flex flex-col items-start justify-between gap-8 border-t border-bone-300/15 pt-8 md:flex-row md:items-end"
        >
          <div className="flex items-center gap-4">
            <div className="relative h-20 w-16 overflow-hidden rounded-lg md:h-24 md:w-20">
              <img
                src={SIDE_IMAGE}
                alt="Production floor detail"
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <div className="font-display text-xl text-bone-50 md:text-2xl">
                120+ brands
              </div>
              <div className="text-xs uppercase tracking-[0.2em] text-bone-300">
                launched with us
              </div>
            </div>
          </div>

          <motion.a
            href="#services"
            whileHover={{ y: 4 }}
            className="group inline-flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-bone-200"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-bone-300/30 transition-colors group-hover:border-accent-lime group-hover:text-accent-lime">
              <ArrowDown className="h-4 w-4" />
            </span>
            Scroll to explore
          </motion.a>
        </motion.div>
      </Container>
    </section>
  );
}
