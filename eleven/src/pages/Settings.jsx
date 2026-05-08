import { useState } from 'react'
import { Sun, Moon, Monitor, Globe, Bell, Lock, User } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Label from '@/components/ui/Label'
import Switch from '@/components/ui/Switch'
import Separator from '@/components/ui/Separator'
import Avatar from '@/components/ui/Avatar'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs'
import { useThemeStore } from '@/store/theme'
import { cn } from '@/lib/utils'

export default function Settings() {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Settings</h2>
        <p className="mt-0.5 text-[13px] text-muted-foreground">
          Manage your workspace, profile, and preferences.
        </p>
      </div>

      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="general"><GeneralTab /></TabsContent>
        <TabsContent value="profile"><ProfileTab /></TabsContent>
        <TabsContent value="notifications"><NotificationsTab /></TabsContent>
        <TabsContent value="security"><SecurityTab /></TabsContent>
      </Tabs>
    </div>
  )
}

/* ---------- General ---------- */

function GeneralTab() {
  const { theme, setTheme } = useThemeStore()
  const [name, setName] = useState('Eleven Studio')
  const [url, setUrl] = useState('https://eleven.io')
  const [tagline, setTagline] = useState('A focused content platform for modern teams.')

  const themes = [
    { id: 'light', label: 'Light', icon: Sun },
    { id: 'dark', label: 'Dark', icon: Moon },
    { id: 'system', label: 'System', icon: Monitor, disabled: true, hint: 'Coming soon' },
  ]

  return (
    <div className="space-y-4 max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle>Workspace</CardTitle>
          <CardDescription>Public details about your CMS workspace.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2 sm:grid-cols-[160px_1fr] sm:items-center">
            <Label htmlFor="ws-name">Name</Label>
            <Input id="ws-name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="grid gap-2 sm:grid-cols-[160px_1fr] sm:items-center">
            <Label htmlFor="ws-url">URL</Label>
            <Input id="ws-url" value={url} onChange={(e) => setUrl(e.target.value)} leadingIcon={Globe} />
          </div>
          <div className="grid gap-2 sm:grid-cols-[160px_1fr]">
            <Label htmlFor="ws-tagline">Tagline</Label>
            <Textarea id="ws-tagline" value={tagline} onChange={(e) => setTagline(e.target.value)} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>Choose how Eleven looks on this device.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-3">
            {themes.map((t) => {
              const Icon = t.icon
              const active = theme === t.id
              return (
                <button
                  key={t.id}
                  type="button"
                  disabled={t.disabled}
                  onClick={() => !t.disabled && setTheme(t.id)}
                  className={cn(
                    'group relative flex flex-col items-start gap-3 rounded-lg border p-3 text-left transition-all',
                    active ? 'border-primary ring-2 ring-primary/30' : 'border-border hover:border-foreground/15',
                    t.disabled && 'opacity-60 cursor-not-allowed',
                  )}
                >
                  <ThemePreview theme={t.id} />
                  <div className="flex items-center gap-2">
                    <Icon className="size-3.5 text-muted-foreground" />
                    <span className="text-[13px] font-medium">{t.label}</span>
                    {t.hint && <span className="text-[11px] text-muted-foreground">· {t.hint}</span>}
                  </div>
                </button>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function ThemePreview({ theme }) {
  const isDark = theme === 'dark'
  return (
    <div className={cn(
      'w-full overflow-hidden rounded-md border',
      isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-zinc-200',
    )}>
      <div className="flex">
        <div className={cn('h-16 w-10 border-r', isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-zinc-50 border-zinc-200')}>
          <div className={cn('mt-2 ml-2 h-1.5 w-5 rounded-full', isDark ? 'bg-zinc-700' : 'bg-zinc-300')} />
          <div className={cn('mt-1.5 ml-2 h-1.5 w-4 rounded-full', isDark ? 'bg-zinc-700' : 'bg-zinc-300')} />
          <div className={cn('mt-1.5 ml-2 h-1.5 w-5 rounded-full', isDark ? 'bg-zinc-700' : 'bg-zinc-300')} />
        </div>
        <div className="flex-1 p-2">
          <div className={cn('h-2 w-2/3 rounded-full', isDark ? 'bg-zinc-700' : 'bg-zinc-300')} />
          <div className="mt-1.5 grid grid-cols-2 gap-1.5">
            <div className={cn('h-6 rounded', isDark ? 'bg-zinc-800' : 'bg-zinc-100')} />
            <div className="h-6 rounded bg-indigo-500/80" />
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---------- Profile ---------- */

function ProfileTab() {
  const [name, setName] = useState('Maya Patel')
  const [email, setEmail] = useState('maya@eleven.io')
  const [bio, setBio] = useState('Designer & editor, Eleven Studio.')

  return (
    <div className="space-y-4 max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>How you appear across the workspace.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="flex items-center gap-4">
            <Avatar name={name} size="xl" gradient="from-indigo-500 to-violet-500" />
            <div>
              <Button variant="outline" size="sm">Change photo</Button>
              <p className="mt-1.5 text-[11.5px] text-muted-foreground">JPG or PNG, 256px × 256px minimum.</p>
            </div>
          </div>
          <Separator />
          <div className="grid gap-2 sm:grid-cols-[160px_1fr] sm:items-center">
            <Label htmlFor="p-name">Name</Label>
            <Input id="p-name" value={name} onChange={(e) => setName(e.target.value)} leadingIcon={User} />
          </div>
          <div className="grid gap-2 sm:grid-cols-[160px_1fr] sm:items-center">
            <Label htmlFor="p-email">Email</Label>
            <Input id="p-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="grid gap-2 sm:grid-cols-[160px_1fr]">
            <Label htmlFor="p-bio">Bio</Label>
            <Textarea id="p-bio" value={bio} onChange={(e) => setBio(e.target.value)} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

/* ---------- Notifications ---------- */

function NotificationsTab() {
  const items = [
    { id: 'comments', label: 'Comments', description: 'When someone comments on your posts.', defaultOn: true },
    { id: 'mentions', label: 'Mentions', description: 'When you are @mentioned in a thread.', defaultOn: true },
    { id: 'publishes', label: 'Publishes', description: 'When teammates publish new posts.', defaultOn: false },
    { id: 'invites', label: 'Workspace invites', description: 'Always notify on new member invitations.', defaultOn: true },
  ]
  const [state, setState] = useState(Object.fromEntries(items.map((i) => [i.id, i.defaultOn])))

  return (
    <div className="space-y-4 max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle>Email notifications</CardTitle>
          <CardDescription>Choose what you receive in your inbox.</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="divide-y divide-border">
            {items.map((item) => (
              <li key={item.id} className="flex items-start justify-between gap-4 py-3 first:pt-0 last:pb-0">
                <div className="flex items-start gap-3">
                  <Bell className="mt-0.5 size-4 text-muted-foreground" />
                  <div>
                    <p className="text-[13px] font-medium">{item.label}</p>
                    <p className="text-[12px] text-muted-foreground">{item.description}</p>
                  </div>
                </div>
                <Switch
                  checked={state[item.id]}
                  onCheckedChange={(v) => setState((s) => ({ ...s, [item.id]: !!v }))}
                />
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

/* ---------- Security ---------- */

function SecurityTab() {
  return (
    <div className="space-y-4 max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle>Password</CardTitle>
          <CardDescription>Change the password for your account.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid gap-2 sm:grid-cols-[200px_1fr] sm:items-center">
            <Label htmlFor="current">Current password</Label>
            <Input id="current" type="password" leadingIcon={Lock} />
          </div>
          <div className="grid gap-2 sm:grid-cols-[200px_1fr] sm:items-center">
            <Label htmlFor="new">New password</Label>
            <Input id="new" type="password" leadingIcon={Lock} />
          </div>
          <div className="grid gap-2 sm:grid-cols-[200px_1fr] sm:items-center">
            <Label htmlFor="confirm">Confirm new</Label>
            <Input id="confirm" type="password" leadingIcon={Lock} />
          </div>
          <div className="flex justify-end pt-2">
            <Button>Update password</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Two-factor authentication</CardTitle>
          <CardDescription>Add a second layer of protection to your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[13px] font-medium">Authenticator app</p>
              <p className="text-[12px] text-muted-foreground">Use an app like 1Password or Authy.</p>
            </div>
            <Button variant="outline" size="sm">Enable</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
