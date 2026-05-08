import { useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { useApp } from "../../store/useApp";
import { PostCard } from "./PostCard";
import { PostSkeleton } from "../ui/Skeleton";
import { InlineComposer } from "./InlineComposer";
import { CommentDrawer } from "./CommentDrawer";

export function Feed() {
  const feed = useApp((s) => s.feed);
  const loadInitialFeed = useApp((s) => s.loadInitialFeed);
  const loadMore = useApp((s) => s.loadMore);
  const sentinelRef = useRef(null);

  useEffect(() => {
    loadInitialFeed();
  }, [loadInitialFeed]);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore();
      },
      { rootMargin: "400px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [loadMore]);

  return (
    <div className="relative">
      <div className="px-4 md:px-6 pt-4 md:pt-6">
        <header className="hidden md:flex items-center justify-between mb-4">
          <h1 className="text-2xl font-extrabold tracking-tight">Home</h1>
          <span className="text-xs text-faint">Updated just now</span>
        </header>

        <div className="space-y-4">
          <InlineComposer />

          <AnimatePresence initial={false}>
            {feed.posts.map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </AnimatePresence>

          {(feed.loading || !feed.initialized) && (
            <>
              <PostSkeleton />
              <PostSkeleton />
            </>
          )}

          {!feed.hasMore && feed.initialized && (
            <div className="text-center text-faint text-sm py-10">
              You're all caught up.
            </div>
          )}

          <div ref={sentinelRef} className="h-1" aria-hidden />
        </div>
      </div>
      <CommentDrawer />
    </div>
  );
}
