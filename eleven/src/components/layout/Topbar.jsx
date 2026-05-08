import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Search, Bell, Menu, Sun, Moon, Command } from 'lucide-react'
import { useThemeStore } from '@/store/theme'
import { useSidebarStore } from '@/store/sidebar'
import { Tooltip } from '@/components/ui/Tooltip'
import Kbd from '@/components/ui/Kbd'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu'

const titles = {
  '/': 'Dashboard',
  '/content': 'Content',
  '/content/new': 'New post',
  '/media': 'Media',
  '/users': 'Users',
  '/settings': 'Settings',
}

function pageTitle(path) {
  if (titles[path]) return titles[path]
  if (path.startsWith('/content/')) return 'Edit post'
  return ''
}

export default function Topbar({ onOpenCommand }) {
  const { theme, toggle: toggleTheme } = useThemeStore()
  const { openMobile } = useSidebarStore()
  const location = useLocation()
  const navigate = useNavigate()
  const [isMac, setIsMac] = useState(false)

  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad/.test(navigator.platform))
  }, [])

  const title = pageTitle(location.pathname)

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-md md:px-6">
      <button
        className="md:hidden flex size-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        onClick={openMobile}
        aria-label="Open menu"
      >
        <Menu className="size-4" />
      </button>

      <h1 className="text-[14px] font-semibold tracking-tight">{title}</h1>

      <div className="ml-auto flex items-center gap-1.5">
        <button
          onClick={onOpenCommand}
          className="hidden md:flex h-8 w-[260px] items-center gap-2 rounded-md border border-border bg-surface px-2.5 text-[12.5px] text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground focus-ring"
        >
          <Search className="size-3.5" />
          <span>Search content, media…</span>
          <span className="ml-auto flex items-center gap-0.5">
            <Kbd>{isMac ? '\u2318' : 'Ctrl'}</Kbd>
            <Kbd>K</Kbd>
          </span>
        </button>

        <Tooltip content="Search">
          <button
            onClick={onOpenCommand}
            className="md:hidden flex size-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            aria-label="Search"
          >
            <Search className="size-4" />
          </button>
        </Tooltip>

        <Tooltip content={theme === 'dark' ? 'Light mode' : 'Dark mode'}>
          <button
            onClick={toggleTheme}
            className="flex size-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>
        </Tooltip>

        <DropdownMenu>
          <Tooltip content="Notifications">
            <DropdownMenuTrigger asChild>
              <button
                className="relative flex size-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                aria-label="Notifications"
              >
                <Bell className="size-4" />
                <span className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-primary" />
              </button>
            </DropdownMenuTrigger>
          </Tooltip>
          <DropdownMenuContent align="end" className="min-w-[280px]">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuItem className="flex-col items-start gap-0.5">
              <p className="text-[13px] font-medium">Daniel updated a draft</p>
              <p className="text-[11.5px] text-muted-foreground">Shipping faster without shipping worse · 2h ago</p>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex-col items-start gap-0.5">
              <p className="text-[13px] font-medium">Sara published a post</p>
              <p className="text-[11.5px] text-muted-foreground">Why we stopped redesigning · 5h ago</p>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex-col items-start gap-0.5">
              <p className="text-[13px] font-medium">A new media file was uploaded</p>
              <p className="text-[11.5px] text-muted-foreground">cover-typography.jpg · 12h ago</p>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-primary">View all notifications</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
