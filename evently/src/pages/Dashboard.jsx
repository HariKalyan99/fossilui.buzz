import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, MapPin, Ticket, Trash2, Sparkles, Search, Plus } from "lucide-react";
import { useBookings } from "../context/BookingsContext";
import { formatDate, formatTime } from "../data/events";

const TABS = [
  { id: "upcoming", label: "Upcoming" },
  { id: "past", label: "Past" },
  { id: "all", label: "All" },
];

export default function Dashboard() {
  const { bookings, removeBooking } = useBookings();
  const [tab, setTab] = useState("upcoming");

  const today = new Date().toISOString().slice(0, 10);

  const filtered = useMemo(() => {
    if (tab === "upcoming") return bookings.filter((b) => b.eventDate >= today);
    if (tab === "past") return bookings.filter((b) => b.eventDate < today);
    return bookings;
  }, [bookings, tab, today]);

  const stats = useMemo(() => {
    const upcoming = bookings.filter((b) => b.eventDate >= today).length;
    const past = bookings.length - upcoming;
    const spend = bookings.reduce((s, b) => s + (b.total || 0), 0);
    return { upcoming, past, spend, total: bookings.length };
  }, [bookings, today]);

  return (
    <section className="container-page py-10 sm:py-14">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight">
            Your <span className="gradient-text">dashboard</span>
          </h1>
          <p className="mt-2 text-white/60">All your bookings, one place.</p>
        </div>
        <Link to="/explore" className="btn-primary">
          <Plus className="w-4 h-4" />
          Find new events
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
        <Stat label="Upcoming" value={stats.upcoming} accent="from-brand-violet to-brand-blue" />
        <Stat label="Past" value={stats.past} accent="from-emerald-500 to-teal-500" />
        <Stat label="Total bookings" value={stats.total} accent="from-blue-500 to-cyan-500" />
        <Stat label="Total spent" value={`$${stats.spend}`} accent="from-orange-500 to-pink-500" />
      </div>

      <div className="mt-10 flex items-center gap-1 p-1 rounded-full border border-white/10 bg-white/[0.03] w-fit">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`relative px-4 py-2 rounded-full text-sm transition ${
              tab === t.id ? "text-white" : "text-white/60 hover:text-white"
            }`}
          >
            {tab === t.id && (
              <motion.span
                layoutId="dash-pill"
                className="absolute inset-0 rounded-full bg-brand-gradient shadow-glow"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative">{t.label}</span>
          </button>
        ))}
      </div>

      <div className="mt-6">
        {filtered.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-4">
            {filtered.map((b, i) => (
              <BookingRow key={b.id} booking={b} index={i} onRemove={() => removeBooking(b.id)} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function Stat({ label, value, accent }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-ink-800/60 p-5">
      <div className={`absolute -top-8 -right-8 w-24 h-24 rounded-full bg-gradient-to-br ${accent} opacity-25 blur-2xl`} />
      <div className="text-xs text-white/60">{label}</div>
      <div className="font-display font-bold text-2xl mt-1">{value}</div>
    </div>
  );
}

function BookingRow({ booking, index, onRemove }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      className="group flex flex-col sm:flex-row gap-5 rounded-2xl border border-white/10 bg-ink-800/60 overflow-hidden card-hover"
    >
      <div className="relative sm:w-56 shrink-0 aspect-[16/10] sm:aspect-auto">
        <img src={booking.eventImage} alt={booking.eventTitle} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-ink-800/50" />
      </div>
      <div className="flex-1 p-5 flex flex-col sm:flex-row gap-4 justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="chip"><Ticket className="w-3 h-3" />{booking.id}</span>
            <span className="chip">{booking.totalQty} ticket{booking.totalQty > 1 ? "s" : ""}</span>
          </div>
          <h3 className="font-display text-lg font-semibold leading-tight">{booking.eventTitle}</h3>
          <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-white/60">
            <span className="inline-flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{formatDate(booking.eventDate)} · {formatTime(booking.eventTime)}</span>
            <span className="inline-flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{booking.eventVenue}, {booking.eventLocation}</span>
          </div>
        </div>
        <div className="flex sm:flex-col items-center sm:items-end justify-between gap-3">
          <div className="text-right">
            <div className="text-xs text-white/50">Total</div>
            <div className="font-display font-bold text-lg">${booking.total}</div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to={`/events/${booking.eventId}`}
              className="btn-ghost !py-2 !px-3 text-xs"
            >
              View event
            </Link>
            <button
              onClick={onRemove}
              className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-white/10 bg-white/5 text-white/60 hover:text-rose-400 hover:border-rose-500/40 transition"
              aria-label="Cancel booking"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function EmptyState() {
  return (
    <div className="glass rounded-3xl p-12 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-gradient mb-5 shadow-glow">
        <Sparkles className="w-7 h-7 text-white" />
      </div>
      <h3 className="font-display text-xl font-semibold">No bookings yet</h3>
      <p className="mt-2 text-white/60 text-sm max-w-md mx-auto">
        Once you book an event, your tickets and details will live here. Find something amazing to attend.
      </p>
      <Link to="/explore" className="btn-primary mt-6 inline-flex">
        <Search className="w-4 h-4" />
        Explore events
      </Link>
    </div>
  );
}
