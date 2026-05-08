import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageCircle, Phone, Send, Check } from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';
import Button from '../components/ui/Button';

const CHANNELS = [
  { icon: Mail, label: 'Email', value: 'hello@nova.ai' },
  { icon: MessageCircle, label: 'Chat', value: 'Mon–Fri · 9am–6pm' },
  { icon: Phone, label: 'Enterprise', value: '+1 (415) 555-0199' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 900);
  };

  return (
    <PageTransition>
      <section className="container-x pt-16 pb-10 text-center">
        <span className="chip mx-auto">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Contact
        </span>
        <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          Let's build something <span className="gradient-text">together</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-muted">
          Questions about Nova, enterprise pricing, or a partnership? We usually reply within a
          few hours.
        </p>
      </section>

      <section className="container-x pb-20">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="card lg:col-span-2 p-6"
          >
            <h2 className="font-display text-xl font-semibold">Reach us directly</h2>
            <p className="mt-1 text-sm text-muted">
              Or drop a message using the form. We'll route it to the right team.
            </p>
            <div className="mt-6 space-y-3">
              {CHANNELS.map((c) => (
                <div
                  key={c.label}
                  className="flex items-center gap-3 rounded-xl border border-border bg-surface2/60 p-3"
                >
                  <div className="grid h-9 w-9 place-items-center rounded-lg bg-grad-soft text-primary-400">
                    <c.icon size={16} />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted">
                      {c.label}
                    </div>
                    <div className="text-sm">{c.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-xl border border-border bg-grad-soft p-4 text-sm">
              <div className="font-medium">Looking for enterprise?</div>
              <p className="mt-1 text-muted">
                Talk to us about custom models, on-prem deployment, and volume discounts.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="card lg:col-span-3 p-6"
          >
            {submitted ? (
              <div className="flex min-h-[380px] flex-col items-center justify-center text-center">
                <div className="grid h-12 w-12 place-items-center rounded-full bg-emerald-500/15 text-emerald-400">
                  <Check size={22} />
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold">Message sent</h3>
                <p className="mt-1 max-w-sm text-sm text-muted">
                  Thanks, {form.name || 'friend'}. We'll get back to you at {form.email} shortly.
                </p>
                <Button
                  variant="secondary"
                  className="mt-5"
                  onClick={() => {
                    setForm({ name: '', email: '', message: '' });
                    setSubmitted(false);
                  }}
                >
                  Send another
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="label" htmlFor="name">
                      Name
                    </label>
                    <input
                      id="name"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="input"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div>
                    <label className="label" htmlFor="email">
                      Email
                    </label>
                    <input
                      id="email"
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="input"
                      placeholder="jane@company.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="label" htmlFor="message">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={6}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="input resize-none"
                    placeholder="Tell us what you're building…"
                  />
                </div>
                <div className="flex items-center justify-between gap-3 pt-2">
                  <p className="text-xs text-muted">
                    By submitting, you agree to our terms & privacy policy.
                  </p>
                  <Button type="submit" size="lg" disabled={submitting}>
                    {submitting ? 'Sending…' : (
                      <>
                        <Send size={14} /> Send message
                      </>
                    )}
                  </Button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}
