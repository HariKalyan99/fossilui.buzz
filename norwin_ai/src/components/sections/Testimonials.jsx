import { motion } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';

const QUOTES = [
  {
    quote:
      'Nova replaced three tools in our creative pipeline. We storyboard a campaign in a morning now.',
    name: 'Maya Chen',
    role: 'Creative Director, Lumen',
  },
  {
    quote:
      'The motion controls finally make AI video feel directed, not accidental. Huge unlock for us.',
    name: 'Diego Alvarez',
    role: 'Head of Video, Helios',
  },
  {
    quote:
      'Onboarding the whole team took ten minutes. The shared workspaces are exactly what we needed.',
    name: 'Priya Raman',
    role: 'Design Lead, Quanta',
  },
];

export default function Testimonials() {
  return (
    <section className="container-x py-20">
      <SectionHeader eyebrow="Loved by creatives" title="What teams say about Nova" />
      <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
        {QUOTES.map((q, i) => (
          <motion.figure
            key={q.name}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
            className="card p-6"
          >
            <svg
              className="h-6 w-6 text-primary-400/60"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden
            >
              <path d="M7 7h4v4H8c0 2 1 3 3 3v3c-4 0-6-2-6-6V7zm10 0h4v4h-3c0 2 1 3 3 3v3c-4 0-6-2-6-6V7z" />
            </svg>
            <blockquote className="mt-3 text-sm leading-relaxed text-text/90">
              “{q.quote}”
            </blockquote>
            <figcaption className="mt-5 flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-grad-primary font-semibold text-white">
                {q.name.charAt(0)}
              </div>
              <div>
                <div className="text-sm font-medium">{q.name}</div>
                <div className="text-xs text-muted">{q.role}</div>
              </div>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
