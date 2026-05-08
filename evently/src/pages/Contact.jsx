import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MessageCircle, Phone, Send, CheckCircle2, MapPin, Clock } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", topic: "general", message: "" });
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: "", email: "", topic: "general", message: "" });
  };

  return (
    <section className="container-page py-12 sm:py-16">
      <div className="max-w-3xl mx-auto text-center">
        <span className="chip">We're here to help</span>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl font-bold tracking-tight">
          Get in <span className="gradient-text">touch</span>
        </h1>
        <p className="mt-3 text-white/60">
          Questions, feedback, or hosting your own event? Drop us a line and our team will get back within a few hours.
        </p>
      </div>

      <div className="mt-12 grid lg:grid-cols-[1fr_360px] gap-8">
        <motion.form
          onSubmit={submit}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="glass-strong rounded-3xl p-6 sm:p-8"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Your name">
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Alex Morgan"
                required
                className="input-base"
              />
            </Field>
            <Field label="Email">
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="alex@example.com"
                required
                className="input-base"
              />
            </Field>
            <Field label="What's this about?" className="sm:col-span-2">
              <select
                value={form.topic}
                onChange={(e) => setForm({ ...form, topic: e.target.value })}
                className="input-base cursor-pointer"
              >
                <option value="general" className="bg-ink-900">General question</option>
                <option value="booking" className="bg-ink-900">Booking issue</option>
                <option value="refund" className="bg-ink-900">Refund request</option>
                <option value="hosting" className="bg-ink-900">I want to host an event</option>
                <option value="press" className="bg-ink-900">Press &amp; partnerships</option>
              </select>
            </Field>
            <Field label="Message" className="sm:col-span-2">
              <textarea
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell us what's on your mind…"
                required
                className="input-base resize-none"
              />
            </Field>
          </div>

          <div className="mt-6 flex items-center justify-between gap-3">
            <p className="text-xs text-white/50">
              We typically respond in under 4 hours during business hours.
            </p>
            <button type="submit" className="btn-primary">
              {sent ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  Sent!
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send message
                </>
              )}
            </button>
          </div>
        </motion.form>

        <motion.aside
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="space-y-3"
        >
          <ContactCard icon={Mail} label="Email us" value="hello@evently.app" subtext="24/7 monitored" />
          <ContactCard icon={Phone} label="Call us" value="+1 (415) 555-0199" subtext="Mon–Fri, 9am–6pm PT" />
          <ContactCard icon={MessageCircle} label="Live chat" value="Open in app" subtext="Avg. wait under 2 min" />
          <ContactCard icon={MapPin} label="HQ" value="San Francisco, CA" subtext="Visit by appointment" />
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 flex items-start gap-3">
            <Clock className="w-4 h-4 text-emerald-400 mt-0.5" />
            <div className="text-xs text-white/70">
              <strong className="text-white">Average response time:</strong> 2h 14m today.
            </div>
          </div>
        </motion.aside>
      </div>
    </section>
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

function ContactCard({ icon: Icon, label, value, subtext }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 flex items-start gap-4 card-hover">
      <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-brand-gradient shadow-glow shrink-0">
        <Icon className="w-4 h-4 text-white" />
      </span>
      <div>
        <div className="text-[11px] uppercase tracking-wider text-white/50">{label}</div>
        <div className="font-semibold text-white mt-0.5">{value}</div>
        <div className="text-xs text-white/50 mt-0.5">{subtext}</div>
      </div>
    </div>
  );
}
