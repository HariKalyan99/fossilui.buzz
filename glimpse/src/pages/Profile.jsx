import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { BadgeCheck, Calendar, MapPin, Settings2, Grid3x3, FileText, Bookmark } from "lucide-react";
import { useApp } from "../store/useApp";
import { Avatar } from "../components/ui/Avatar";
import { Button } from "../components/ui/Button";
import { PostCard } from "../components/feed/PostCard";
import { formatCount } from "../lib/time";
import { cn } from "../lib/cn";

const TABS = [
  { key: "posts", label: "Posts", icon: FileText },
  { key: "media", label: "Media", icon: Grid3x3 },
  { key: "saved", label: "Saved", icon: Bookmark },
];

export default function Profile() {
  const me = useApp((s) => s.me);
  const api = useApp((s) => s.api);
  const feed = useApp((s) => s.feed);
  const [tab, setTab] = useState("posts");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let alive = true;
    api.fetchUserPosts("me").then((p) => alive && setPosts(p));
    return () => {
      alive = false;
    };
  }, [api]);

  // Combine fetched + locally created posts (from feed, by me)
  const myPosts = useMemo(() => {
    const localMine = feed.posts.filter((p) => p.authorId === "me");
    const ids = new Set();
    return [...localMine, ...posts].filter((p) => {
      if (ids.has(p.id)) return false;
      ids.add(p.id);
      return true;
    });
  }, [feed.posts, posts]);

  const mediaPosts = myPosts.filter((p) => p.media);
  const savedPosts = feed.posts.filter((p) => p.bookmarked);

  return (
    <div>
      {/* Cover */}
      <div className="relative h-40 md:h-56 gradient-brand">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_50%)]" />
      </div>

      {/* Header */}
      <div className="px-4 md:px-6 -mt-12 md:-mt-16">
        <div className="flex items-end justify-between gap-4">
          <Avatar
            src={me.avatar}
            name={me.name}
            size="2xl"
            className="ring-4 ring-[rgb(var(--bg))]"
          />
          <div className="pb-2">
            <Button variant="outline" size="sm">
              <Settings2 size={14} /> Edit profile
            </Button>
          </div>
        </div>

        <div className="mt-4">
          <h1 className="text-2xl font-extrabold flex items-center gap-1.5">
            {me.name}
            {me.verified && <BadgeCheck size={20} className="text-brand-400" />}
          </h1>
          <p className="text-faint text-sm">@{me.handle}</p>
          <p className="mt-3 text-[15px] leading-relaxed max-w-prose">
            {me.bio}
          </p>
          <div className="mt-3 flex items-center gap-4 text-xs text-faint flex-wrap">
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={12} /> Earth
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar size={12} /> Joined Glimpse · 2 months ago
            </span>
          </div>
          <div className="mt-3 flex items-center gap-5 text-sm">
            <span>
              <span className="font-bold">{formatCount(me.following)}</span>{" "}
              <span className="text-faint">following</span>
            </span>
            <span>
              <span className="font-bold">{formatCount(me.followers)}</span>{" "}
              <span className="text-faint">followers</span>
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-6 flex gap-1 border-b border-app -mx-4 md:-mx-6 px-4 md:px-6">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={cn(
                "relative inline-flex items-center gap-2 px-4 py-3 text-sm font-medium",
                tab === t.key ? "text-base-strong" : "text-faint hover:text-base-strong"
              )}
            >
              <t.icon size={14} />
              {t.label}
              {tab === t.key && (
                <motion.span
                  layoutId="profile-tab"
                  className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full gradient-brand"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-4 md:px-6 mt-4 space-y-4">
        {tab === "posts" &&
          (myPosts.length === 0 ? (
            <EmptyState
              title="No posts yet"
              text="Share your first thought to get started."
            />
          ) : (
            myPosts.map((p) => <PostCard key={p.id} post={p} />)
          ))}

        {tab === "media" && (
          mediaPosts.length === 0 ? (
            <EmptyState
              title="No media yet"
              text="Photos and videos you share will appear here."
            />
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-1.5">
              {mediaPosts.map((p) => (
                <div
                  key={p.id}
                  className="aspect-square overflow-hidden rounded-md bg-surface-2"
                >
                  {p.media.kind === "image" ? (
                    <img
                      src={p.media.url}
                      alt=""
                      className="h-full w-full object-cover hover:scale-[1.02] transition-transform"
                      loading="lazy"
                    />
                  ) : (
                    <video
                      src={p.media.url}
                      poster={p.media.poster}
                      className="h-full w-full object-cover"
                      muted
                    />
                  )}
                </div>
              ))}
            </div>
          )
        )}

        {tab === "saved" &&
          (savedPosts.length === 0 ? (
            <EmptyState
              title="Nothing saved yet"
              text="Tap the bookmark icon to save posts to revisit later."
            />
          ) : (
            savedPosts.map((p) => <PostCard key={p.id} post={p} />)
          ))}
      </div>
    </div>
  );
}

function EmptyState({ title, text }) {
  return (
    <div className="text-center py-16 text-soft">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-faint mt-1">{text}</p>
    </div>
  );
}
