import { Link, useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Check, Download, MapPin, Sparkles, Ticket } from "lucide-react";
import { useBookings } from "../context/BookingsContext";
import { formatDate, formatTime } from "../data/events";

export default function BookingConfirmation() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const { bookings } = useBookings();
  const booking = bookings.find((b) => b.id === bookingId);

  if (!booking) {
    return (
      <div className="container-page py-20 text-center">
        <h2 className="font-display text-3xl font-bold">Booking not found</h2>
        <p className="mt-2 text-white/60">It may have expired or been removed.</p>
        <button onClick={() => navigate("/dashboard")} className="btn-primary mt-6 inline-flex">
          Go to dashboard
        </button>
      </div>
    );
  }

  return (
    <section className="container-page py-10 sm:py-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-2xl mx-auto text-center"
      >
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 220 }}
          className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-brand-gradient shadow-glow"
        >
          <Check className="w-9 h-9 text-white" strokeWidth={3} />
          <span className="absolute inset-0 -m-3 rounded-full border border-white/20 animate-ping" />
        </motion.div>

        <h1 className="mt-6 font-display text-3xl sm:text-4xl font-bold">
          You're <span className="gradient-text">in!</span>
        </h1>
        <p className="mt-2 text-white/70">
          Booking confirmed. We've sent a copy to <strong className="text-white">{booking.attendee.email}</strong>.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="max-w-2xl mx-auto mt-10 glass-strong rounded-3xl overflow-hidden"
      >
        <div className="relative aspect-[21/9]">
          <img src={booking.eventImage} alt={booking.eventTitle} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5">
            <h2 className="font-display text-2xl font-bold leading-tight">{booking.eventTitle}</h2>
          </div>
        </div>

        <div className="p-6 space-y-5">
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <Info icon={Calendar} label="Date & time">
              {formatDate(booking.eventDate, { weekday: true })} · {formatTime(booking.eventTime)}
            </Info>
            <Info icon={MapPin} label="Venue">
              {booking.eventVenue}, {booking.eventLocation}
            </Info>
            <Info icon={Ticket} label="Booking ID">
              <span className="font-mono text-white">{booking.id}</span>
            </Info>
            <Info icon={Sparkles} label="Attendee">
              {booking.attendee.firstName} {booking.attendee.lastName}
            </Info>
          </div>

          <div className="border-t border-white/10 pt-5">
            <h3 className="font-semibold mb-3">Tickets</h3>
            <div className="space-y-2 text-sm">
              {booking.tickets.map((t) => (
                <div key={t.id} className="flex items-center justify-between">
                  <div>
                    <div className="text-white">{t.name}</div>
                    <div className="text-xs text-white/50">{t.qty} × ${t.price}</div>
                  </div>
                  <div className="font-semibold">${t.qty * t.price}</div>
                </div>
              ))}
            </div>
            <div className="border-t border-white/10 mt-4 pt-3 flex items-baseline justify-between">
              <span className="text-white/70">Total paid</span>
              <span className="font-display font-bold text-2xl">${booking.total}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => window.print()}
              className="btn-ghost w-full"
            >
              <Download className="w-4 h-4" />
              Download ticket
            </button>
            <Link to="/dashboard" className="btn-primary w-full">
              View my bookings
            </Link>
          </div>
        </div>
      </motion.div>

      <div className="mt-8 text-center text-sm text-white/50">
        Want to keep the vibe going?{" "}
        <Link to="/explore" className="text-white underline hover:text-brand-violet">
          Discover more events
        </Link>
      </div>
    </section>
  );
}

function Info({ icon: Icon, label, children }) {
  return (
    <div className="flex items-start gap-3 p-4 rounded-xl border border-white/10 bg-white/[0.03]">
      <Icon className="w-4 h-4 text-white/50 mt-0.5 shrink-0" />
      <div>
        <div className="text-[11px] uppercase tracking-wider text-white/50 mb-0.5">{label}</div>
        <div className="text-sm text-white/90">{children}</div>
      </div>
    </div>
  );
}
