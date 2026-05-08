import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Check,
  CreditCard,
  Lock,
  MapPin,
  Minus,
  Plus,
  Shield,
  Sparkles,
  Ticket,
  User,
} from "lucide-react";
import { findEvent, formatDate, formatTime } from "../data/events";
import { useBookings } from "../context/BookingsContext";

const STEPS = [
  { id: 1, label: "Tickets", icon: Ticket },
  { id: 2, label: "Details", icon: User },
  { id: 3, label: "Payment", icon: CreditCard },
];

export default function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = findEvent(id);
  const { addBooking } = useBookings();

  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  const tiers = useMemo(() => {
    if (!event) return [];
    if (event.price === 0) {
      return [{ id: "free", name: "Free Entry", desc: "General admission", price: 0 }];
    }
    return [
      {
        id: "general",
        name: "General Admission",
        desc: "Entry & full experience",
        price: event.price,
      },
      {
        id: "premium",
        name: "Premium",
        desc: "Priority entry + welcome drink",
        price: Math.round(event.price * 1.6),
      },
      {
        id: "vip",
        name: "VIP Experience",
        desc: "VIP lounge + meet & greet",
        price: Math.round(event.price * 2.4),
      },
    ];
  }, [event]);

  const [tickets, setTickets] = useState({});
  const [details, setDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    consent: false,
  });
  const [payment, setPayment] = useState({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  });

  if (!event) {
    return (
      <div className="container-page py-20 text-center">
        <h2 className="font-display text-3xl font-bold">Event not found</h2>
        <Link to="/explore" className="btn-primary mt-6 inline-flex">Browse events</Link>
      </div>
    );
  }

  const adjust = (tierId, delta) => {
    setTickets((t) => {
      const next = { ...t, [tierId]: Math.max(0, (t[tierId] || 0) + delta) };
      return next;
    });
  };

  const totalQty = Object.values(tickets).reduce((s, n) => s + (n || 0), 0);
  const subtotal = tiers.reduce(
    (s, t) => s + (tickets[t.id] || 0) * t.price,
    0,
  );
  const discount = totalQty >= 4 ? Math.round(subtotal * 0.1) : 0;
  const fees = subtotal > 0 ? Math.round((subtotal - discount) * 0.06) : 0;
  const total = subtotal - discount + fees;

  const canStep1 = totalQty > 0;
  const canStep2 =
    details.firstName.trim() &&
    details.lastName.trim() &&
    /\S+@\S+\.\S+/.test(details.email) &&
    details.consent;
  const canStep3 =
    event.price === 0 ||
    (payment.cardName.trim() &&
      payment.cardNumber.replace(/\s/g, "").length >= 12 &&
      payment.expiry.length >= 4 &&
      payment.cvc.length >= 3);

  const next = () => {
    if (step === 1 && canStep1) setStep(2);
    else if (step === 2 && canStep2) setStep(3);
    else if (step === 3 && canStep3) handleSubmit();
  };

  const back = () => {
    if (step > 1) setStep(step - 1);
    else navigate(-1);
  };

  const handleSubmit = () => {
    setSubmitting(true);
    setTimeout(() => {
      const booking = addBooking({
        eventId: event.id,
        eventTitle: event.title,
        eventImage: event.image,
        eventDate: event.date,
        eventTime: event.time,
        eventLocation: event.location,
        eventVenue: event.venue,
        tickets: tiers
          .filter((t) => tickets[t.id])
          .map((t) => ({ ...t, qty: tickets[t.id] })),
        totalQty,
        subtotal,
        discount,
        fees,
        total,
        attendee: {
          firstName: details.firstName,
          lastName: details.lastName,
          email: details.email,
          phone: details.phone,
        },
      });
      navigate(`/booking/${booking.id}/confirmed`);
    }, 900);
  };

  return (
    <section className="container-page py-8 sm:py-12">
      <button
        onClick={back}
        className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        {step === 1 ? "Back to event" : "Previous step"}
      </button>

      <div className="grid lg:grid-cols-[1fr_400px] gap-8">
        <div>
          <Stepper step={step} />

          <div className="mt-8">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="s1"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.2 }}
                >
                  <h2 className="font-display text-2xl sm:text-3xl font-bold">Choose your tickets</h2>
                  <p className="mt-1 text-white/60 text-sm">Select the tier and how many you need.</p>

                  <div className="mt-6 space-y-3">
                    {tiers.map((t) => {
                      const qty = tickets[t.id] || 0;
                      const active = qty > 0;
                      return (
                        <div
                          key={t.id}
                          className={`flex items-center gap-4 p-5 rounded-2xl border transition ${
                            active
                              ? "border-brand-violet/60 bg-brand-violet/5 shadow-glow"
                              : "border-white/10 bg-white/[0.03] hover:border-white/20"
                          }`}
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">{t.name}</h3>
                              {t.id === "premium" && <span className="chip">Most popular</span>}
                            </div>
                            <p className="text-sm text-white/60 mt-1">{t.desc}</p>
                          </div>
                          <div className="text-right">
                            <div className="font-display font-bold text-lg">
                              {t.price === 0 ? <span className="text-emerald-400">Free</span> : `$${t.price}`}
                            </div>
                            <div className="text-[11px] text-white/50">per ticket</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => adjust(t.id, -1)}
                              disabled={qty === 0}
                              className="w-9 h-9 rounded-full border border-white/15 bg-white/5 disabled:opacity-30 hover:bg-white/10 transition flex items-center justify-center"
                              aria-label="Decrease"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-7 text-center font-semibold">{qty}</span>
                            <button
                              onClick={() => adjust(t.id, +1)}
                              disabled={qty >= 10}
                              className="w-9 h-9 rounded-full border border-white/15 bg-white/5 disabled:opacity-30 hover:bg-white/10 transition flex items-center justify-center"
                              aria-label="Increase"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {totalQty >= 4 && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 flex items-center gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-200"
                    >
                      <Sparkles className="w-4 h-4" />
                      Group discount unlocked: 10% off when booking 4+ tickets.
                    </motion.div>
                  )}
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="s2"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.2 }}
                >
                  <h2 className="font-display text-2xl sm:text-3xl font-bold">Your details</h2>
                  <p className="mt-1 text-white/60 text-sm">We'll send your ticket here.</p>

                  <div className="mt-6 grid sm:grid-cols-2 gap-4">
                    <Field label="First name">
                      <input
                        value={details.firstName}
                        onChange={(e) => setDetails({ ...details, firstName: e.target.value })}
                        placeholder="Alex"
                        className="input-base"
                      />
                    </Field>
                    <Field label="Last name">
                      <input
                        value={details.lastName}
                        onChange={(e) => setDetails({ ...details, lastName: e.target.value })}
                        placeholder="Morgan"
                        className="input-base"
                      />
                    </Field>
                    <Field label="Email" className="sm:col-span-2">
                      <input
                        type="email"
                        value={details.email}
                        onChange={(e) => setDetails({ ...details, email: e.target.value })}
                        placeholder="alex@example.com"
                        className="input-base"
                      />
                    </Field>
                    <Field label="Phone (optional)" className="sm:col-span-2">
                      <input
                        value={details.phone}
                        onChange={(e) => setDetails({ ...details, phone: e.target.value })}
                        placeholder="+1 555 123 4567"
                        className="input-base"
                      />
                    </Field>
                  </div>

                  <label className="mt-5 flex items-start gap-3 text-sm text-white/70 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={details.consent}
                      onChange={(e) => setDetails({ ...details, consent: e.target.checked })}
                      className="mt-0.5 accent-brand-violet w-4 h-4"
                    />
                    <span>
                      I agree to the <a className="underline text-white" href="#">terms</a> and consent to receive event updates.
                    </span>
                  </label>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="s3"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.2 }}
                >
                  <h2 className="font-display text-2xl sm:text-3xl font-bold">Payment</h2>
                  <p className="mt-1 text-white/60 text-sm">
                    {event.price === 0 ? "No payment needed for this free event." : "Secure payment, encrypted end-to-end."}
                  </p>

                  {event.price > 0 ? (
                    <div className="mt-6 grid sm:grid-cols-2 gap-4">
                      <Field label="Name on card" className="sm:col-span-2">
                        <input
                          value={payment.cardName}
                          onChange={(e) => setPayment({ ...payment, cardName: e.target.value })}
                          placeholder="Alex Morgan"
                          className="input-base"
                        />
                      </Field>
                      <Field label="Card number" className="sm:col-span-2">
                        <div className="relative">
                          <input
                            value={payment.cardNumber}
                            onChange={(e) =>
                              setPayment({
                                ...payment,
                                cardNumber: e.target.value
                                  .replace(/\D/g, "")
                                  .slice(0, 16)
                                  .replace(/(.{4})/g, "$1 ")
                                  .trim(),
                              })
                            }
                            placeholder="1234 5678 9012 3456"
                            inputMode="numeric"
                            className="input-base pr-12"
                          />
                          <CreditCard className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-white/40" />
                        </div>
                      </Field>
                      <Field label="Expiry">
                        <input
                          value={payment.expiry}
                          onChange={(e) => {
                            let v = e.target.value.replace(/\D/g, "").slice(0, 4);
                            if (v.length >= 3) v = `${v.slice(0, 2)}/${v.slice(2)}`;
                            setPayment({ ...payment, expiry: v });
                          }}
                          placeholder="MM/YY"
                          className="input-base"
                        />
                      </Field>
                      <Field label="CVC">
                        <input
                          value={payment.cvc}
                          onChange={(e) =>
                            setPayment({ ...payment, cvc: e.target.value.replace(/\D/g, "").slice(0, 4) })
                          }
                          placeholder="123"
                          className="input-base"
                        />
                      </Field>
                    </div>
                  ) : (
                    <div className="mt-6 p-5 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-200 text-sm">
                      This is a free event — just confirm to lock in your spot.
                    </div>
                  )}

                  <div className="mt-5 flex items-center gap-2 text-xs text-white/60">
                    <Lock className="w-3.5 h-3.5 text-emerald-400" />
                    Encrypted with 256-bit SSL · Powered by Stripe
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-8 flex items-center justify-between">
            <button onClick={back} className="btn-ghost">
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <button
              onClick={next}
              disabled={
                submitting ||
                (step === 1 && !canStep1) ||
                (step === 2 && !canStep2) ||
                (step === 3 && !canStep3)
              }
              className="btn-primary disabled:opacity-50 disabled:hover:scale-100"
            >
              {submitting ? (
                <>
                  <span className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                  Confirming…
                </>
              ) : step === 3 ? (
                <>
                  Confirm booking
                  <Check className="w-4 h-4" />
                </>
              ) : (
                <>
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 self-start order-first lg:order-last">
          <div className="glass-strong rounded-3xl overflow-hidden">
            <div className="relative aspect-[16/9]">
              <img src={event.image} alt={event.title} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <h3 className="font-display font-bold text-lg leading-tight">{event.title}</h3>
              </div>
            </div>
            <div className="p-5 space-y-3">
              <div className="flex items-center gap-2 text-sm text-white/70">
                <Calendar className="w-4 h-4 text-white/40" />
                {formatDate(event.date, { weekday: true })} · {formatTime(event.time)}
              </div>
              <div className="flex items-start gap-2 text-sm text-white/70">
                <MapPin className="w-4 h-4 text-white/40 mt-0.5" />
                <span>{event.venue}, {event.location}</span>
              </div>

              <div className="border-t border-white/10 pt-4 space-y-2 text-sm">
                {tiers.map((t) => {
                  const qty = tickets[t.id] || 0;
                  if (!qty) return null;
                  return (
                    <div key={t.id} className="flex items-start justify-between">
                      <div>
                        <div className="text-white">{t.name}</div>
                        <div className="text-xs text-white/50">{qty} × ${t.price}</div>
                      </div>
                      <div className="font-semibold">${qty * t.price}</div>
                    </div>
                  );
                })}
                {totalQty === 0 && (
                  <div className="text-sm text-white/50 italic">No tickets selected yet.</div>
                )}
              </div>

              {totalQty > 0 && (
                <div className="border-t border-white/10 pt-4 space-y-1.5 text-sm">
                  <Row label="Subtotal" value={`$${subtotal}`} />
                  {discount > 0 && (
                    <Row label="Group discount (-10%)" value={`-$${discount}`} accent="text-emerald-400" />
                  )}
                  <Row label="Service fee" value={`$${fees}`} />
                  <div className="border-t border-white/10 pt-3 mt-2 flex items-baseline justify-between">
                    <span className="text-white/70">Total</span>
                    <span className="font-display font-bold text-2xl">${total}</span>
                  </div>
                </div>
              )}

              <div className="pt-2 flex items-center gap-2 text-xs text-white/60">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                Free cancellation up to 48h before
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

function Stepper({ step }) {
  return (
    <ol className="flex items-center gap-3">
      {STEPS.map((s, i) => {
        const Icon = s.icon;
        const active = step === s.id;
        const done = step > s.id;
        return (
          <li key={s.id} className="flex items-center gap-3 flex-1">
            <div
              className={`relative inline-flex items-center justify-center w-9 h-9 rounded-full border transition ${
                active
                  ? "bg-brand-gradient border-transparent shadow-glow text-white"
                  : done
                  ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-300"
                  : "bg-white/5 border-white/10 text-white/40"
              }`}
            >
              {done ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
            </div>
            <span
              className={`text-sm hidden sm:inline ${
                active ? "text-white font-semibold" : done ? "text-white/80" : "text-white/40"
              }`}
            >
              {s.label}
            </span>
            {i < STEPS.length - 1 && (
              <span
                className={`hidden sm:block flex-1 h-px ${
                  done ? "bg-emerald-500/40" : "bg-white/10"
                }`}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}

function Field({ label, children, className = "" }) {
  return (
    <label className={`block ${className}`}>
      <span className="block text-xs font-medium text-white/60 mb-1.5">{label}</span>
      {children}
    </label>
  );
}

function Row({ label, value, accent }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-white/60">{label}</span>
      <span className={accent || "text-white"}>{value}</span>
    </div>
  );
}
