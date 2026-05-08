import { motion } from 'framer-motion';
import PageTransition from '../components/layout/PageTransition';
import SectionHeader from '../components/ui/SectionHeader';

const STATS = [
  { value: '2.4M+', label: 'Creations generated' },
  { value: '180+', label: 'Countries served' },
  { value: '99.98%', label: 'Uptime (last 90d)' },
  { value: '< 2s', label: 'Avg. image latency' },
];

const VALUES = [
  {
    title: 'Creativity first',
    desc: 'We design tools that disappear into your process, so ideas flow without friction.',
  },
  {
    title: 'Privacy by default',
    desc: 'Your prompts and outputs belong to you. We never train on customer data.',
  },
  {
    title: 'Honest craft',
    desc: 'No dark patterns, no lock-in, no hype — just reliable tools built with care.',
  },
];

export default function About() {
  return (
    <PageTransition>
      <section className="container-x pt-16 pb-10 text-center">
        <span className="chip mx-auto">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Our story
        </span>
        <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          Building the <span className="gradient-text">creative layer</span> of the internet
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted">
          Nova started with a simple question: what if every team had a creative studio as
          fluent and fast as their imagination? We're a small team building the answer.
        </p>
      </section>

      <section className="container-x py-10">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="card p-5 text-center"
            >
              <div className="font-display text-2xl font-semibold">{s.value}</div>
              <div className="mt-1 text-xs uppercase tracking-wider text-muted">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="container-x py-16">
        <SectionHeader eyebrow="Values" title="What we believe" />
        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
          {VALUES.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="card p-6"
            >
              <h3 className="font-display text-lg font-semibold">{v.title}</h3>
              <p className="mt-2 text-sm text-muted">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
