import { motion } from "framer-motion";
import { MoreHorizontal, BadgeCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { Avatar } from "../ui/Avatar";
import { IconButton } from "../ui/IconButton";
import { PostActions } from "./PostActions";
import { PostMedia } from "./PostMedia";
import { useApp } from "../../store/useApp";
import { relativeTime } from "../../lib/time";

function renderText(text) {
  // Highlight hashtags and @mentions inline.
  const parts = text.split(/(\s+)/);
  return parts.map((part, i) => {
    if (part.startsWith("#")) {
      return (
        <span key={i} className="text-brand-400 hover:underline cursor-pointer">
          {part}
        </span>
      );
    }
    if (part.startsWith("@")) {
      return (
        <span key={i} className="text-brand-400 hover:underline cursor-pointer">
          {part}
        </span>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export function PostCard({ post }) {
  const author = useApp((s) => s.getUser(post.authorId));
  if (!author) return null;

  const profileLink = author.id === "me" ? "/profile" : "/profile";

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="rounded-2xl border border-app bg-surface px-4 py-4 md:px-5 md:py-5 hover:border-[rgb(var(--text-faint))]/40 transition-colors"
    >
      <header className="flex items-start gap-3">
        <Link to={profileLink} className="shrink-0">
          <Avatar src={author.avatar} name={author.name} size="md" />
        </Link>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <Link
              to={profileLink}
              className="font-semibold hover:underline text-sm"
            >
              {author.name}
            </Link>
            {author.verified && (
              <BadgeCheck size={14} className="text-brand-400 shrink-0" />
            )}
            <span className="text-faint text-sm">@{author.handle}</span>
            <span className="text-faint text-sm">·</span>
            <time className="text-faint text-sm" dateTime={new Date(post.createdAt).toISOString()}>
              {relativeTime(post.createdAt)}
            </time>
          </div>
        </div>
        <IconButton aria-label="More" size="sm">
          <MoreHorizontal size={16} />
        </IconButton>
      </header>

      {post.text && (
        <p className="mt-2 text-[15px] leading-relaxed whitespace-pre-wrap break-words">
          {renderText(post.text)}
        </p>
      )}

      <PostMedia post={post} />

      <PostActions post={post} />
    </motion.article>
  );
}
