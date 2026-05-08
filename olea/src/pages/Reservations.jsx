import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { rooms } from "../data/content";
import Reveal from "../components/ui/Reveal";

const ASIDE_IMAGE =
  "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1400&q=85";

const today = new Date().toISOString().split("T")[0];

export default function Reservations() {
  const [type, setType] = useState("stay"); // "stay" | "table"
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    arrival: "",
    departure: "",
    date: "",
    time: "19:30",
    guests: 2,
    room: rooms[0].id,
    notes: "",
  });

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const summary = useMemo(() => {
    if (type === "stay") {
      const r = rooms.find((x) => x.id === form.room);
      const nights =
        form.arrival && form.departure
          ? Math.max(
              1,
              Math.round(
                (new Date(form.departure) - new Date(form.arrival)) /
                  (1000 * 60 * 60 * 24),
              ),
            )
          : 0;
      return {
        line1: r?.name,
        line2: `${form.guests} guest${form.guests > 1 ? "s" : ""} · ${nights || "—"} night${nights === 1 ? "" : "s"}`,
        cost: nights ? `€${(r.price * nights).toLocaleString()}` : "—",
        costLabel: "Estimated total",
      };
    }
    return {
      line1: "Tasting Menu",
      line2: `${form.guests} guest${form.guests > 1 ? "s" : ""} · ${form.time}`,
      cost: `€${135 * form.guests}`,
      costLabel: "Approximate total",
    };
  }, [type, form]);

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="pt-28 md:pt-36 pb-24 md:pb-32">
      <div className="container-x">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Left: image + intro */}
          <aside className="lg:col-span-5">
            <Reveal variant="scale" duration={1.1}>
              <div className="relative aspect-[4/5] overflow-hidden bg-ink">
                <img
                  src={ASIDE_IMAGE}
                  alt="A guest suite at OLEA"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-8 md:p-10 text-ivory">
                  <p className="eyebrow text-ivory/60">Summary</p>
                  <p className="mt-3 font-display text-3xl md:text-4xl tracking-tight">
                    {summary.line1}
                  </p>
                  <p className="mt-2 text-ivory/75 text-sm">{summary.line2}</p>
                  <div className="mt-6 pt-6 border-t border-ivory/15 flex items-end justify-between">
                    <p className="eyebrow text-ivory/60">{summary.costLabel}</p>
                    <p className="font-display text-3xl text-bronze">
                      {summary.cost}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-sm text-ink/65">
                We confirm every reservation personally — usually within the
                hour. No payment is taken at the time of request.
              </p>
            </Reveal>
          </aside>

          {/* Right: form */}
          <div className="lg:col-span-7">
            <Reveal>
              <p className="divider-num">Reservations</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mt-6 font-display text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight">
                Tell us when
                <br />
                <em className="font-light italic text-bronze">to expect you.</em>
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-10 inline-flex bg-bone p-1">
                {[
                  { v: "stay", l: "A Stay" },
                  { v: "table", l: "A Table" },
                ].map((t) => (
                  <button
                    key={t.v}
                    onClick={() => setType(t.v)}
                    className={`px-6 py-2.5 text-[12px] uppercase tracking-widest2 transition-colors duration-400 ${
                      type === t.v
                        ? "bg-ink text-ivory"
                        : "text-ink/70 hover:text-ink"
                    }`}
                  >
                    {t.l}
                  </button>
                ))}
              </div>
            </Reveal>

            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  onSubmit={onSubmit}
                  className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-7"
                >
                  {type === "stay" ? (
                    <>
                      <Field label="Arrival">
                        <input
                          type="date"
                          required
                          min={today}
                          value={form.arrival}
                          onChange={(e) => update("arrival", e.target.value)}
                          className="input"
                        />
                      </Field>
                      <Field label="Departure">
                        <input
                          type="date"
                          required
                          min={form.arrival || today}
                          value={form.departure}
                          onChange={(e) => update("departure", e.target.value)}
                          className="input"
                        />
                      </Field>
                      <Field label="Guests">
                        <select
                          value={form.guests}
                          onChange={(e) =>
                            update("guests", Number(e.target.value))
                          }
                          className="input"
                        >
                          {[1, 2, 3, 4].map((n) => (
                            <option key={n} value={n}>
                              {n} guest{n > 1 ? "s" : ""}
                            </option>
                          ))}
                        </select>
                      </Field>
                      <Field label="Suite">
                        <select
                          value={form.room}
                          onChange={(e) => update("room", e.target.value)}
                          className="input"
                        >
                          {rooms.map((r) => (
                            <option key={r.id} value={r.id}>
                              {r.name} — €{r.price}/night
                            </option>
                          ))}
                        </select>
                      </Field>
                    </>
                  ) : (
                    <>
                      <Field label="Date">
                        <input
                          type="date"
                          required
                          min={today}
                          value={form.date}
                          onChange={(e) => update("date", e.target.value)}
                          className="input"
                        />
                      </Field>
                      <Field label="Time">
                        <select
                          value={form.time}
                          onChange={(e) => update("time", e.target.value)}
                          className="input"
                        >
                          {["19:30", "20:00", "20:30", "21:00"].map((t) => (
                            <option key={t} value={t}>
                              {t}
                            </option>
                          ))}
                        </select>
                      </Field>
                      <Field label="Guests" full>
                        <select
                          value={form.guests}
                          onChange={(e) =>
                            update("guests", Number(e.target.value))
                          }
                          className="input"
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                            <option key={n} value={n}>
                              {n} guest{n > 1 ? "s" : ""}
                            </option>
                          ))}
                        </select>
                      </Field>
                    </>
                  )}

                  <Field label="Full name">
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      className="input"
                    />
                  </Field>
                  <Field label="Email">
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      className="input"
                    />
                  </Field>
                  <Field label="Phone" full>
                    <input
                      type="tel"
                      placeholder="+39 ..."
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      className="input"
                    />
                  </Field>
                  <Field label="Anything we should know?" full>
                    <textarea
                      rows={4}
                      placeholder="Allergies, anniversaries, the kind of evening you're hoping for…"
                      value={form.notes}
                      onChange={(e) => update("notes", e.target.value)}
                      className="input resize-none"
                    />
                  </Field>

                  <div className="md:col-span-2 mt-2 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between border-t border-ink/15 pt-8">
                    <p className="text-xs text-ink/55 max-w-md">
                      By submitting, you agree to be contacted by our reservations
                      team. We never share your details.
                    </p>
                    <button type="submit" className="btn-primary">
                      Request Reservation
                    </button>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="thanks"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-10 border border-ink/15 p-10 md:p-14"
                >
                  <p className="divider-num">Thank you</p>
                  <h2 className="mt-5 font-display text-4xl md:text-5xl leading-[1.05] tracking-tight">
                    Your request is on its way.
                  </h2>
                  <p className="mt-6 text-ink/70 max-w-lg text-pretty">
                    We've received your reservation, {form.name || "friend"}.
                    Anna or Tomás will reply within a few hours to confirm the
                    details. We can't wait to welcome you.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({
                        name: "",
                        email: "",
                        phone: "",
                        arrival: "",
                        departure: "",
                        date: "",
                        time: "19:30",
                        guests: 2,
                        room: rooms[0].id,
                        notes: "",
                      });
                    }}
                    className="mt-8 btn-outline"
                  >
                    Make Another Request
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <style>{`
        .input {
          width: 100%;
          background: transparent;
          border: 0;
          border-bottom: 1px solid rgba(14,14,12,0.18);
          padding: 0.65rem 0;
          color: #0E0E0C;
          font-size: 15px;
          outline: none;
          transition: border-color 0.4s cubic-bezier(0.22,1,0.36,1);
        }
        .input::placeholder { color: rgba(14,14,12,0.35); }
        .input:focus { border-color: #A98253; }
        select.input { appearance: none; background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path d='M1 1l4 4 4-4' stroke='%230E0E0C' stroke-opacity='0.55' fill='none' stroke-width='1.2'/></svg>"); background-repeat: no-repeat; background-position: right 4px center; padding-right: 18px; }
      `}</style>
    </section>
  );
}

function Field({ label, children, full }) {
  return (
    <label className={`block ${full ? "md:col-span-2" : ""}`}>
      <span className="block eyebrow mb-2">{label}</span>
      {children}
    </label>
  );
}
