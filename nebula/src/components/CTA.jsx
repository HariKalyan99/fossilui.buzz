import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import Container from "./ui/Container";
import Button from "./ui/Button";
import { fadeUp, staggerContainer, viewportOnce } from "../lib/motion";

export default function CTA() {
  return (
    <section id="contact" className="relative py-24 md:py-36">
      <Container>
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="relative overflow-hidden rounded-[32px] border border-white/10 bg-ink-900 px-8 py-16 md:p-20 text-center"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(60% 80% at 50% 0%, rgba(138,92,255,0.35), transparent 70%), radial-gradient(40% 80% at 50% 100%, rgba(92,240,255,0.18), transparent 70%)",
            }}
          />
          <div className="absolute inset-0 bg-noise opacity-[0.35] mix-blend-soft-light" />

          <div className="absolute inset-0 grid place-items-center opacity-60">
            <div
              aria-hidden="true"
              className="size-[520px] rounded-full border border-white/10"
            />
          </div>
          <div className="absolute inset-0 grid place-items-center opacity-40">
            <div
              aria-hidden="true"
              className="size-[720px] rounded-full border border-white/5"
            />
          </div>

          <motion.div variants={fadeUp} className="relative inline-flex">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs text-mist-100 backdrop-blur-sm">
              <Sparkles className="size-3 text-brand-200" />
              Accepting 3 projects for Q2
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="relative mt-6 text-4xl md:text-6xl lg:text-[64px] font-semibold tracking-[-0.035em] leading-[1.02] text-white"
          >
            Ready to build something
            <br />
            <span className="text-gradient-brand">worth looking at?</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="relative mx-auto mt-6 max-w-xl text-base md:text-lg text-mist-200"
          >
            Tell us about your product and goals. We&rsquo;ll come back within
            one working day with a shortlist of ideas and a realistic timeline.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="relative mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Button variant="solid" size="lg" as="a" href="#contact">
              Start a project
              <ArrowUpRight className="size-4" />
            </Button>
            <Button variant="outline" size="lg" as="a" href="#work">
              View recent work
            </Button>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="relative mt-8 text-sm text-mist-400"
          >
            hello@nebula.studio · Remote-first, worldwide
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
