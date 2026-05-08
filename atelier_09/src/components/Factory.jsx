import { motion } from "framer-motion";
import Container from "./ui/Container";
import SectionLabel from "./ui/SectionLabel";
import Reveal from "./ui/Reveal";
import { FACTORY_IMAGES, FACTORY_STATS } from "../data/content";

export default function Factory() {
  return (
    <section id="factory" className="relative bg-bone-50 py-24 text-ink-950 md:py-36">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-12">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-ink-700"
            >
              <span className="h-px w-8 bg-ink-700/50" />
              The factory floor
            </motion.div>
            <Reveal delay={0.1}>
              <h2 className="mt-6 font-display text-5xl leading-[0.95] tracking-tight md:text-7xl">
                Real machines. <br />
                <span className="italic">Real people.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2} className="max-w-md">
            <p className="text-base text-ink-700 md:text-lg">
              We don't outsource the important bits. Cutting, stitching,
              finishing and QA all happen in-house, under our roof, watched
              over by a team that's been doing this for over a decade.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-12 gap-4 md:mt-20 md:gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="col-span-12 overflow-hidden rounded-3xl md:col-span-7"
          >
            <div className="relative aspect-[16/11] w-full overflow-hidden">
              <img
                src={FACTORY_IMAGES[0]}
                alt="Production line workers stitching garments"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </motion.div>

          <div className="col-span-12 grid grid-cols-2 gap-4 md:col-span-5 md:gap-6">
            {FACTORY_IMAGES.slice(1, 4).map((img, i) => (
              <motion.div
                key={img}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  delay: 0.1 + i * 0.08,
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`overflow-hidden rounded-3xl ${
                  i === 2 ? "col-span-2" : ""
                }`}
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden md:aspect-auto md:h-full">
                  <img
                    src={img}
                    alt="Factory detail"
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-6 border-t border-ink-950/10 pt-10 md:mt-20 md:grid-cols-4 md:pt-14">
          {FACTORY_STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
            >
              <div className="font-display text-4xl tracking-tight text-ink-950 md:text-5xl">
                {s.value}
              </div>
              <div className="mt-2 text-xs uppercase tracking-[0.2em] text-ink-700">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
