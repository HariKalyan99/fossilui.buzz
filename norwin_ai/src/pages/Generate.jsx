import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Wand2,
  Download,
  RefreshCw,
  Image as ImageIcon,
  Film,
  Sparkles,
  Expand,
  Copy,
  Heart,
} from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';
import Button from '../components/ui/Button';
import Select from '../components/ui/Select';
import Skeleton from '../components/ui/Skeleton';
import Modal from '../components/ui/Modal';
import {
  ASPECT_RATIOS,
  MOCK_IMAGES,
  MOCK_VIDEOS,
  STYLE_PRESETS,
  VIDEO_DURATIONS,
  VIDEO_MOTION,
} from '../data/mock';
import { cn } from '../lib/cn';

const TABS = [
  { id: 'image', label: 'Image Generation', icon: ImageIcon },
  { id: 'video', label: 'Video Generation', icon: Film },
];

const SAMPLE_PROMPTS = {
  image: [
    'A portrait of an astronaut in a field of bioluminescent flowers, 85mm, cinematic',
    'Isometric micro-world of a cozy coffee shop, tilt-shift, tiny people',
    'Surreal floating islands above a sea of clouds at golden hour, volumetric light',
  ],
  video: [
    'Slow dolly through a misty forest at dawn, cinematic, 24fps',
    'Driving through a neon-lit city at night, rain on windshield, wide-angle',
    'Aerial shot of ocean waves at golden hour, gentle motion',
  ],
};

export default function Generate() {
  const [tab, setTab] = useState('image');
  const [prompt, setPrompt] = useState(SAMPLE_PROMPTS.image[0]);
  const [style, setStyle] = useState(STYLE_PRESETS[0]);
  const [ratio, setRatio] = useState(ASPECT_RATIOS[0]);
  const [duration, setDuration] = useState(VIDEO_DURATIONS[1]);
  const [motionLevel, setMotionLevel] = useState(VIDEO_MOTION[1]);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(MOCK_IMAGES.slice(0, 4));
  const [preview, setPreview] = useState(null);

  const placeholderCount = tab === 'image' ? 4 : 2;

  const presetsForTab = useMemo(
    () => (tab === 'image' ? MOCK_IMAGES : MOCK_VIDEOS),
    [tab]
  );

  const handleTab = (id) => {
    setTab(id);
    setPrompt(SAMPLE_PROMPTS[id][0]);
    setResults(id === 'image' ? MOCK_IMAGES.slice(0, 4) : MOCK_VIDEOS.slice(0, 2));
  };

  const handleGenerate = () => {
    setLoading(true);
    setResults([]);
    setTimeout(() => {
      const shuffled = [...presetsForTab].sort(() => Math.random() - 0.5);
      setResults(shuffled.slice(0, placeholderCount));
      setLoading(false);
    }, 1400);
  };

  const handleRegenerate = () => handleGenerate();

  return (
    <PageTransition>
      <section className="container-x py-10">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Studio
            </h1>
            <p className="mt-1 text-muted">Craft your prompt, pick a style, generate.</p>
          </div>

          <div className="flex items-center gap-1 rounded-xl border border-border bg-surface p-1">
            {TABS.map((t) => {
              const active = tab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => handleTab(t.id)}
                  className={cn(
                    'relative flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors',
                    active ? 'text-text' : 'text-muted hover:text-text'
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="generate-tab-bg"
                      className="absolute inset-0 rounded-lg bg-grad-primary"
                      transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                    />
                  )}
                  <t.icon size={14} className="relative" />
                  <span className="relative">{t.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-12 gap-6">
          <aside className="col-span-12 lg:col-span-4 xl:col-span-3">
            <div className="card sticky top-20 p-5">
              <div className="label">Prompt</div>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={5}
                placeholder={`Describe the ${tab} you want to create...`}
                className="input resize-none font-mono text-[13px] leading-relaxed"
              />
              <div className="mt-2 flex flex-wrap gap-1.5">
                {SAMPLE_PROMPTS[tab].map((p) => (
                  <button
                    key={p}
                    onClick={() => setPrompt(p)}
                    className="chip max-w-full truncate transition-colors hover:border-primary/40 hover:text-text"
                    title={p}
                  >
                    <Sparkles size={10} />
                    <span className="truncate">{p.slice(0, 40)}…</span>
                  </button>
                ))}
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <Select
                  label="Style"
                  value={style}
                  onChange={setStyle}
                  options={STYLE_PRESETS}
                />
                {tab === 'image' ? (
                  <Select
                    label="Aspect"
                    value={ratio}
                    onChange={setRatio}
                    options={ASPECT_RATIOS}
                  />
                ) : (
                  <Select
                    label="Duration"
                    value={duration}
                    onChange={setDuration}
                    options={VIDEO_DURATIONS}
                  />
                )}
              </div>

              {tab === 'video' && (
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <Select
                    label="Motion"
                    value={motionLevel}
                    onChange={setMotionLevel}
                    options={VIDEO_MOTION}
                  />
                  <Select
                    label="Aspect"
                    value={ratio}
                    onChange={setRatio}
                    options={['16:9', '9:16', '1:1']}
                  />
                </div>
              )}

              <div className="mt-5 space-y-3 border-t border-border pt-5 text-xs text-muted">
                <div className="flex items-center justify-between">
                  <span>Quality</span>
                  <span className="text-text">High</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Seed</span>
                  <span className="font-mono text-text">random</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Cost</span>
                  <span className="text-text">{tab === 'image' ? '1' : '6'} credits</span>
                </div>
              </div>

              <Button
                onClick={handleGenerate}
                disabled={loading || prompt.trim().length < 4}
                className="mt-5 w-full"
                size="lg"
              >
                {loading ? (
                  <>
                    <RefreshCw size={16} className="animate-spin" />
                    Generating…
                  </>
                ) : (
                  <>
                    <Wand2 size={16} />
                    Generate
                  </>
                )}
              </Button>
            </div>
          </aside>

          <div className="col-span-12 lg:col-span-8 xl:col-span-9">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="font-display text-lg font-semibold">Results</h2>
                <span className="chip">{loading ? 'Rendering…' : `${results.length} items`}</span>
              </div>
              <Button
                onClick={handleRegenerate}
                disabled={loading}
                variant="secondary"
                size="sm"
              >
                <RefreshCw size={14} />
                Regenerate
              </Button>
            </div>

            <div
              className={cn(
                'grid gap-4',
                tab === 'image'
                  ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3'
                  : 'grid-cols-1 md:grid-cols-2'
              )}
            >
              <AnimatePresence mode="popLayout">
                {loading
                  ? Array.from({ length: placeholderCount }).map((_, i) => (
                      <motion.div
                        key={`sk-${i}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="card overflow-hidden p-0"
                      >
                        <Skeleton
                          className={cn(
                            'w-full',
                            tab === 'image' ? 'aspect-[4/5]' : 'aspect-video'
                          )}
                        />
                        <div className="space-y-2 p-4">
                          <Skeleton className="h-3 w-2/3" />
                          <Skeleton className="h-3 w-1/2" />
                        </div>
                      </motion.div>
                    ))
                  : results.map((r, i) => (
                      <motion.div
                        key={r.id}
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.35, delay: i * 0.06 }}
                        className="group card overflow-hidden p-0"
                      >
                        <div className="relative">
                          {tab === 'image' ? (
                            <img
                              src={r.url}
                              alt={r.prompt}
                              className={cn(
                                'w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]',
                                'aspect-[4/5]'
                              )}
                            />
                          ) : (
                            <video
                              src={r.url}
                              poster={r.poster}
                              muted
                              loop
                              playsInline
                              autoPlay
                              className="aspect-video w-full object-cover"
                            />
                          )}

                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

                          <div className="absolute right-2 top-2 flex gap-1.5 opacity-0 transition-opacity group-hover:opacity-100">
                            <IconAction
                              icon={Expand}
                              label="Preview"
                              onClick={() => setPreview({ ...r, type: tab })}
                            />
                            <IconAction icon={Heart} label="Save" />
                            <IconAction icon={Download} label="Download" />
                          </div>
                        </div>
                        <div className="flex items-center justify-between gap-2 p-4">
                          <div className="min-w-0">
                            <div className="truncate text-sm text-text/90">{r.prompt}</div>
                            <div className="mt-0.5 flex items-center gap-2 text-xs text-muted">
                              <span>{r.style}</span>
                              <span className="h-1 w-1 rounded-full bg-border" />
                              <span>{r.ratio || r.duration}</span>
                            </div>
                          </div>
                          <button
                            className="shrink-0 rounded-lg border border-border p-2 text-muted transition-colors hover:border-primary/40 hover:text-text"
                            title="Copy prompt"
                            onClick={() => navigator.clipboard?.writeText(r.prompt)}
                          >
                            <Copy size={14} />
                          </button>
                        </div>
                      </motion.div>
                    ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      <Modal
        open={!!preview}
        onClose={() => setPreview(null)}
        title={preview?.prompt?.slice(0, 60) + (preview?.prompt?.length > 60 ? '…' : '') || ''}
      >
        {preview &&
          (preview.type === 'image' ? (
            <img src={preview.url} alt={preview.prompt} className="max-h-[80vh] w-full object-contain bg-black" />
          ) : (
            <video
              src={preview.url}
              poster={preview.poster}
              controls
              autoPlay
              className="max-h-[80vh] w-full bg-black"
            />
          ))}
      </Modal>
    </PageTransition>
  );
}

function IconAction({ icon: Icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      title={label}
      className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 bg-black/50 text-white backdrop-blur-md transition-colors hover:bg-black/70"
    >
      <Icon size={14} />
    </button>
  );
}
