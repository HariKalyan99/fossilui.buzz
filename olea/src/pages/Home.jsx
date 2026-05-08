import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { brand, rooms, press, story } from "../data/content";
import Reveal from "../components/ui/Reveal";
import Marquee from "../components/ui/Marquee";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2200&q=85";
// fallback / secondary
const PORTRAIT =
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80";
const FOOD =
  "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1400&q=80";
const LANDSCAPE =
  "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1800&q=85";

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const heroFade = useTransform(scrollYProgress, [0, 1], [1, 0.4]);

  return (
    <>
      {/* HERO */}
      <section
        ref={heroRef}
        className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-ink text-ivory"
      >
        <motion.div
          style={{ y: heroY, scale: heroScale }}
          className="absolute inset-0"
        >
          <img
            src={HERO_IMAGE}
            alt="OLEA hotel exterior at golden hour"
            className="h-full w-full object-cover"
          />
        </motion.div>

        {/* Overlay */}
        <motion.div
          style={{ opacity: heroFade }}
          className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/10 to-ink/85"
        />

        {/* Top meta bar */}
        <div className="relative z-10 container-x pt-28 md:pt-32 flex justify-between items-start text-[11px] uppercase tracking-widest2 text-ivory/70">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="hidden md:flex items-center gap-3"
          >
            <span className="h-px w-8 bg-ivory/40" />
            {brand.location}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="hidden md:block"
          >
            41° 5′ N · 11° 41′ E
          </motion.div>
        </div>

        {/* Hero content */}
        <div className="absolute inset-x-0 bottom-0 z-10 pb-16 md:pb-24">
          <div className="container-x">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.6 }}
              className="eyebrow text-ivory/70"
            >
              Boutique Hotel & Restaurant — Est. 2012
            </motion.p>

            <motion.h1
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: {
                  transition: { staggerChildren: 0.14, delayChildren: 0.7 },
                },
              }}
              className="mt-6 font-display font-light text-[12vw] md:text-[8.5vw] lg:text-[7.4vw] leading-[0.95] tracking-[-0.02em]"
            >
              {["A quiet", "luxury,", "slowly lived."].map((line, i) => (
                <span
                  key={i}
                  className="block overflow-hidden pb-[0.06em]"
                >
                  <motion.span
                    variants={{
                      hidden: { y: "115%" },
                      show: { y: "0%" },
                    }}
                    transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                    className="block"
                  >
                    {i === 2 ? (
                      <>
                        slowly{" "}
                        <em className="italic font-normal text-bronze">
                          lived.
                        </em>
                      </>
                    ) : (
                      line
                    )}
                  </motion.span>
                </span>
              ))}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.5 }}
              className="mt-10 flex flex-col sm:flex-row gap-3"
            >
              <Link
                to="/reservations"
                className="btn bg-ivory text-ink hover:bg-bronze hover:text-ivory"
              >
                Book a Stay
              </Link>
              <Link to="/menu" className="btn-ghost-light">
                Reserve a Table
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Bottom scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-[10px] uppercase tracking-widest2 text-ivory/60"
        >
          <span>Scroll</span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="block h-8 w-px bg-ivory/40"
          />
        </motion.div>
      </section>

      {/* PRESS MARQUEE */}
      <section className="border-y border-ink/10 py-6 md:py-7 bg-ivory">
        <div className="container-x flex items-center gap-6 md:gap-10">
          <p className="hidden sm:block eyebrow shrink-0">As featured in</p>
          <div className="flex-1 min-w-0">
            <Marquee items={press} />
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="container-x py-24 md:py-40">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
          <Reveal className="md:col-span-3">
            <p className="divider-num">01 — Welcome</p>
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-9">
            <h2 className="font-display text-3xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight text-balance">
              Nine suites and a kitchen of thirty seats, set in
              two-hundred-and-eleven olive trees on a{" "}
              <em className="italic font-normal text-bronze">
                quiet hectare of Val d'Orcia.
              </em>
            </h2>
            <p className="mt-8 max-w-2xl text-ink/70 text-pretty">
              {brand.short} We grow most of what we cook, sleep beneath chestnut beams,
              and pour wine from neighbours we have known for years. There is no
              rush here — only the slow movement of light across the day.
            </p>
            <div className="mt-10 flex gap-3">
              <Link to="/about" className="btn-outline">
                Our Story
              </Link>
              <Link to="/stay" className="btn !p-0 link-underline text-ink">
                Discover the Suites →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SPLIT — STAY / DINE */}
      <section className="grid grid-cols-1 lg:grid-cols-2 border-y border-ink/10">
        <Reveal variant="fade" duration={1.1} className="relative aspect-[4/5] lg:aspect-auto lg:h-[88vh] overflow-hidden group bg-ink">
          <img
            src={PORTRAIT}
            alt="A guest suite at OLEA"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1600ms] ease-smooth group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 text-ivory">
            <p className="divider-num text-ivory/60">02 — Stay</p>
            <h3 className="mt-4 font-display text-4xl md:text-6xl leading-[1] tracking-tight">
              Suites for the slow traveller.
            </h3>
            <p className="mt-4 max-w-md text-ivory/75">
              Four room types across the main house and barn, each finished in
              lime-washed plaster, reclaimed oak, and hand-loomed linen.
            </p>
            <Link
              to="/stay"
              className="mt-8 self-start btn-ghost-light"
            >
              View Suites
            </Link>
          </div>
        </Reveal>

        <Reveal variant="fade" duration={1.1} delay={0.1} className="relative aspect-[4/5] lg:aspect-auto lg:h-[88vh] overflow-hidden group bg-ink">
          <img
            src={FOOD}
            alt="A signature dish at OLEA's restaurant"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1600ms] ease-smooth group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 text-ivory">
            <p className="divider-num text-ivory/60">03 — Dine</p>
            <h3 className="mt-4 font-display text-4xl md:text-6xl leading-[1] tracking-tight">
              A menu written each morning.
            </h3>
            <p className="mt-4 max-w-md text-ivory/75">
              Six courses, thirty seats, one nightly seating. What the garden,
              butcher, and sea offered before sunrise.
            </p>
            <Link
              to="/menu"
              className="mt-8 self-start btn-ghost-light"
            >
              See the Menu
            </Link>
          </div>
        </Reveal>
      </section>

      {/* SIGNATURE SUITES */}
      <section className="container-x py-24 md:py-40">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <Reveal>
            <p className="divider-num">04 — Suites</p>
            <h2 className="mt-4 font-display text-4xl md:text-6xl leading-[1.05] tracking-tight max-w-3xl">
              Four ways to disappear, comfortably.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Link to="/stay" className="btn-outline">
              All Accommodations
            </Link>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {rooms.map((r, i) => (
            <Reveal key={r.id} delay={i * 0.08} className="group">
              <Link to="/stay" className="block">
                <div className="relative aspect-[4/5] overflow-hidden bg-ink">
                  <img
                    src={r.image}
                    alt={r.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1400ms] ease-smooth group-hover:scale-[1.06]"
                  />
                  <div className="absolute top-4 left-4 text-[10px] uppercase tracking-widest2 text-ivory/85 bg-ink/40 backdrop-blur-sm px-2.5 py-1">
                    {r.type}
                  </div>
                </div>
                <div className="pt-5 flex items-baseline justify-between">
                  <h3 className="font-display text-2xl tracking-tight">
                    {r.name}
                  </h3>
                  <p className="text-[11px] uppercase tracking-widest2 text-muted">
                    from €{r.price}
                  </p>
                </div>
                <p className="mt-2 text-sm text-ink/65 max-w-xs text-pretty">
                  {r.short}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* STORY TEASER */}
      <section className="bg-ink text-ivory">
        <div className="container-x py-24 md:py-40 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center">
          <Reveal variant="scale" duration={1.2} className="md:col-span-5 relative aspect-[4/5] overflow-hidden">
            <img
              src={LANDSCAPE}
              alt="The Tuscan countryside surrounding OLEA"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </Reveal>
          <div className="md:col-span-7 md:pl-8">
            <Reveal>
              <p className="divider-num text-ivory/60">05 — Story</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 font-display text-4xl md:text-6xl leading-[1.05] tracking-tight">
                {story.intro}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-xl text-ivory/70 text-pretty">
                {story.paragraphs[1]}
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <Link to="/about" className="mt-10 inline-block btn-ghost-light">
                Read the Story
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-x py-24 md:py-40 text-center">
        <Reveal>
          <p className="divider-num">06 — Reservations</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-6 font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight text-balance">
            Stay with us, or
            <br />
            <em className="font-light italic text-bronze">join us for dinner.</em>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-8 max-w-xl mx-auto text-ink/65">
            We answer reservations personally — usually within the hour, always
            within the day.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/reservations" className="btn-primary">
              Book a Stay
            </Link>
            <Link to="/menu" className="btn-outline">
              Reserve a Table
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
