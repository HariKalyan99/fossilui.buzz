import { Link } from "react-router-dom";
import { story } from "../data/content";
import Reveal from "../components/ui/Reveal";

const HERO =
  "https://images.unsplash.com/photo-1568376794508-ae52c6ab3929?auto=format&fit=crop&w=2200&q=85";

const PORTRAITS = [
  "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80",
];

export default function About() {
  return (
    <>
      <section className="relative h-[80vh] min-h-[520px] w-full overflow-hidden bg-ink text-ivory">
        <img
          src={HERO}
          alt="An olive grove at OLEA"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-transparent to-ink/85" />
        <div className="relative z-10 container-x h-full flex flex-col justify-end pb-16 md:pb-20">
          <Reveal>
            <p className="eyebrow text-ivory/70">Our Story</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-5 font-display text-4xl sm:text-5xl md:text-6xl lg:text-[6.5vw] leading-[1] tracking-tight max-w-[18ch] md:max-w-4xl text-balance">
              {story.intro}
            </h1>
          </Reveal>
        </div>
      </section>

      {/* Long-form */}
      <section className="container-x py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
          <div className="md:col-span-3 md:sticky md:top-28 md:self-start">
            <Reveal>
              <p className="divider-num">A note from the founders</p>
            </Reveal>
          </div>
          <div className="md:col-span-9 max-w-3xl space-y-8">
            {story.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <p
                  className={`${
                    i === 0
                      ? "font-display text-3xl md:text-4xl leading-[1.2] tracking-tight text-balance"
                      : "text-lg text-ink/75 text-pretty leading-relaxed"
                  }`}
                >
                  {p}
                </p>
              </Reveal>
            ))}
            <Reveal delay={0.2}>
              <p className="font-display italic text-ink/70 pt-4">
                {story.signature}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Portraits */}
      <section className="container-x">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          {PORTRAITS.map((src, i) => (
            <Reveal key={src} variant="scale" duration={1.2} delay={i * 0.1}>
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={src}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Philosophy */}
      <section className="bg-bone py-24 md:py-32 mt-24 md:mt-32">
        <div className="container-x">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
            <Reveal className="md:col-span-4">
              <p className="divider-num">Our Philosophy</p>
              <h2 className="mt-5 font-display text-4xl md:text-5xl leading-[1] tracking-tight">
                Three small rules,
                <br />
                <em className="font-light italic text-bronze">kept carefully.</em>
              </h2>
            </Reveal>

            <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
              {[
                {
                  n: "01",
                  t: "Slow",
                  d: "We work to one season at a time. The menu is written each morning. The light decides when dinner ends.",
                },
                {
                  n: "02",
                  t: "Local",
                  d: "Most of what we serve we grow, raise, or have known by name for years. The rest, we have learned to wait for.",
                },
                {
                  n: "03",
                  t: "Quiet",
                  d: "Nine suites. Thirty seats. Never larger. The room should always feel like a guest could whisper, and be heard.",
                },
              ].map((p, i) => (
                <Reveal key={p.n} delay={i * 0.07}>
                  <p className="font-display text-bronze text-2xl">{p.n}</p>
                  <h3 className="mt-3 font-display text-2xl md:text-3xl tracking-tight">
                    {p.t}
                  </h3>
                  <p className="mt-4 text-ink/70 text-pretty">{p.d}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Numbers */}
      <section className="container-x py-24 md:py-32">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 md:gap-y-0 gap-8 border-y border-ink/15 py-16">
          {[
            { v: "211", l: "Olive trees" },
            { v: "9", l: "Suites" },
            { v: "30", l: "Seats" },
            { v: "12", l: "Years" },
          ].map((s, i) => (
            <Reveal key={s.l} delay={i * 0.05} className="text-center">
              <p className="font-display text-6xl md:text-7xl tracking-tight text-bronze">
                {s.v}
              </p>
              <p className="mt-3 eyebrow">{s.l}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-x pb-24 md:pb-32 text-center">
        <Reveal>
          <h2 className="font-display text-4xl md:text-6xl leading-[1] tracking-tight">
            Come and stay a while.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/reservations" className="btn-primary">
              Book a Stay
            </Link>
            <Link to="/contact" className="btn-outline">
              Get in Touch
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
