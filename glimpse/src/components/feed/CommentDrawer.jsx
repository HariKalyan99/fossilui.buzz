import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Send, X, Heart } from "lucide-react";
import { useApp } from "../../store/useApp";
import { Avatar } from "../ui/Avatar";
import { IconButton } from "../ui/IconButton";
import { relativeTime } from "../../lib/time";

const SAMPLE_COMMENTS = [
  { id: 1, name: "Felix Holt", handle: "felixholt", body: "this is exactly what I needed today", time: Date.now() - 1000 * 60 * 7, likes: 14 },
  { id: 2, name: "Mira Singh", handle: "mira_singh", body: "love the framing on the second shot", time: Date.now() - 1000 * 60 * 22, likes: 4 },
  { id: 3, name: "Ravi Patel", handle: "ravi_writes", body: "saving for later, thanks for posting!", time: Date.now() - 1000 * 60 * 60, likes: 1 },
];

export function CommentDrawer() {
  const activeId = useApp((s) => s.activeCommentPostId);
  const closeComments = useApp((s) => s.closeComments);

  return (
    <AnimatePresence>
      {activeId && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center"
          aria-modal="true"
          role="dialog"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            onClick={closeComments}
          />
          {/* keying by activeId resets internal state cleanly between posts */}
          <DrawerContent key={activeId} activeId={activeId} onClose={closeComments} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DrawerContent({ activeId, onClose }) {
  const post = useApp((s) => s.feed.posts.find((p) => p.id === activeId));
  const author = useApp((s) => (post ? s.getUser(post.authorId) : null));
  const me = useApp((s) => s.me);
  const addCommentLocal = useApp((s) => s.addCommentLocal);
  const [draft, setDraft] = useState("");
  const [comments, setComments] = useState(SAMPLE_COMMENTS);

  if (!post) return null;

  function submit() {
    const v = draft.trim();
    if (!v) return;
    setComments((c) => [
      {
        id: Date.now(),
        name: me.name,
        handle: me.handle,
        body: v,
        time: Date.now(),
        likes: 0,
      },
      ...c,
    ]);
    addCommentLocal(post.id);
    setDraft("");
  }

  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", stiffness: 320, damping: 30 }}
      className="relative w-full sm:max-w-xl bg-surface border-t sm:border border-app sm:rounded-2xl rounded-t-2xl max-h-[85vh] flex flex-col shadow-2xl"
    >
      <header className="flex items-center justify-between px-5 py-4 border-b border-app">
        <div>
          <h3 className="text-sm font-semibold">Comments</h3>
          <p className="text-xs text-faint">
            on {author ? author.name : "post"}
          </p>
        </div>
        <IconButton onClick={onClose} aria-label="Close">
          <X size={18} />
        </IconButton>
      </header>

      <div className="flex-1 overflow-y-auto px-5 py-4 thin-scrollbar">
        <ul className="space-y-4">
          {comments.map((c) => (
            <li key={c.id} className="flex gap-3">
              <Avatar
                name={c.name}
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${c.handle}`}
                size="sm"
              />
              <div className="flex-1 min-w-0">
                <div className="rounded-2xl rounded-tl-sm bg-surface-2 px-3 py-2">
                  <div className="flex items-center gap-1.5 text-xs">
                    <span className="font-semibold">{c.name}</span>
                    <span className="text-faint">·</span>
                    <span className="text-faint">{relativeTime(c.time)}</span>
                  </div>
                  <p className="text-sm leading-snug">{c.body}</p>
                </div>
                <div className="mt-1 flex items-center gap-3 text-xs text-faint pl-2">
                  <button className="hover:text-rose-400 inline-flex items-center gap-1">
                    <Heart size={12} /> {c.likes}
                  </button>
                  <button className="hover:text-base-strong">Reply</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <footer className="border-t border-app p-3 flex items-center gap-2">
        <Avatar src={me.avatar} name={me.name} size="sm" />
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              submit();
            }
          }}
          placeholder="Add a comment..."
          className="flex-1 bg-surface-2 rounded-full px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand-500/50"
        />
        <button
          onClick={submit}
          disabled={!draft.trim()}
          className="grid h-10 w-10 place-items-center rounded-full gradient-brand text-white disabled:opacity-40"
          aria-label="Post comment"
        >
          <Send size={16} />
        </button>
      </footer>
    </motion.div>
  );
}
