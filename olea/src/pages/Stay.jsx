import { Link } from "react-router-dom";
import { rooms } from "../data/content";
import Reveal from "../components/ui/Reveal";

const PageHero =
  "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=2000&q=85";

export default function Stay() {
  return (
    <>
      <section className="pt-32 md:pt-40 pb-12 md:pb-20 container-x">
        <Reveal>
          <p className="divider-num">Accommodations</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mt-6 font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight max-w-5xl text-balance">
            Four rooms, each
            <br />
            <em className="font-light italic text-bronze">a small world.</em>
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-8 max-w-5xl">
            <p className="md:col-span-7 md:col-start-6 text-ink/70 text-pretty">
              No two suites at OLEA are alike. Each was shaped around what the
              old farmhouse had to give — a thick stone wall, a chestnut beam, a
              window onto the cypresses — and finished by hand in lime, oak, and
              hand-loomed linen. Every stay includes breakfast, evening
              aperitivo, and use of the orchard pool.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="container-x">
        <Reveal variant="scale" duration={1.2}>
          <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden">
            <img
              src={PageHero}
              alt="The OLEA estate"
              className="h-full w-full object-cover"
            />
          </div>
        </Reveal>
      </section>

      {/* Rooms — alternating editorial */}
      <section className="container-x py-24 md:py-32 space-y-24 md:space-y-40">
        {rooms.map((r, i) => {
          const reverse = i % 2 === 1;
          return (
            <article
              key={r.id}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center"
            >
              <Reveal
                variant="scale"
                duration={1.1}
                className={`lg:col-span-7 ${reverse ? "lg:order-2" : ""}`}
              >
                <div className="relative aspect-[4/3] overflow-hidden group">
                  <img
                    src={r.cover}
                    alt={r.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1600ms] ease-smooth group-hover:scale-[1.05]"
                  />
                </div>
              </Reveal>
              <div className={`lg:col-span-5 ${reverse ? "lg:order-1 lg:pr-8" : "lg:pl-8"}`}>
                <Reveal>
                  <p className="divider-num">
                    {String(i + 1).padStart(2, "0")} — {r.type}
                  </p>
                </Reveal>
                <Reveal delay={0.05}>
                  <h2 className="mt-5 font-display text-4xl md:text-5xl lg:text-6xl leading-[1] tracking-tight">
                    {r.name}
                  </h2>
                </Reveal>
                <Reveal delay={0.1}>
                  <p className="mt-6 text-ink/70 text-pretty max-w-md">
                    {r.short}
                  </p>
                </Reveal>
                <Reveal delay={0.15}>
                  <ul className="mt-8 grid grid-cols-2 gap-y-2 gap-x-6 text-sm">
                    {r.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-center gap-2 text-ink/75"
                      >
                        <span className="block h-px w-3 bg-bronze" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </Reveal>
                <Reveal delay={0.2}>
                  <div className="mt-10 flex items-end justify-between gap-6 border-t border-ink/15 pt-6">
                    <div>
                      <p className="text-[11px] uppercase tracking-widest2 text-muted">
                        From / night
                      </p>
                      <p className="font-display text-3xl mt-1">
                        €{r.price}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[11px] uppercase tracking-widest2 text-muted">
                        Sleeps · Size
                      </p>
                      <p className="text-sm mt-1.5 text-ink/80">
                        {r.sleeps} guests · {r.size}
                      </p>
                    </div>
                  </div>
                </Reveal>
                <Reveal delay={0.25}>
                  <div className="mt-8">
                    <Link to="/reservations" className="btn-primary">
                      Book {r.name}
                    </Link>
                  </div>
                </Reveal>
              </div>
            </article>
          );
        })}
      </section>

      {/* Note / inclusions */}
      <section className="bg-bone py-24 md:py-32">
        <div className="container-x grid grid-cols-1 md:grid-cols-12 gap-10">
          <Reveal className="md:col-span-4">
            <p className="divider-num">Included with every stay</p>
          </Reveal>
          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {[
              {
                t: "Slow breakfast",
                d: "Garden eggs, baked goods from the wood oven, fruit from the orchard, local cheese & cured meats — served from 8 to 11.",
              },
              {
                t: "Evening aperitivo",
                d: "House negroni or chilled vermentino in the courtyard, with snacks from the kitchen, every evening at six.",
              },
              {
                t: "Orchard pool & sauna",
                d: "Saltwater pool surrounded by lavender, plus a small wood-fired Finnish sauna by the fig tree.",
              },
              {
                t: "Personal concierge",
                d: "Tables at neighbouring trattorie, vineyard visits, truffle hunts, vintage Fiat — arranged by Anna, our host.",
              },
            ].map((b, i) => (
              <Reveal key={b.t} delay={i * 0.05}>
                <h3 className="font-display text-2xl tracking-tight">{b.t}</h3>
                <p className="mt-3 text-ink/70 text-pretty">{b.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
