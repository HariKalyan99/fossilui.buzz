import { useMemo, useState } from "react";
import { Search, TrendingUp, UserPlus2 } from "lucide-react";
import { useApp } from "../../store/useApp";
import { Avatar } from "../ui/Avatar";
import { formatCount } from "../../lib/time";
import { generateTrendingTopics } from "../../lib/mockData";

export function RightRail() {
  const users = useApp((s) => s.users);
  const setSearchQuery = useApp((s) => s.setSearchQuery);
  const searchQuery = useApp((s) => s.searchQuery);
  const [follows, setFollows] = useState({});

  const topics = useMemo(() => generateTrendingTopics(), []);
  const suggested = useMemo(() => users.slice(0, 4), [users]);

  return (
    <aside className="hidden lg:flex sticky top-0 h-screen flex-col gap-4 px-4 py-5 w-[340px]">
      <label className="flex items-center gap-2 rounded-full border border-app bg-surface-2 px-4 py-2.5 focus-within:ring-2 focus-within:ring-brand-500/50">
        <Search size={16} className="text-faint" />
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search Glimpse"
          className="w-full bg-transparent text-sm outline-none placeholder:text-faint"
          aria-label="Search"
        />
      </label>

      <section className="rounded-2xl border border-app bg-surface p-4">
        <header className="flex items-center gap-2 mb-3">
          <TrendingUp size={16} className="text-brand-400" />
          <h3 className="text-sm font-semibold">Trending now</h3>
        </header>
        <ul className="divide-y divide-app">
          {topics.map((t) => (
            <li
              key={t.tag}
              className="py-2.5 first:pt-0 last:pb-0 cursor-pointer hover:bg-surface-2 -mx-2 px-2 rounded-lg transition-colors"
            >
              <div className="text-sm font-semibold">{t.tag}</div>
              <div className="text-xs text-faint">
                {formatCount(t.posts)} posts
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border border-app bg-surface p-4">
        <header className="flex items-center gap-2 mb-3">
          <UserPlus2 size={16} className="text-accent-500" />
          <h3 className="text-sm font-semibold">Who to follow</h3>
        </header>
        <ul className="space-y-3">
          {suggested.map((u) => (
            <li key={u.id} className="flex items-center gap-3">
              <Avatar src={u.avatar} name={u.name} size="md" />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold truncate">{u.name}</div>
                <div className="text-xs text-faint truncate">@{u.handle}</div>
              </div>
              <button
                onClick={() => setFollows((f) => ({ ...f, [u.id]: !f[u.id] }))}
                className={
                  "h-8 px-3 text-xs rounded-full font-semibold transition-colors " +
                  (follows[u.id]
                    ? "bg-surface-2 text-base-strong border border-app"
                    : "bg-base-strong text-[rgb(var(--bg))] hover:opacity-90 dark:bg-white dark:text-zinc-900")
                }
              >
                {follows[u.id] ? "Following" : "Follow"}
              </button>
            </li>
          ))}
        </ul>
      </section>

      <footer className="px-1 pb-2 text-xs text-faint">
        <div>
          © {new Date().getFullYear()} Glimpse · Built for the love of feeds.
        </div>
        <div className="mt-1 normal-case tracking-normal">
          Built by{" "}
          <a
            href="https://fossilui.buzz"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-base-strong hover:opacity-80"
          >
            <span className="text-base-strong">Fossil</span>
            <span className="text-grey-400 underline underline-offset-2">
              UI
            </span>
          </a>
        </div>
      </footer>
    </aside>
  );
}
