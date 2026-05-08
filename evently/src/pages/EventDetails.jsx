import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  Star,
  Users,
  ChevronDown,
  Share2,
  Heart,
  CheckCircle2,
  ArrowRight,
  Shield,
  Ticket,
  ArrowLeft,
} from "lucide-react";
import { findEvent, formatDate, formatTime, getCategory, events } from "../data/events";
import EventCard from "../components/EventCard";

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = findEvent(id);
  const [activeImg, setActiveImg] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);
  const [liked, setLiked] = useState(false);

  if (!event) {
    return (
      <div className="container-page py-20 text-center">
        <h2 className="font-display text-3xl font-bold">Event not found</h2>
        <p className="mt-2 text-white/60">The event you're looking for has wandered off.</p>
        <Link to="/explore" className="btn-primary mt-6 inline-flex">Browse events</Link>
      </div>
    );
  }

  const cat = getCategory(event.category);
  const related = events
    .filter((e) => e.id !== event.id && e.category === event.category)
    .slice(0, 3);

  return (
    <div>
      <section className="container-page pt-2">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition mb-5"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
      </section>

      <section className="container-page">
        <div className="relative overflow-hidden rounded-3xl border border-white/10">
          <div className="relative aspect-[21/9] sm:aspect-[21/8]">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeImg}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                src={event.gallery[activeImg]}
                alt={event.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-transparent" />

            <div className="absolute top-5 left-5 flex flex-wrap items-center gap-2">
              <span className={`chip bg-gradient-to-r ${cat?.color} !text-white !border-white/20`}>
                {cat?.emoji} {cat?.name}
              </span>
              {event.trending && <span className="chip !bg-black/50 !border-white/20">🔥 Trending</span>}
            </div>

            <div className="absolute top-5 right-5 flex items-center gap-2">
              <button
                onClick={() => setLiked((l) => !l)}
                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-black/50 backdrop-blur border border-white/15 hover:bg-black/70 transition"
                aria-label="Save"
              >
                <Heart className={`w-4 h-4 ${liked ? "fill-rose-500 text-rose-500" : "text-white"}`} />
              </button>
              <button
                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-black/50 backdrop-blur border border-white/15 hover:bg-black/70 transition"
                aria-label="Share"
              >
                <Share2 className="w-4 h-4 text-white" />
              </button>
            </div>

            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
              <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight max-w-4xl">
                {event.title}
              </h1>
              <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-white/80">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {formatDate(event.date, { weekday: true, year: true })}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {formatTime(event.time)} · {event.durationHours}h
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  {event.venue}, {event.location}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  {event.rating} ({event.attendees.toLocaleString()} going)
                </span>
              </div>
            </div>
          </div>

          {event.gallery.length > 1 && (
            <div className="absolute bottom-5 right-5 hidden sm:flex gap-2">
              {event.gallery.map((g, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition ${
                    i === activeImg ? "border-white" : "border-white/20 hover:border-white/60"
                  }`}
                >
                  <img src={g} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="container-page py-12">
        <div className="grid lg:grid-cols-[1fr_380px] gap-10">
          <div className="space-y-10">
            <div>
              <h2 className="font-display text-2xl font-bold mb-3">About this event</h2>
              <p className="text-white/70 leading-relaxed">{event.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {event.tags.map((t) => (
                  <span key={t} className="chip">#{t}</span>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold mb-4">What's included</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {event.highlights.map((h) => (
                  <div key={h} className="flex items-start gap-3 p-4 rounded-xl border border-white/10 bg-white/[0.03]">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-sm text-white/80">{h}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold mb-4">Organizer</h2>
              <div className="flex items-center gap-4 p-5 rounded-2xl border border-white/10 bg-white/[0.03]">
                <div className="w-14 h-14 rounded-2xl bg-brand-gradient flex items-center justify-center font-display font-bold text-xl">
                  {event.organizer.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{event.organizer.name}</h3>
                    {event.organizer.verified && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand-blue">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-white/60 mt-0.5">
                    {event.organizer.events} events hosted · 4.8 average rating
                  </p>
                </div>
                <button className="btn-ghost !py-2 !px-3 text-xs">Follow</button>
              </div>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold mb-4">Location</h2>
              <div className="rounded-2xl overflow-hidden border border-white/10">
                <div className="relative aspect-[16/8] bg-gradient-to-br from-ink-700 via-ink-800 to-ink-900">
                  <div
                    className="absolute inset-0 opacity-60"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
                      backgroundSize: "40px 40px",
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <span className="absolute inset-0 -m-4 rounded-full bg-brand-violet/30 animate-ping" />
                      <span className="relative inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-gradient shadow-glow">
                        <MapPin className="w-5 h-5 text-white" />
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-5 flex items-center justify-between gap-4 flex-wrap">
                  <div>
                    <div className="font-semibold">{event.venue}</div>
                    <div className="text-xs text-white/60">{event.location}</div>
                  </div>
                  <a
                    href={`https://www.google.com/maps/search/${encodeURIComponent(event.venue + " " + event.location)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-ghost !py-2 !px-4 text-xs"
                  >
                    Get directions
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold mb-4">FAQs</h2>
              <div className="rounded-2xl border border-white/10 divide-y divide-white/10 overflow-hidden">
                {event.faqs.map((f, i) => (
                  <div key={f.q}>
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                      className="w-full flex items-center justify-between text-left p-5 hover:bg-white/[0.03] transition"
                    >
                      <span className="font-medium pr-4">{f.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-white/60 transition-transform shrink-0 ${
                          openFaq === i ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {openFaq === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <p className="px-5 pb-5 text-sm text-white/70 leading-relaxed">{f.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 self-start">
            <div className="glass-strong rounded-3xl p-6 shadow-card">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-white/60">Starting from</span>
                  <div className="font-display font-bold text-3xl">
                    {event.price === 0 ? (
                      <span className="text-emerald-400">Free</span>
                    ) : (
                      <>${event.price}</>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-white/60 inline-flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {event.attendees.toLocaleString()} going
                  </div>
                  <div className="text-xs text-emerald-400 mt-1">Selling fast</div>
                </div>
              </div>

              <button
                onClick={() => navigate(`/book/${event.id}`)}
                className="btn-primary w-full mt-5 !py-3.5 text-base"
              >
                <Ticket className="w-5 h-5" />
                Book Now
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="mt-5 space-y-2.5 text-sm text-white/70">
                <div className="flex items-center gap-2.5">
                  <Calendar className="w-4 h-4 text-white/40" />
                  <span>{formatDate(event.date, { weekday: true })}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-white/40" />
                  <span>{formatTime(event.time)}</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-white/40 mt-0.5" />
                  <span>{event.venue}, {event.location}</span>
                </div>
              </div>

              <div className="mt-5 pt-5 border-t border-white/10 flex items-center gap-2 text-xs text-white/60">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                Secure checkout · Refundable up to 48h
              </div>
            </div>

            <div className="mt-4 glass rounded-2xl p-4 text-xs text-white/70 flex items-start gap-3">
              <span className="text-2xl leading-none">💡</span>
              <div>
                <strong className="text-white">Pro tip:</strong> Group bookings of 4+ get an automatic 10% discount at checkout.
              </div>
            </div>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="container-page py-12">
          <div className="divider-grad mb-12" />
          <h2 className="font-display text-2xl sm:text-3xl font-bold mb-6">
            You might also like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {related.map((e, i) => (
              <EventCard key={e.id} event={e} index={i} />
            ))}
          </div>
        </section>
      )}

      <div className="lg:hidden fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-ink-900/90 backdrop-blur-xl p-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-xs text-white/60">From</div>
            <div className="font-display font-bold text-xl">
              {event.price === 0 ? <span className="text-emerald-400">Free</span> : `$${event.price}`}
            </div>
          </div>
          <button onClick={() => navigate(`/book/${event.id}`)} className="btn-primary flex-1 max-w-[60%]">
            Book Now
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
