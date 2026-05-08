import { Link } from "react-router-dom";
import { menu } from "../data/content";
import Reveal from "../components/ui/Reveal";

const HERO =
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=2000&q=85";

const SUPPORT_IMAGES = [
  "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1200&q=80",
];

export default function Menu() {
  return (
    <>
      <section className="pt-32 md:pt-40 pb-12 md:pb-16 container-x">
        <Reveal>
          <p className="divider-num">The Restaurant</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mt-6 font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight max-w-5xl text-balance">
            What the morning
            <br />
            <em className="font-light italic text-bronze">brought us today.</em>
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-8 max-w-5xl">
            <p className="md:col-span-7 md:col-start-6 text-ink/70 text-pretty">
              {menu.intro}
            </p>
          </div>
        </Reveal>
      </section>

      <section className="container-x">
        <Reveal variant="scale" duration={1.2}>
          <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden">
            <img
              src={HERO}
              alt="A table set for service at OLEA"
              className="h-full w-full object-cover"
            />
          </div>
        </Reveal>
      </section>

      <section className="container-x py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
          <div className="md:col-span-3 md:sticky md:top-28 md:self-start">
            <Reveal>
              <p className="eyebrow">Tasting Menu</p>
              <p className="mt-3 font-display text-3xl md:text-4xl leading-tight">
                Six courses
                <br />
                <span className="text-bronze">€135</span>
              </p>
              <p className="mt-3 text-sm text-ink/65">
                Wine pairing, +€85.
                <br /> Available Tuesday – Saturday.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-10 hidden md:block">
                <p className="eyebrow">À la carte</p>
                <p className="mt-3 text-sm text-ink/70">
                  Selected dishes from the tasting menu may be ordered
                  individually for lunch service and at the bar.
                </p>
              </div>
            </Reveal>
          </div>

          <div className="md:col-span-9 space-y-20 md:space-y-24">
            {menu.sections.map((section, sIdx) => (
              <div key={section.title}>
                <Reveal>
                  <div className="flex items-baseline gap-6 border-b border-ink/15 pb-5">
                    <span className="font-display text-bronze text-2xl md:text-3xl">
                      {section.number}
                    </span>
                    <h2 className="font-display text-3xl md:text-5xl leading-none tracking-tight">
                      {section.title}
                    </h2>
                  </div>
                </Reveal>
                <ul className="mt-8 divide-y divide-ink/10">
                  {section.items.map((item, i) => (
                    <Reveal key={item.name} delay={i * 0.05}>
                      <li className="flex items-start justify-between gap-6 py-6">
                        <div className="flex-1">
                          <p className="font-display text-xl md:text-2xl tracking-tight">
                            {item.name}
                          </p>
                          <p className="mt-2 text-ink/65 text-pretty max-w-xl">
                            {item.desc}
                          </p>
                        </div>
                        <p className="font-display text-lg md:text-xl text-ink/80 shrink-0">
                          €{item.price}
                        </p>
                      </li>
                    </Reveal>
                  ))}
                </ul>

                {sIdx === 1 && (
                  <Reveal delay={0.1}>
                    <div className="mt-10 grid grid-cols-2 gap-4">
                      {SUPPORT_IMAGES.map((src) => (
                        <div
                          key={src}
                          className="aspect-square overflow-hidden"
                        >
                          <img
                            src={src}
                            alt=""
                            loading="lazy"
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </Reveal>
                )}
              </div>
            ))}

            <Reveal>
              <div className="border-t border-ink/15 pt-8 text-sm text-ink/55 max-w-2xl">
                <p>
                  Please tell us in advance about allergies or dietary
                  preferences. Our menu changes weekly with the harvest. A
                  vegetable tasting and a non-alcoholic pairing are always
                  available.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-ink text-ivory">
        <div className="container-x py-24 md:py-32 text-center">
          <Reveal>
            <p className="divider-num text-ivory/60 mx-auto justify-self-center">
              Reserve a Table
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 font-display text-4xl md:text-6xl leading-[1] tracking-tight">
              One seating, every evening at 19:30.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl mx-auto text-ivory/70">
              We seat thirty guests once a night. Tables are released two months
              ahead, and waitlist requests are answered personally.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <Link to="/reservations" className="mt-10 inline-block btn-ghost-light">
              Reserve a Table
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
