import { motion } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';
import { PenLine, Sliders, Sparkles } from 'lucide-react';

const STEPS = [
  {
    icon: PenLine,
    title: 'Describe',
    desc: 'Write what you imagine. Add references, styles, and a seed for reproducibility.',
  },
  {
    icon: Sliders,
    title: 'Dial in',
    desc: 'Pick an aspect ratio, style preset, and motion strength. Nova handles the rest.',
  },
  {
    icon: Sparkles,
    title: 'Generate',
    desc: 'Receive multiple variations in seconds. Iterate, download, or share with a link.',
  },
];

export default function HowItWorks() {
  return (
    <section className="container-x py-20">
      <SectionHeader
        eyebrow="How it works"
        title="From prompt to polished output in three steps"
      />
      <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
        {STEPS.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
            className="card relative p-6"
          >
            <div className="flex items-center justify-between">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-grad-soft text-primary-400">
                <s.icon size={18} />
              </div>
              <span className="font-mono text-xs text-muted">0{i + 1}</span>
            </div>
            <h3 className="mt-5 font-display text-xl font-semibold">{s.title}</h3>
            <p className="mt-2 text-sm text-muted">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
