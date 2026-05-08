import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Flame, Search, Hash, UserPlus2 } from "lucide-react";
import { useApp } from "../store/useApp";
import { generateTrendingTopics } from "../lib/mockData";
import { Avatar } from "../components/ui/Avatar";
import { formatCount } from "../lib/time";
import { cn } from "../lib/cn";

const CATEGORIES = ["For you", "Design", "Tech", "Photo", "Music", "Books", "Food"];

export default function Explore() {
  const api = useApp((s) => s.api);
  const users = useApp((s) => s.users);
  const searchQuery = useApp((s) => s.searchQuery);
  const setSearchQuery = useApp((s) => s.setSearchQuery);
  const [cat, setCat] = useState("For you");
  const [follows, setFollows] = useState({});

  const allPosts = api.state.posts;
  const topics = useMemo(() => generateTrendingTopics(), []);

  const matchingPosts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    let list = allPosts.filter((p) => p.media);
    if (q) {
      list = list.filter((p) => p.text.toLowerCase().includes(q));
    }
    // Sort by engagement to fake "trending"
    return list
      .slice()
      .sort((a, b) => b.likes + b.comments * 2 - (a.likes + a.comments * 2))
      .slice(0, 18);
  }, [allPosts, searchQuery]);

  const matchingUsers = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return users.slice(0, 6);
    return users
      .filter(
        (u) =>
          u.name.toLowerCase().includes(q) ||
          u.handle.toLowerCase().includes(q)
      )
      .slice(0, 8);
  }, [users, searchQuery]);

  return (
    <div className="px-4 md:px-6 pt-4 md:pt-6 space-y-6">
      <header>
        <h1 className="text-2xl font-extrabold tracking-tight">Explore</h1>
        <p className="text-sm text-faint">
          Trending posts, fresh creators, and hashtags worth a look.
        </p>
      </header>

      {/* Big search */}
      <label className="flex items-center gap-3 rounded-2xl border border-app bg-surface px-4 py-3 focus-within:ring-2 focus-within:ring-brand-500/50">
        <Search size={18} className="text-soft" />
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search posts, people, hashtags"
          className="w-full bg-transparent text-base outline-none placeholder:text-faint"
        />
      </label>

      {/* Category pills */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={cn(
              "shrink-0 rounded-full px-4 py-1.5 text-sm font-medium border transition-colors",
              cat === c
                ? "gradient-brand text-white border-transparent"
                : "border-app bg-surface text-soft hover:text-base-strong"
            )}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Trending hashtags */}
      <section>
        <header className="flex items-center gap-2 mb-3">
          <Flame size={16} className="text-rose-400" />
          <h2 className="font-semibold">Trending hashtags</h2>
        </header>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {topics.map((t) => (
            <button
              key={t.tag}
              className="flex items-center gap-3 rounded-xl border border-app bg-surface px-4 py-3 text-left hover:border-[rgb(var(--text-faint))]/40 transition-colors"
            >
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-500/10 text-brand-300">
                <Hash size={16} />
              </span>
              <div>
                <div className="text-sm font-semibold">{t.tag}</div>
                <div className="text-xs text-faint">
                  {formatCount(t.posts)} posts
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Suggested creators */}
      <section>
        <header className="flex items-center gap-2 mb-3">
          <UserPlus2 size={16} className="text-accent-500" />
          <h2 className="font-semibold">Creators to follow</h2>
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {matchingUsers.map((u) => (
            <div
              key={u.id}
              className="flex items-center gap-3 rounded-xl border border-app bg-surface p-3"
            >
              <Avatar src={u.avatar} name={u.name} size="lg" />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold truncate">{u.name}</div>
                <div className="text-xs text-faint truncate">@{u.handle}</div>
                <div className="text-xs text-soft mt-0.5 line-clamp-1">
                  {u.bio}
                </div>
              </div>
              <button
                onClick={() =>
                  setFollows((f) => ({ ...f, [u.id]: !f[u.id] }))
                }
                className={cn(
                  "h-9 px-3 text-xs rounded-full font-semibold transition-colors",
                  follows[u.id]
                    ? "bg-surface-2 text-base-strong border border-app"
                    : "bg-base-strong text-[rgb(var(--bg))] dark:bg-white dark:text-zinc-900"
                )}
              >
                {follows[u.id] ? "Following" : "Follow"}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Trending grid */}
      <section>
        <header className="flex items-center justify-between mb-3">
          <h2 className="font-semibold">Top posts this week</h2>
          <span className="text-xs text-faint">
            {matchingPosts.length} results
          </span>
        </header>
        <div className="grid grid-cols-3 gap-1.5 md:gap-2">
          {matchingPosts.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.02 }}
              className={cn(
                "relative aspect-square overflow-hidden rounded-md bg-surface-2 group cursor-pointer",
                i % 7 === 0 && "row-span-2 col-span-2 aspect-auto"
              )}
            >
              {p.media?.kind === "image" ? (
                <img
                  src={p.media.url}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform group-hover:scale-[1.04]"
                />
              ) : (
                <video
                  src={p.media.url}
                  poster={p.media.poster}
                  className="h-full w-full object-cover"
                  muted
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-2 left-2 right-2 text-white text-xs flex items-center gap-3">
                  <span>♥ {formatCount(p.likes)}</span>
                  <span>💬 {formatCount(p.comments)}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
