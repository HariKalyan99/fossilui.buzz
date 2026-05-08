import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageCircle, UserPlus, AtSign, Bell, CheckCheck } from "lucide-react";
import { useApp } from "../store/useApp";
import { Avatar } from "../components/ui/Avatar";
import { Button } from "../components/ui/Button";
import { relativeTime } from "../lib/time";
import { cn } from "../lib/cn";

const FILTERS = [
  { key: "all", label: "All" },
  { key: "like", label: "Likes" },
  { key: "comment", label: "Comments" },
  { key: "follow", label: "Follows" },
  { key: "mention", label: "Mentions" },
];

function iconFor(type) {
  switch (type) {
    case "like":
      return <Heart size={14} className="fill-rose-500 text-rose-500" />;
    case "comment":
      return <MessageCircle size={14} className="text-brand-400" />;
    case "follow":
      return <UserPlus size={14} className="text-emerald-400" />;
    case "mention":
      return <AtSign size={14} className="text-amber-400" />;
    default:
      return <Bell size={14} />;
  }
}

export default function Notifications() {
  const notifications = useApp((s) => s.notifications);
  const getUser = useApp((s) => s.getUser);
  const markAllRead = useApp((s) => s.markAllNotificationsRead);
  const [filter, setFilter] = useState("all");

  const list = useMemo(
    () =>
      notifications.filter((n) => filter === "all" || n.type === filter),
    [notifications, filter]
  );

  return (
    <div className="px-4 md:px-6 pt-4 md:pt-6">
      <header className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Activity</h1>
          <p className="text-sm text-faint">
            Stay on top of likes, comments and new followers.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={markAllRead}>
          <CheckCheck size={14} /> Mark all read
        </Button>
      </header>

      <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={cn(
              "shrink-0 rounded-full px-3.5 py-1.5 text-sm font-medium border transition-colors",
              filter === f.key
                ? "gradient-brand text-white border-transparent"
                : "border-app bg-surface text-soft hover:text-base-strong"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <ul className="rounded-2xl border border-app bg-surface overflow-hidden">
        <AnimatePresence initial={false}>
          {list.length === 0 ? (
            <motion.li
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-16 text-center text-soft"
            >
              <Bell size={28} className="mx-auto mb-3 text-faint" />
              <p className="text-sm">Nothing here yet.</p>
            </motion.li>
          ) : (
            list.map((n) => {
              const actor = getUser(n.actorId);
              if (!actor) return null;
              return (
                <motion.li
                  key={n.id}
                  layout
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className={cn(
                    "relative flex items-start gap-3 px-4 py-3 border-b border-app last:border-b-0",
                    !n.read && "bg-brand-500/5"
                  )}
                >
                  <div className="relative shrink-0">
                    <Avatar src={actor.avatar} name={actor.name} size="md" />
                    <span className="absolute -bottom-1 -right-1 grid h-5 w-5 place-items-center rounded-full bg-surface border border-app">
                      {iconFor(n.type)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm leading-snug">
                      <span className="font-semibold">{actor.name}</span>{" "}
                      <span className="text-soft">{n.text}</span>
                    </p>
                    {n.preview && (
                      <p className="text-xs text-faint mt-0.5 line-clamp-1">
                        “{n.preview}”
                      </p>
                    )}
                    <p className="text-[11px] text-faint mt-1">
                      {relativeTime(n.createdAt)}
                    </p>
                  </div>
                  {!n.read && (
                    <span
                      className="mt-2 h-2 w-2 rounded-full bg-brand-500 shrink-0"
                      aria-label="Unread"
                    />
                  )}
                </motion.li>
              );
            })
          )}
        </AnimatePresence>
      </ul>
    </div>
  );
}
