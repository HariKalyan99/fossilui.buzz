import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Home,
  Compass,
  Bell,
  User,
  PenSquare,
  Sparkles,
  Sun,
  Moon,
} from "lucide-react";
import { useApp } from "../../store/useApp";
import { cn } from "../../lib/cn";
import { Avatar } from "../ui/Avatar";
import { Button } from "../ui/Button";

const NAV = [
  { to: "/", label: "Home", icon: Home, end: true },
  { to: "/explore", label: "Explore", icon: Compass },
  { to: "/notifications", label: "Notifications", icon: Bell },
  { to: "/profile", label: "Profile", icon: User },
];

export function LeftRail() {
  const me = useApp((s) => s.me);
  const openComposer = useApp((s) => s.openComposer);
  const theme = useApp((s) => s.theme);
  const toggleTheme = useApp((s) => s.toggleTheme);
  const unreadCount = useApp(
    (s) => s.notifications.filter((n) => !n.read).length
  );

  return (
    <aside className="hidden md:flex sticky top-0 h-screen flex-col border-r border-app bg-app/80 backdrop-blur-xl">
      <div className="flex flex-col h-full px-3 lg:px-4 py-5 w-[76px] lg:w-[260px]">
        <NavLink to="/" className="flex items-center gap-2 px-2 mb-6">
          <span className="grid h-9 w-9 place-items-center rounded-xl gradient-brand text-white shadow-lg shadow-brand-700/30">
            <Sparkles size={18} />
          </span>
          <span className="hidden lg:inline text-xl font-extrabold tracking-tight">
            Glimpse
          </span>
        </NavLink>

        <nav className="flex flex-col gap-1">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  "group relative flex items-center gap-4 rounded-xl px-3 py-3 text-base-strong transition-colors",
                  isActive
                    ? "bg-surface-2 font-semibold"
                    : "text-soft hover:bg-surface-2 hover:text-base-strong"
                )
              }
            >
              {({ isActive }) => (
                <>
                  <span className="relative">
                    <item.icon
                      size={22}
                      strokeWidth={isActive ? 2.4 : 1.8}
                    />
                    {item.label === "Notifications" && unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 h-4 min-w-4 px-1 grid place-items-center rounded-full bg-rose-500 text-[10px] font-bold text-white">
                        {unreadCount > 9 ? "9+" : unreadCount}
                      </span>
                    )}
                  </span>
                  <span className="hidden lg:inline">{item.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="leftrail-active"
                      className="absolute inset-0 -z-10 rounded-xl bg-surface-2"
                      transition={{ type: "spring", stiffness: 500, damping: 36 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="mt-4 hidden lg:block">
          <Button fullWidth size="lg" onClick={openComposer}>
            <PenSquare size={16} /> New post
          </Button>
        </div>
        <div className="mt-4 flex lg:hidden justify-center">
          <button
            onClick={openComposer}
            className="grid h-12 w-12 place-items-center rounded-full gradient-brand text-white glow-brand"
            aria-label="New post"
          >
            <PenSquare size={20} />
          </button>
        </div>

        <div className="mt-auto flex flex-col gap-2">
          <button
            onClick={toggleTheme}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-soft hover:bg-surface-2 hover:text-base-strong"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            <span className="hidden lg:inline text-sm">
              {theme === "dark" ? "Light mode" : "Dark mode"}
            </span>
          </button>

          <NavLink
            to="/profile"
            className="flex items-center gap-3 rounded-xl px-2 py-2 hover:bg-surface-2"
          >
            <Avatar src={me.avatar} name={me.name} size="md" />
            <div className="hidden lg:flex flex-col leading-tight">
              <span className="text-sm font-semibold truncate max-w-[140px]">
                {me.name}
              </span>
              <span className="text-xs text-faint truncate max-w-[140px]">
                @{me.handle}
              </span>
            </div>
          </NavLink>
        </div>
      </div>
    </aside>
  );
}
