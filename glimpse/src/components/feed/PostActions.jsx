import { Heart, MessageCircle, Share2, Bookmark } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "../../store/useApp";
import { IconButton } from "../ui/IconButton";
import { formatCount } from "../../lib/time";

export function PostActions({ post }) {
  const toggleLike = useApp((s) => s.toggleLike);
  const toggleBookmark = useApp((s) => s.toggleBookmark);
  const share = useApp((s) => s.share);
  const openComments = useApp((s) => s.openComments);

  return (
    <div className="flex items-center justify-between mt-2">
      <div className="flex items-center gap-1 -ml-2">
        <button
          onClick={() => toggleLike(post.id)}
          className="group flex items-center gap-1.5 rounded-full px-2.5 py-1.5 hover:bg-rose-500/10 text-soft hover:text-rose-400 transition-colors"
          aria-label={post.liked ? "Unlike" : "Like"}
        >
          <motion.span
            key={post.liked ? "on" : "off"}
            initial={{ scale: 0.6, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 18 }}
            className="grid place-items-center"
          >
            <Heart
              size={18}
              className={
                post.liked
                  ? "fill-rose-500 text-rose-500"
                  : "group-hover:text-rose-400"
              }
            />
          </motion.span>
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={post.likes}
              initial={{ y: -8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 8, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="text-xs font-medium tabular-nums"
            >
              {formatCount(post.likes)}
            </motion.span>
          </AnimatePresence>
        </button>

        <button
          onClick={() => openComments(post.id)}
          className="flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-soft hover:text-brand-300 hover:bg-brand-500/10 transition-colors"
          aria-label="Comment"
        >
          <MessageCircle size={18} />
          <span className="text-xs font-medium tabular-nums">
            {formatCount(post.comments)}
          </span>
        </button>

        <button
          onClick={() => share(post.id)}
          className="flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-soft hover:text-emerald-300 hover:bg-emerald-500/10 transition-colors"
          aria-label="Share"
        >
          <Share2 size={18} />
          <span className="text-xs font-medium tabular-nums">
            {formatCount(post.shares)}
          </span>
        </button>
      </div>

      <IconButton
        onClick={() => toggleBookmark(post.id)}
        active={post.bookmarked}
        activeClass="text-amber-400"
        aria-label={post.bookmarked ? "Remove bookmark" : "Bookmark"}
      >
        <Bookmark
          size={18}
          className={post.bookmarked ? "fill-amber-400" : ""}
        />
      </IconButton>
    </div>
  );
}
