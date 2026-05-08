import { useState } from "react";
import { gallery } from "../data/content";
import Reveal from "../components/ui/Reveal";
import Lightbox from "../components/ui/Lightbox";

export default function Gallery() {
  const [index, setIndex] = useState(null);

  const open = (i) => setIndex(i);
  const close = () => setIndex(null);
  const next = () => setIndex((i) => (i + 1) % gallery.length);
  const prev = () =>
    setIndex((i) => (i - 1 + gallery.length) % gallery.length);

  return (
    <>
      <section className="pt-32 md:pt-40 pb-12 md:pb-16 container-x">
        <Reveal>
          <p className="divider-num">Gallery</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mt-6 font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight max-w-5xl text-balance">
            A portrait of a place,
            <br />
            <em className="font-light italic text-bronze">one frame at a time.</em>
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-8 max-w-xl text-ink/65 text-pretty">
            Photographed across the seasons by our friend, Lucia Ferri.
            Tap any image to view it full-size.
          </p>
        </Reveal>
      </section>

      <section className="container-x pb-24 md:pb-32">
        {/* CSS columns masonry — graceful fallback */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 md:gap-6 [column-fill:_balance]">
          {gallery.map((img, i) => {
            const aspect =
              img.span === "tall"
                ? "aspect-[3/4]"
                : img.span === "wide"
                  ? "aspect-[4/3]"
                  : "aspect-[1/1]";
            return (
              <Reveal
                key={img.src}
                variant="scale"
                duration={1.1}
                delay={(i % 6) * 0.04}
                className="break-inside-avoid mb-4 md:mb-6"
              >
                <button
                  onClick={() => open(i)}
                  className="group relative block w-full overflow-hidden bg-ink"
                  aria-label={`View ${img.alt}`}
                >
                  <div className={`${aspect} w-full overflow-hidden`}>
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1400ms] ease-smooth group-hover:scale-[1.07]"
                    />
                  </div>
                  <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/15 transition-colors duration-500" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] uppercase tracking-widest2 text-ivory opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="bg-ink/40 backdrop-blur-sm px-2 py-1">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="bg-ink/40 backdrop-blur-sm px-2 py-1">
                      View ↗
                    </span>
                  </div>
                </button>
              </Reveal>
            );
          })}
        </div>
      </section>

      <Lightbox
        images={gallery}
        index={index}
        onClose={close}
        onNext={next}
        onPrev={prev}
      />
    </>
  );
}
