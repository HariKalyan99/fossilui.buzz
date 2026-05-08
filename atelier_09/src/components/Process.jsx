import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Container from "./ui/Container";
import SectionLabel from "./ui/SectionLabel";
import Reveal from "./ui/Reveal";
import { PROCESS_STEPS } from "../data/content";

function Step({ step, i }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 40%"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.25, 1, 1]);
  const x = useTransform(scrollYProgress, [0, 0.5], [18, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, x }}
      className="relative grid grid-cols-12 gap-6 border-t border-bone-300/10 py-10 md:py-14"
    >
      <div className="col-span-12 flex items-center gap-4 md:col-span-3">
        <span className="font-display text-3xl text-accent-lime md:text-4xl">
          {step.step}
        </span>
        <span className="h-px flex-1 bg-bone-300/20 md:hidden" />
      </div>
      <h3 className="col-span-12 font-display text-4xl tracking-tight text-bone-50 md:col-span-4 md:text-6xl">
        {step.title}
      </h3>
      <p className="col-span-12 max-w-xl text-base text-bone-300 md:col-span-5 md:text-lg">
        {step.description}
      </p>

      {i === PROCESS_STEPS.length - 1 && (
        <div className="col-span-12 border-t border-bone-300/10 pt-0" />
      )}
    </motion.div>
  );
}

export default function Process() {
  return (
    <section id="process" className="relative overflow-x-clip bg-ink-950 py-24 md:py-36">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-12">
          <div className="max-w-2xl">
            <SectionLabel>How it works</SectionLabel>
            <Reveal delay={0.1}>
              <h2 className="mt-6 font-display text-5xl leading-[0.95] tracking-tight text-bone-50 md:text-7xl">
                Idea to shelf, <br />
                <span className="italic">in five steps.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2} className="max-w-md">
            <p className="text-base text-bone-300 md:text-lg">
              No black box. Transparent milestones, weekly updates and a single
              project lead who actually picks up the phone.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 overflow-x-clip md:mt-20">
          {PROCESS_STEPS.map((step, i) => (
            <Step key={step.step} step={step} i={i} />
          ))}
          <div className="border-t border-bone-300/10" />
        </div>
      </Container>
    </section>
  );
}
