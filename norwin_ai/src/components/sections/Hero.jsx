import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Wand2, PlayCircle } from 'lucide-react';
import Button from '../ui/Button';

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-grid-faint [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl"
      />

      <div className="container-x pt-20 pb-10 sm:pt-28 sm:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto flex max-w-3xl flex-col items-center text-center"
        >
          <span className="chip">
            <Sparkles size={12} className="text-primary-400" />
            Introducing Nova v2 — faster diffusion, richer motion
          </span>

          <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
            Turn prompts into{' '}
            <span className="gradient-text">stunning visuals</span>
            <br className="hidden sm:block" /> and cinematic videos.
          </h1>

          <p className="mt-5 max-w-xl text-base text-muted sm:text-lg">
            Nova is the AI studio for creators and teams. Generate on-brand imagery,
            direct motion, and iterate at the speed of thought — all in one workspace.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button as={Link} to="/generate" size="lg">
              <Wand2 size={16} />
              Start generating
              <ArrowRight size={16} />
            </Button>
            <Button as={Link} to="/features" variant="secondary" size="lg">
              <PlayCircle size={16} />
              See how it works
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted">
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> No credit card required
            </span>
            <span>Free tier • 50 generations / day</span>
            <span>SOC 2 ready</span>
          </div>
        </motion.div>

        <HeroShowcase />
      </div>
    </section>
  );
}

function HeroShowcase() {
  const tiles = [
    {
      url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80',
      prompt: 'Floating islands at golden hour',
    },
    {
      url: 'https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?auto=format&fit=crop&w=600&q=80',
      prompt: 'Neon cyberpunk alley, rain',
    },
    {
      url: 'https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=600&q=80',
      prompt: 'Astronaut in bioluminescent field',
    },
    {
      url: 'https://images.unsplash.com/photo-1604079628040-94301bb21b91?auto=format&fit=crop&w=600&q=80',
      prompt: 'Isometric cozy coffee shop',
    },
    {
      url: 'https://images.unsplash.com/photo-1518544801976-3e188ea7ea06?auto=format&fit=crop&w=600&q=80',
      prompt: 'Anime cityscape, violet sunset',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.15 }}
      className="relative mx-auto mt-16 max-w-5xl"
    >
      <div className="card overflow-hidden p-4 sm:p-5">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div className="flex items-center gap-2 text-xs text-muted">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
            <span className="ml-2 font-mono">nova.studio / generate</span>
          </div>
          <span className="chip">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" /> Live preview
          </span>
        </div>

        <div className="mt-4 grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-4">
            <div className="label">Prompt</div>
            <div className="rounded-lg border border-border bg-surface2 p-3 font-mono text-xs leading-relaxed text-text/90">
              <span className="text-secondary-400">/imagine</span> floating islands above a sea of
              clouds at golden hour, volumetric light, cinematic{' '}
              <span className="animate-pulse text-primary-400">▍</span>
            </div>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {['Cinematic', '4:5', 'High detail', 'Seed 42'].map((t) => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-4 flex items-center gap-2">
              <button className="btn-primary flex-1">
                <Wand2 size={14} /> Generate
              </button>
              <button className="btn-secondary">
                <Sparkles size={14} />
              </button>
            </div>
          </div>

          <div className="col-span-12 md:col-span-8">
            <div className="grid grid-cols-3 gap-3">
              {tiles.slice(0, 3).map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 + i * 0.1 }}
                  className="group relative aspect-[4/5] overflow-hidden rounded-xl border border-border"
                >
                  <img
                    src={t.url}
                    alt={t.prompt}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0" />
                  <div className="absolute bottom-2 left-2 right-2 truncate text-xs text-white/90">
                    {t.prompt}
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {tiles.slice(3, 5).map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.55 + i * 0.1 }}
                  className="group relative aspect-[16/9] overflow-hidden rounded-xl border border-border"
                >
                  <img
                    src={t.url}
                    alt={t.prompt}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0" />
                  <div className="absolute bottom-2 left-2 right-2 truncate text-xs text-white/90">
                    {t.prompt}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <motion.div
        aria-hidden
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -right-4 -top-6 hidden rounded-xl border border-border bg-surface/90 px-3 py-2 text-xs text-muted shadow-card backdrop-blur md:block"
      >
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Rendered in 1.8s
        </div>
      </motion.div>

      <motion.div
        aria-hidden
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -left-4 bottom-6 hidden rounded-xl border border-border bg-surface/90 px-3 py-2 text-xs text-muted shadow-card backdrop-blur md:block"
      >
        <div className="flex items-center gap-2">
          <Sparkles size={12} className="text-secondary-400" />
          4K upscale available
        </div>
      </motion.div>
    </motion.div>
  );
}
