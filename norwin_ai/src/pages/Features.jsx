import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Image as ImageIcon,
  Film,
  Palette,
  Zap,
  Shield,
  Layers,
  Workflow,
  Wand2,
  ArrowRight,
  Check,
} from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';
import SectionHeader from '../components/ui/SectionHeader';
import Button from '../components/ui/Button';

const BIG = [
  {
    icon: ImageIcon,
    title: 'Text-to-Image',
    blurb:
      'Generate on-brand images from short or long prompts. Nuanced control, high fidelity, and 4K upscaling built in.',
    points: [
      'Photoreal, cinematic, anime, 3D and more',
      'Aspect ratios from 1:1 to 9:16',
      'Negative prompts & reference images',
    ],
    image:
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80',
  },
  {
    icon: Film,
    title: 'Text-to-Video',
    blurb:
      'Direct short cinematic clips with motion presets, camera moves and frame interpolation for silky playback.',
    points: [
      'Up to 12-second clips in HD',
      'Motion presets: subtle, balanced, dynamic',
      'Loopable, vertical & widescreen support',
    ],
    image:
      'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1200&q=80',
    reverse: true,
  },
];

const SMALL = [
  {
    icon: Palette,
    title: 'Style customization',
    desc: 'Dial in looks with curated presets or create your own style packs for consistent results.',
  },
  {
    icon: Zap,
    title: 'Fast rendering',
    desc: 'Our inference fleet delivers most images in under 2 seconds — even during peak hours.',
  },
  {
    icon: Layers,
    title: 'Precise controls',
    desc: 'Seeds, CFG, negative prompts, aspect ratios, and reference images for reproducible output.',
  },
  {
    icon: Workflow,
    title: 'Team workspaces',
    desc: 'Shared projects, roles, and a unified asset library so your team stays in sync.',
  },
  {
    icon: Wand2,
    title: 'One-click variations',
    desc: 'Explore alternate compositions instantly without re-typing long prompts.',
  },
  {
    icon: Shield,
    title: 'Private by default',
    desc: 'Prompts and outputs are yours. We never train on customer data — ever.',
  },
];

export default function Features() {
  return (
    <PageTransition>
      <section className="container-x pt-16 pb-10 text-center">
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="chip mx-auto"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Features
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl"
        >
          Everything you need to <span className="gradient-text">create faster</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto mt-4 max-w-2xl text-muted"
        >
          Nova pairs state-of-the-art models with the ergonomics creative teams actually need.
          No clutter. Just the controls that matter.
        </motion.p>
      </section>

      <section className="container-x space-y-16 py-10">
        {BIG.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className={`grid items-center gap-8 md:grid-cols-2 ${
              f.reverse ? 'md:[&>*:first-child]:order-last' : ''
            }`}
          >
            <div>
              <div className="inline-flex items-center gap-2 text-primary-400">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-grad-soft">
                  <f.icon size={16} />
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.2em]">
                  {i === 0 ? 'Images' : 'Video'}
                </span>
              </div>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight">
                {f.title}
              </h2>
              <p className="mt-3 text-muted">{f.blurb}</p>
              <ul className="mt-5 space-y-2">
                {f.points.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm">
                    <span className="mt-0.5 grid h-4 w-4 place-items-center rounded-full bg-primary/15 text-primary-400">
                      <Check size={10} />
                    </span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <Button as={Link} to="/generate">
                  Try it now <ArrowRight size={14} />
                </Button>
              </div>
            </div>

            <motion.div
              whileHover={{ y: -4 }}
              className="card overflow-hidden p-0"
            >
              <img
                src={f.image}
                alt={f.title}
                className="h-80 w-full object-cover"
              />
            </motion.div>
          </motion.div>
        ))}
      </section>

      <section className="container-x py-16">
        <SectionHeader
          eyebrow="More capabilities"
          title="Built for professional creative workflows"
        />
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SMALL.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{ y: -3 }}
              className="card p-5 transition-colors hover:border-primary/30"
            >
              <div className="grid h-10 w-10 place-items-center rounded-lg border border-border bg-surface2 text-primary-400">
                <f.icon size={18} />
              </div>
              <h3 className="mt-4 font-display text-base font-semibold">{f.title}</h3>
              <p className="mt-1.5 text-sm text-muted">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
