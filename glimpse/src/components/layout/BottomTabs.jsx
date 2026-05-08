import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Compass, Bell, User, Plus } from "lucide-react";
import { useApp } from "../../store/useApp";
import { cn } from "../../lib/cn";

const TABS = [
  { to: "/", icon: Home, label: "Home", end: true },
  { to: "/explore", icon: Compass, label: "Explore" },
  { to: null, icon: Plus, label: "Post" },
  { to: "/notifications", icon: Bell, label: "Activity" },
  { to: "/profile", icon: User, label: "Me" },
];

export function BottomTabs() {
  const openComposer = useApp((s) => s.openComposer);
  const unread = useApp((s) => s.notifications.filter((n) => !n.read).length);

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-30 border-t border-app bg-app/90 backdrop-blur-xl"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="grid grid-cols-5 items-center h-16">
        {TABS.map((t, i) => {
          if (!t.to) {
            return (
              <li key={i} className="grid place-items-center">
                <button
                  onClick={openComposer}
                  className="grid h-12 w-12 place-items-center rounded-2xl gradient-brand text-white glow-brand"
                  aria-label="New post"
                >
                  <Plus size={22} />
                </button>
              </li>
            );
          }
          return (
            <li key={t.to} className="h-full">
              <NavLink
                to={t.to}
                end={t.end}
                className={({ isActive }) =>
                  cn(
                    "relative flex flex-col items-center justify-center gap-0.5 h-full text-xs",
                    isActive ? "text-base-strong" : "text-faint"
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <span className="relative">
                      <t.icon
                        size={22}
                        strokeWidth={isActive ? 2.4 : 1.8}
                      />
                      {t.label === "Activity" && unread > 0 && (
                        <span className="absolute -top-1 -right-1 h-3.5 min-w-3.5 px-1 grid place-items-center rounded-full bg-rose-500 text-[9px] font-bold text-white">
                          {unread > 9 ? "9+" : unread}
                        </span>
                      )}
                    </span>
                    {isActive && (
                      <motion.span
                        layoutId="bottom-active"
                        className="absolute -top-px h-0.5 w-10 rounded-full gradient-brand"
                        transition={{ type: "spring", stiffness: 500, damping: 36 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
