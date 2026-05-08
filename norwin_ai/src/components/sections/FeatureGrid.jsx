import { motion } from 'framer-motion';
import {
  ImageIcon,
  Film,
  Wand2,
  Zap,
  Palette,
  Shield,
  Layers,
  Workflow,
} from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';

const FEATURES = [
  {
    icon: ImageIcon,
    title: 'Text-to-Image',
    desc: 'Generate production-ready images in seconds with nuanced prompt control.',
  },
  {
    icon: Film,
    title: 'Text-to-Video',
    desc: 'Direct short cinematic clips with camera moves, styles, and motion strength.',
  },
  {
    icon: Palette,
    title: 'Style presets',
    desc: 'Dial in a look — cinematic, anime, 3D, photoreal — in a single click.',
  },
  {
    icon: Zap,
    title: 'Fast rendering',
    desc: 'Optimized inference cluster delivers results in under 2 seconds on average.',
  },
  {
    icon: Layers,
    title: 'Creative control',
    desc: 'Seeds, aspect ratio, negative prompts, and reference images for precision.',
  },
  {
    icon: Workflow,
    title: 'Workspaces',
    desc: 'Organize runs into projects, share with teammates, and keep iteration tidy.',
  },
  {
    icon: Wand2,
    title: 'One-click variations',
    desc: 'Explore alternate compositions without re-typing the same long prompt.',
  },
  {
    icon: Shield,
    title: 'Private by default',
    desc: 'Your prompts and outputs are yours — never used for training, ever.',
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};
const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function FeatureGrid() {
  return (
    <section className="container-x py-20">
      <SectionHeader
        eyebrow="Capabilities"
        title="A creative studio that actually thinks with you"
        description="Nova brings image and video generation under one roof with the polish and controls creative teams expect."
      />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {FEATURES.map((f) => (
          <motion.div
            key={f.title}
            variants={item}
            whileHover={{ y: -3 }}
            className="group card p-5 transition-colors hover:border-primary/30"
          >
            <div className="grid h-10 w-10 place-items-center rounded-lg border border-border bg-surface2 text-primary-400 transition-all group-hover:border-primary/40 group-hover:text-primary-500 group-hover:shadow-glow">
              <f.icon size={18} />
            </div>
            <h3 className="mt-4 font-display text-base font-semibold">{f.title}</h3>
            <p className="mt-1.5 text-sm text-muted">{f.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
