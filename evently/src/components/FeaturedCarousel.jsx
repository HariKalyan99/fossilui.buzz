import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Calendar, MapPin, Star, ArrowRight } from "lucide-react";
import { events, formatDate, getCategory } from "../data/events";

export default function FeaturedCarousel() {
  const scrollerRef = useRef(null);
  const featured = events.filter((e) => e.featured);

  const scroll = (dir) => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.85;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <section className="container-page py-16">
      <div className="flex items-end justify-between mb-8 gap-4">
        <div>
          <span className="chip">Hand-picked for you</span>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight">
            Featured <span className="gradient-text">this week</span>
          </h2>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => scroll(-1)}
            className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition"
            aria-label="Previous"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll(1)}
            className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition"
            aria-label="Next"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="no-scrollbar -mx-5 sm:-mx-8 px-5 sm:px-8 flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth"
      >
        {featured.map((e, i) => {
          const cat = getCategory(e.category);
          return (
            <motion.div
              key={e.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="snap-start shrink-0 w-[88%] sm:w-[60%] lg:w-[44%]"
            >
              <Link
                to={`/events/${e.id}`}
                className="group relative block overflow-hidden rounded-3xl border border-white/10"
              >
                <div className="relative aspect-[16/10]">
                  <img src={e.image} alt={e.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />

                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className={`chip bg-gradient-to-r ${cat?.color} !text-white !border-white/20`}>
                      <span>{cat?.emoji}</span>
                      {cat?.name}
                    </span>
                    <span className="chip !bg-black/50 !border-white/20">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      {e.rating}
                    </span>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                      {e.title}
                    </h3>
                    <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-white/70">
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {formatDate(e.date)} · {e.time}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5" />
                        {e.location}
                      </span>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div>
                        <span className="text-xs text-white/50">From</span>
                        <div className="font-display font-bold text-xl text-white">
                          {e.price === 0 ? "Free" : `$${e.price}`}
                        </div>
                      </div>
                      <span className="btn-primary !py-2 !px-4 text-sm group-hover:shadow-glow-orange">
                        Book now
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
