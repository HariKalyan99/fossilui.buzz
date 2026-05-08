import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  LayoutGrid,
  Image as ImageIcon,
  Film,
  Star,
  Trash2,
  Folder,
  Settings,
  CreditCard,
  Search,
  Download,
  Expand,
  Plus,
  TrendingUp,
} from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import { MOCK_IMAGES, MOCK_VIDEOS } from '../data/mock';
import { cn } from '../lib/cn';

const FILTERS = [
  { id: 'all', label: 'All', icon: LayoutGrid },
  { id: 'image', label: 'Images', icon: ImageIcon },
  { id: 'video', label: 'Videos', icon: Film },
  { id: 'starred', label: 'Starred', icon: Star },
];

const SIDEBAR = [
  { label: 'Library', icon: LayoutGrid, active: true },
  { label: 'Projects', icon: Folder },
  { label: 'Billing', icon: CreditCard },
  { label: 'Settings', icon: Settings },
  { label: 'Trash', icon: Trash2 },
];

const STATS = [
  { label: 'Generations', value: '248', trend: '+12%' },
  { label: 'Images', value: '186', trend: '+9%' },
  { label: 'Videos', value: '62', trend: '+38%' },
  { label: 'Credits left', value: '1,420', trend: 'Pro plan' },
];

export default function Dashboard() {
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [preview, setPreview] = useState(null);

  const items = useMemo(() => {
    const images = MOCK_IMAGES.map((x) => ({ ...x, type: 'image' }));
    const videos = MOCK_VIDEOS.map((x) => ({ ...x, type: 'video' }));
    const all = [...images, ...videos];
    let list = all;
    if (filter === 'image') list = images;
    if (filter === 'video') list = videos;
    if (filter === 'starred') list = all.slice(0, 4);
    if (query) {
      const q = query.toLowerCase();
      list = list.filter((i) => i.prompt.toLowerCase().includes(q));
    }
    return list;
  }, [filter, query]);

  return (
    <PageTransition>
      <section className="container-x py-8">
        <div className="grid grid-cols-12 gap-6">
          <DashboardSidebar />

          <main className="col-span-12 lg:col-span-9 xl:col-span-10">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h1 className="font-display text-3xl font-semibold tracking-tight">
                  Welcome back, Alex
                </h1>
                <p className="mt-1 text-muted">
                  Here's everything you've created with Nova.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search
                    size={14}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
                  />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search prompts…"
                    className="input py-2 pl-9 pr-3 w-48 sm:w-64"
                  />
                </div>
                <Button as={Link} to="/generate">
                  <Plus size={14} />
                  New generation
                </Button>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
              {STATS.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.04 }}
                  className="card p-4"
                >
                  <div className="text-xs uppercase tracking-wider text-muted">{s.label}</div>
                  <div className="mt-1 flex items-baseline justify-between">
                    <span className="font-display text-2xl font-semibold">{s.value}</span>
                    <span className="inline-flex items-center gap-1 text-xs text-emerald-400">
                      <TrendingUp size={12} />
                      {s.trend}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-2">
              {FILTERS.map((f) => {
                const active = filter === f.id;
                return (
                  <button
                    key={f.id}
                    onClick={() => setFilter(f.id)}
                    className={cn(
                      'relative inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm transition-colors',
                      active
                        ? 'border-primary/40 bg-primary/10 text-text'
                        : 'border-border bg-surface text-muted hover:text-text'
                    )}
                  >
                    <f.icon size={14} />
                    {f.label}
                  </button>
                );
              })}
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              <AnimatePresence mode="popLayout">
                {items.map((it, i) => (
                  <motion.div
                    key={it.id + it.type}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.3, delay: i * 0.02 }}
                    className="group relative overflow-hidden rounded-xl border border-border bg-surface"
                  >
                    <button
                      onClick={() => setPreview(it)}
                      className="block w-full text-left"
                    >
                      <div className="relative aspect-[4/5] w-full overflow-hidden">
                        {it.type === 'image' ? (
                          <img
                            src={it.url}
                            alt={it.prompt}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        ) : (
                          <video
                            src={it.url}
                            poster={it.poster}
                            muted
                            loop
                            playsInline
                            className="h-full w-full object-cover"
                            onMouseEnter={(e) => e.currentTarget.play()}
                            onMouseLeave={(e) => e.currentTarget.pause()}
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                        <span
                          className={cn(
                            'absolute left-2 top-2 chip backdrop-blur-sm',
                            it.type === 'image'
                              ? 'bg-primary/20 border-primary/30 text-primary-400'
                              : 'bg-secondary/20 border-secondary/30 text-secondary-400'
                          )}
                        >
                          {it.type === 'image' ? (
                            <ImageIcon size={10} />
                          ) : (
                            <Film size={10} />
                          )}
                          {it.type}
                        </span>

                        <div className="absolute bottom-2 left-2 right-2">
                          <p className="line-clamp-2 text-xs text-white/95">{it.prompt}</p>
                          <p className="mt-1 text-[10px] uppercase tracking-wider text-white/60">
                            {it.createdAt}
                          </p>
                        </div>
                      </div>
                    </button>

                    <div className="absolute right-2 top-2 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                      <button
                        onClick={() => setPreview(it)}
                        className="grid h-7 w-7 place-items-center rounded-md border border-white/10 bg-black/60 text-white backdrop-blur hover:bg-black/80"
                        title="Preview"
                      >
                        <Expand size={12} />
                      </button>
                      <button
                        className="grid h-7 w-7 place-items-center rounded-md border border-white/10 bg-black/60 text-white backdrop-blur hover:bg-black/80"
                        title="Download"
                      >
                        <Download size={12} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {items.length === 0 && (
              <div className="card mt-6 flex flex-col items-center justify-center p-16 text-center">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-grad-soft text-primary-400">
                  <LayoutGrid size={20} />
                </div>
                <h3 className="mt-4 font-display text-lg">No results</h3>
                <p className="mt-1 max-w-sm text-sm text-muted">
                  Try clearing the search or switching to a different filter.
                </p>
              </div>
            )}
          </main>
        </div>
      </section>

      <Modal
        open={!!preview}
        onClose={() => setPreview(null)}
        title={preview?.prompt?.slice(0, 60) || ''}
      >
        {preview &&
          (preview.type === 'image' ? (
            <img
              src={preview.url}
              alt={preview.prompt}
              className="max-h-[80vh] w-full bg-black object-contain"
            />
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

function DashboardSidebar() {
  return (
    <aside className="col-span-12 lg:col-span-3 xl:col-span-2">
      <div className="card sticky top-20 p-3">
        <nav className="flex flex-col gap-0.5">
          {SIDEBAR.map((item) => (
            <button
              key={item.label}
              className={cn(
                'flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors',
                item.active
                  ? 'bg-primary/10 text-text'
                  : 'text-muted hover:bg-surface2 hover:text-text'
              )}
            >
              <item.icon size={14} />
              {item.label}
              {item.active && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />
              )}
            </button>
          ))}
        </nav>
        <div className="mt-4 rounded-xl border border-border bg-grad-soft p-4">
          <div className="text-xs font-semibold">Upgrade to Pro</div>
          <p className="mt-1 text-xs text-muted">
            Unlock 4K upscales, longer videos, and priority rendering.
          </p>
          <Button as={Link} to="/pricing" size="sm" className="mt-3 w-full">
            See plans
          </Button>
        </div>
      </div>
    </aside>
  );
}
