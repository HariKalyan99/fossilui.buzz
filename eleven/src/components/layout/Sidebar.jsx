import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  FileText,
  Image as ImageIcon,
  Users,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
  Plus,
  ChevronsUpDown,
  LogOut,
  HelpCircle,
} from "lucide-react";
import { useSidebarStore } from "@/store/sidebar";
import { useContentStore } from "@/store/content";
import { cn } from "@/lib/utils";
import Logo from "./Logo";
import { Tooltip } from "@/components/ui/Tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import Avatar from "@/components/ui/Avatar";

const nav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/content", label: "Content", icon: FileText, badgeKey: "drafts" },
  { to: "/media", label: "Media", icon: ImageIcon },
  { to: "/users", label: "Users", icon: Users },
  { to: "/settings", label: "Settings", icon: Settings },
];

function NavItem({ item, collapsed, badge }) {
  const Icon = item.icon;

  const content = (
    <NavLink
      to={item.to}
      end={item.end}
      className={({ isActive }) =>
        cn(
          "group relative flex items-center gap-2.5 rounded-md px-2 h-8 text-[13px] font-medium transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
          isActive
            ? "bg-muted text-foreground"
            : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
          collapsed && "justify-center px-0",
        )
      }
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <motion.span
              layoutId="sidebar-active-bar"
              className="absolute left-0 top-1.5 bottom-1.5 w-[2px] rounded-full bg-primary"
              transition={{ type: "spring", stiffness: 500, damping: 40 }}
            />
          )}
          <Icon className="size-4 shrink-0" strokeWidth={2} />
          {!collapsed && (
            <>
              <span className="truncate">{item.label}</span>
              {badge ? (
                <span className="ml-auto inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-md border border-border bg-background px-1 text-[10.5px] font-medium text-muted-foreground tabular-nums">
                  {badge}
                </span>
              ) : null}
            </>
          )}
        </>
      )}
    </NavLink>
  );

  if (collapsed) {
    return (
      <Tooltip content={item.label} side="right">
        <div>{content}</div>
      </Tooltip>
    );
  }
  return content;
}

export default function Sidebar() {
  const { collapsed, toggle, mobileOpen, closeMobile } = useSidebarStore();
  const posts = useContentStore((s) => s.posts);
  const drafts = posts.filter((p) => p.status === "Draft").length;

  // Reusable inner content used both for desktop and mobile drawer
  const inner = (asMobile = false) => (
    <div className="flex h-full flex-col bg-surface">
      {/* Logo + collapse */}
      <div
        className={cn(
          "flex items-center h-14 px-3 border-b border-border",
          collapsed && !asMobile && "justify-center px-0",
        )}
      >
        <Logo collapsed={collapsed && !asMobile} />
        {!collapsed || asMobile ? (
          <Tooltip content="Collapse sidebar" side="right">
            <button
              onClick={asMobile ? closeMobile : toggle}
              className="ml-auto flex size-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              aria-label="Toggle sidebar"
            >
              <PanelLeftClose className="size-4" />
            </button>
          </Tooltip>
        ) : null}
      </div>

      {/* Quick action */}
      <div className={cn("px-3 pt-3", collapsed && !asMobile && "px-2")}>
        {collapsed && !asMobile ? (
          <Tooltip content="New post" side="right">
            <NavLink
              to="/content/new"
              className="flex h-8 w-full items-center justify-center rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <Plus className="size-4" />
            </NavLink>
          </Tooltip>
        ) : (
          <NavLink
            to="/content/new"
            className="flex h-8 w-full items-center justify-center gap-1.5 rounded-md bg-primary text-[13px] font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <Plus className="size-3.5" /> New post
          </NavLink>
        )}
      </div>

      {/* Nav */}
      <nav
        className={cn(
          "flex-1 overflow-y-auto px-2 py-3 space-y-0.5",
          collapsed && !asMobile && "px-2",
        )}
      >
        {!collapsed || asMobile ? (
          <p className="px-2 pt-2 pb-1 text-[10.5px] font-medium uppercase tracking-wider text-muted-foreground">
            Workspace
          </p>
        ) : null}
        {nav.map((item) => (
          <NavItem
            key={item.to}
            item={item}
            collapsed={collapsed && !asMobile}
            badge={item.badgeKey === "drafts" && drafts > 0 ? drafts : null}
          />
        ))}
      </nav>

      {/* Footer */}
      <div
        className={cn(
          "border-t border-border p-2",
          collapsed && !asMobile && "px-2",
        )}
      >
        {collapsed && !asMobile ? (
          <div className="flex flex-col items-center gap-1">
            <Tooltip content="Expand sidebar" side="right">
              <button
                onClick={toggle}
                className="flex size-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                aria-label="Expand sidebar"
              >
                <PanelLeftOpen className="size-4" />
              </button>
            </Tooltip>
            <Tooltip content="Maya Patel" side="right">
              <UserMenuTrigger collapsed />
            </Tooltip>
          </div>
        ) : (
          <>
            <UserMenuTrigger />
            <div className="mt-2 px-1 text-[11px] text-muted-foreground normal-case tracking-normal">
              Built by{" "}
              <a
                href="https://fossilui.buzz"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-foreground hover:text-foreground/80"
              >
                <span className="text-foreground">Fossil</span>
                <span className="text-grey-400 underline underline-offset-2">
                  UI
                </span>
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop */}
      <aside
        className={cn(
          "hidden md:flex md:flex-col shrink-0 border-r border-border h-screen sticky top-0 left-0 self-start",
          "transition-[width] duration-200 ease-out",
          collapsed ? "w-[60px]" : "w-[232px]",
        )}
      >
        {inner(false)}
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 z-40 bg-black/40 md:hidden"
              onClick={closeMobile}
            />
            <motion.aside
              initial={{ x: -260 }}
              animate={{ x: 0 }}
              exit={{ x: -260 }}
              transition={{ type: "tween", duration: 0.2, ease: "easeOut" }}
              className="fixed left-0 top-0 z-50 h-full w-[260px] border-r border-border md:hidden"
            >
              {inner(true)}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function UserMenuTrigger({ collapsed = false }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "flex w-full items-center gap-2 rounded-md p-1.5 text-left transition-colors hover:bg-muted",
            collapsed && "w-auto p-1",
          )}
        >
          <Avatar
            name="Maya Patel"
            gradient="from-indigo-500 to-violet-500"
            size={collapsed ? "sm" : "md"}
          />
          {!collapsed && (
            <>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[12.5px] font-medium leading-tight">
                  Maya Patel
                </p>
                <p className="truncate text-[11px] text-muted-foreground leading-tight">
                  maya@eleven.io
                </p>
              </div>
              <ChevronsUpDown className="size-3.5 text-muted-foreground" />
            </>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align={collapsed ? "start" : "end"}
        side={collapsed ? "right" : "top"}
        className="min-w-[200px]"
      >
        <DropdownMenuLabel>Maya Patel</DropdownMenuLabel>
        <DropdownMenuItem>
          <Settings className="size-4" /> Account settings
        </DropdownMenuItem>
        <DropdownMenuItem>
          <HelpCircle className="size-4" /> Help & support
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive focus:text-destructive">
          <LogOut className="size-4 !text-destructive" /> Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
