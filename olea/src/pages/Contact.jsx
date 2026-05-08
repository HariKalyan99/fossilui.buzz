import { contact } from "../data/content";
import Reveal from "../components/ui/Reveal";

export default function Contact() {
  return (
    <>
      <section className="pt-32 md:pt-40 pb-12 md:pb-16 container-x">
        <Reveal>
          <p className="divider-num">Contact</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mt-6 font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight max-w-5xl text-balance">
            We answer every
            <br />
            <em className="font-light italic text-bronze">letter, personally.</em>
          </h1>
        </Reveal>
      </section>

      <section className="container-x pb-16 md:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
          <Reveal className="md:col-span-4">
            <p className="eyebrow">Visit</p>
            <ul className="mt-4 font-display text-2xl md:text-3xl leading-tight tracking-tight text-ink/85">
              {contact.address.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>

            <p className="mt-10 eyebrow">Speak</p>
            <ul className="mt-4 font-display text-2xl tracking-tight text-ink/85 space-y-1">
              <li>
                <a
                  className="link-underline"
                  href={`tel:${contact.phone.replace(/\s/g, "")}`}
                >
                  {contact.phone}
                </a>
              </li>
              <li>
                <a
                  className="link-underline"
                  href={`mailto:${contact.email}`}
                >
                  {contact.email}
                </a>
              </li>
            </ul>
          </Reveal>

          <Reveal className="md:col-span-4" delay={0.05}>
            <p className="eyebrow">Hours</p>
            <ul className="mt-4 divide-y divide-ink/10">
              {contact.hours.map((h) => (
                <li
                  key={h.label}
                  className="py-3 flex items-center justify-between text-sm"
                >
                  <span className="text-ink/65">{h.label}</span>
                  <span className="text-ink/85 font-medium">{h.value}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="md:col-span-4" delay={0.1}>
            <p className="eyebrow">Getting Here</p>
            <p className="mt-4 text-ink/70 text-pretty">
              We are a forty-five-minute drive south of Siena, and ninety
              minutes from Florence airport. A vintage Fiat 500 transfer can be
              arranged from Chiusi station — let us know with your reservation.
            </p>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(
                contact.address.join(", "),
              )}`}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-block btn-outline"
            >
              Open in Maps
            </a>
          </Reveal>
        </div>
      </section>

      {/* Map */}
      <section className="container-x pb-24 md:pb-32">
        <Reveal variant="scale" duration={1.1}>
          <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-bone">
            <iframe
              title="OLEA location"
              src="https://www.google.com/maps?q=Pienza,%20Tuscany,%20Italy&output=embed"
              className="absolute inset-0 h-full w-full grayscale"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>
      </section>

      {/* Newsletter */}
      <section className="bg-ink text-ivory">
        <div className="container-x py-24 md:py-32">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-end">
            <Reveal className="md:col-span-7">
              <p className="divider-num text-ivory/60">Letters from OLEA</p>
              <h2 className="mt-5 font-display text-4xl md:text-5xl lg:text-6xl leading-[1] tracking-tight">
                Four letters a year. Nothing more.
              </h2>
              <p className="mt-6 text-ivory/65 max-w-xl text-pretty">
                Slow news from the kitchen and the grove — when the olives are
                pressed, when the rooms re-open, when the tables for spring are
                released.
              </p>
            </Reveal>
            <Reveal className="md:col-span-5" delay={0.1}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Subscribed — grazie!");
                }}
                className="flex border-b border-ivory/30 focus-within:border-bronze transition-colors"
              >
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  className="flex-1 bg-transparent py-3 text-ivory placeholder:text-ivory/40 outline-none"
                />
                <button
                  type="submit"
                  className="px-4 text-[11px] uppercase tracking-widest2 text-ivory/80 hover:text-bronze transition-colors"
                >
                  Subscribe →
                </button>
              </form>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
