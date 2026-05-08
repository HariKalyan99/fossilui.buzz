import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, MapPin, Star, TrendingUp } from "lucide-react";
import { formatDate, getCategory } from "../data/events";

export default function EventCard({ event, index = 0, compact = false }) {
  const cat = getCategory(event.category);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      className="group"
    >
      <Link
        to={`/events/${event.id}`}
        className="block relative overflow-hidden rounded-3xl border border-white/10 bg-ink-800/60 card-hover"
      >
        <div className="relative aspect-[16/11] overflow-hidden">
          <img
            src={event.image}
            alt={event.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-transparent" />

          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            <span className={`chip bg-gradient-to-r ${cat?.color || "from-brand-violet to-brand-blue"} !text-white !border-white/20`}>
              <span>{cat?.emoji}</span>
              {cat?.name}
            </span>
            {event.trending && (
              <span className="chip !bg-black/50 !text-white !border-white/20">
                <TrendingUp className="w-3 h-3" />
                Trending
              </span>
            )}
          </div>

          <div className="absolute top-3 right-3 chip !bg-black/50 !border-white/20">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            {event.rating}
          </div>

          <div className="absolute bottom-3 right-3 flex items-baseline gap-1 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur border border-white/15">
            {event.price === 0 ? (
              <span className="text-sm font-semibold text-emerald-400">Free</span>
            ) : (
              <>
                <span className="text-[11px] text-white/60">from</span>
                <span className="text-sm font-bold text-white">${event.price}</span>
              </>
            )}
          </div>
        </div>

        <div className={`p-5 ${compact ? "pt-4" : ""}`}>
          <h3 className="font-display font-semibold text-lg leading-snug text-white group-hover:gradient-text transition-colors line-clamp-2">
            {event.title}
          </h3>

          <div className="mt-3 flex items-center gap-4 text-xs text-white/60">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {formatDate(event.date)}
            </span>
            <span className="inline-flex items-center gap-1.5 truncate">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{event.location}</span>
            </span>
          </div>

          {!compact && (
            <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
              <span className="text-xs text-white/50">
                {event.attendees.toLocaleString()} attending
              </span>
              <span className="text-xs font-semibold gradient-text inline-flex items-center gap-1">
                View Details
                <span aria-hidden>→</span>
              </span>
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
