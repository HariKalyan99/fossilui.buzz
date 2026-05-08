import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import LinkExt from '@tiptap/extension-link'
import { ArrowLeft, Save, Send, Eye } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Label from '@/components/ui/Label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select'
import StatusBadge from '@/components/ui/StatusBadge'
import EditorToolbar from '@/components/editor/Toolbar'
import CoverUpload from '@/components/editor/CoverUpload'
import { useContentStore } from '@/store/content'
import { Card } from '@/components/ui/Card'
import Avatar from '@/components/ui/Avatar'
import Badge from '@/components/ui/Badge'

const CATEGORIES = ['Design', 'Engineering', 'Product', 'Writing', 'Team', 'Process']

function makeId() {
  return 'p_' + Math.random().toString(36).slice(2, 8)
}

function slugify(s) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60)
}

export default function Editor() {
  const navigate = useNavigate()
  const { id } = useParams()
  const isNew = !id
  const existing = useContentStore((s) => (id ? s.posts.find((p) => p.id === id) : null))
  const upsertPost = useContentStore((s) => s.upsertPost)
  const logActivity = useContentStore((s) => s.logActivity)
  const users = useContentStore((s) => s.users)

  const [title, setTitle] = useState(existing?.title || '')
  const [excerpt, setExcerpt] = useState(existing?.excerpt || '')
  const [category, setCategory] = useState(existing?.category || 'Design')
  const [tags, setTags] = useState((existing?.tags || []).join(', '))
  const [cover, setCover] = useState(null)
  const [status, setStatus] = useState(existing?.status || 'Draft')
  const [savedAt, setSavedAt] = useState(null)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: 'Start writing your story…' }),
      LinkExt.configure({ openOnClick: false }),
    ],
    content:
      existing?.body ||
      `<h2>An invitation to write</h2><p>Use this space to draft your post. Headings, lists, and quotes are all here when you need them.</p>`,
  })

  useEffect(() => {
    if (!editor) return
    return () => editor.destroy()
  }, [editor])

  const author = users[0]

  function buildPost(nextStatus = status) {
    const body = editor?.getHTML() || ''
    return {
      id: existing?.id || makeId(),
      title: title || 'Untitled post',
      slug: existing?.slug || slugify(title || 'untitled-post'),
      excerpt,
      status: nextStatus,
      category,
      tags: tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      authorId: existing?.authorId || author?.id || 'u_01',
      cover: cover?.dataUrl || existing?.cover || null,
      views: existing?.views || 0,
      publishedAt:
        nextStatus === 'Published'
          ? existing?.publishedAt || new Date().toISOString()
          : existing?.publishedAt || null,
      updatedAt: new Date().toISOString(),
      body,
    }
  }

  function saveDraft() {
    const post = buildPost('Draft')
    upsertPost(post)
    setStatus('Draft')
    setSavedAt(new Date())
    logActivity({
      userId: author?.id,
      verb: existing ? 'updated' : 'created',
      objectType: 'post',
      objectId: post.id,
      objectTitle: post.title,
    })
    if (isNew) navigate(`/content/${post.id}`, { replace: true })
  }

  function publish() {
    const post = buildPost('Published')
    upsertPost(post)
    setStatus('Published')
    setSavedAt(new Date())
    logActivity({
      userId: author?.id,
      verb: 'published',
      objectType: 'post',
      objectId: post.id,
      objectTitle: post.title,
    })
    if (isNew) navigate(`/content/${post.id}`, { replace: true })
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3 min-w-0">
          <Button asChild variant="ghost" size="icon-sm">
            <Link to="/content" aria-label="Back to content">
              <ArrowLeft />
            </Link>
          </Button>
          <div className="min-w-0">
            <p className="truncate text-[12.5px] text-muted-foreground">
              {isNew ? 'New post' : 'Editing'}
            </p>
            <div className="flex items-center gap-2">
              <h2 className="truncate text-[18px] font-semibold tracking-tight">
                {title || 'Untitled post'}
              </h2>
              <StatusBadge status={status} />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {savedAt && (
            <span className="hidden sm:inline text-[12px] text-muted-foreground">
              Saved at {savedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          )}
          <Button variant="outline" size="sm">
            <Eye /> Preview
          </Button>
          <Button variant="secondary" size="sm" onClick={saveDraft}>
            <Save /> Save draft
          </Button>
          <Button size="sm" onClick={publish}>
            <Send /> {status === 'Published' ? 'Update' : 'Publish'}
          </Button>
        </div>
      </div>

      {/* Editor + Sidebar */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_320px]">
        <div className="space-y-4 min-w-0">
          <CoverUpload value={cover} onChange={setCover} />

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Untitled post"
            className="w-full bg-transparent text-[32px] font-semibold tracking-tight leading-tight placeholder:text-muted-foreground/40 focus:outline-none"
          />

          <Textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Write a short excerpt — this is what shows up in lists and shares."
            className="text-[14px]"
          />

          <EditorToolbar editor={editor} />

          <Card className="p-6">
            <EditorContent editor={editor} />
          </Card>
        </div>

        <aside className="space-y-4">
          <Card className="p-5 space-y-4">
            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger id="status" className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Draft">Draft</SelectItem>
                  <SelectItem value="Scheduled">Scheduled</SelectItem>
                  <SelectItem value="Published">Published</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="category" className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="tags">Tags</Label>
              <Input
                id="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="design, ux, craft"
                className="mt-1.5"
              />
              <p className="mt-1.5 text-[11.5px] text-muted-foreground">Separate with commas.</p>
              {tags.trim() && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {tags.split(',').map((t) => t.trim()).filter(Boolean).map((t) => (
                    <Badge key={t} tone="muted" size="sm">{t}</Badge>
                  ))}
                </div>
              )}
            </div>
          </Card>

          <Card className="p-5">
            <Label>Author</Label>
            <div className="mt-2 flex items-center gap-2.5">
              <Avatar name={author?.name} gradient={author?.avatarColor} size="md" />
              <div>
                <p className="text-[13px] font-medium leading-tight">{author?.name}</p>
                <p className="text-[11.5px] text-muted-foreground leading-tight">{author?.email}</p>
              </div>
            </div>
          </Card>

          <Card className="p-5">
            <p className="text-[11.5px] font-medium uppercase tracking-wider text-muted-foreground">SEO</p>
            <div className="mt-3 space-y-3">
              <div>
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  value={slugify(title)}
                  readOnly
                  className="mt-1.5 font-mono text-[12px]"
                />
              </div>
              <div>
                <Label>Reading time</Label>
                <p className="mt-1.5 text-[12.5px] text-muted-foreground">
                  ~{Math.max(1, Math.round((editor?.getText() || '').split(/\s+/).filter(Boolean).length / 200))} min read
                </p>
              </div>
            </div>
          </Card>
        </aside>
      </div>
    </div>
  )
}
