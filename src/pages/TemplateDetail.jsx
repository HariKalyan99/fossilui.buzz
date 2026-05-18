import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Allotment } from 'allotment'
import 'allotment/dist/style.css'
import {
  ArrowLeft,
  Check,
  Copy,
  ExternalLink,
  Eye,
  Files,
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-react'
import DinoLoader from '../components/loader/DinoLoader'
import { Button } from '../components/ui/Button'
import { Tag } from '../components/ui/Tag'
import { GithubIcon } from '../components/icons/Brand'
import { CodeViewer } from '../components/code/CodeViewer'
import { FileTree } from '../components/code/FileTree'
import { getTemplate } from '../data/templates'
import { TemplateStack } from '../components/TemplateStack'
import { buildFileTree, loadTemplateFiles } from '../data/templateFiles'
import { cn } from '../lib/cn'

function NotFound() {
  return (
    <div className="container-page py-24 text-center">
      <p className="text-[12px] uppercase tracking-[0.18em] text-neutral-500">404</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-900">
        Template not found
      </h1>
      <Link
        to="/templates"
        className="mt-6 inline-flex items-center gap-1.5 text-indigo-600 hover:text-indigo-700 text-sm"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to all templates
      </Link>
    </div>
  )
}

export default function TemplateDetail() {
  const { slug } = useParams()
  const template = getTemplate(slug)
  const previewVideoRef = useRef(null)

  const [files, setFiles] = useState(null)
  const [activePath, setActivePath] = useState(null)
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState('split')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [copied, setCopied] = useState(false)
  const [previewLoaded, setPreviewLoaded] = useState(false)

  useEffect(() => {
    if (!template) return
    let cancelled = false
    /* eslint-disable react-hooks/set-state-in-effect */
    setLoading(true)
    setPreviewLoaded(false)
    /* eslint-enable react-hooks/set-state-in-effect */
    loadTemplateFiles(template.slug).then((result) => {
      if (cancelled) return
      setFiles(result)
      const first =
        result.find((f) => f.path === 'src/App.jsx') ||
        result.find((f) => f.path.startsWith('src/')) ||
        result[0]
      setActivePath(first?.path || null)
      setLoading(false)
    })
    return () => {
      cancelled = true
    }
  }, [template])

  useEffect(() => {
    const video = previewVideoRef.current
    if (!video) return
    if (video.readyState >= 2) setPreviewLoaded(true)
  }, [template?.previewVideoUrl])

  const tree = useMemo(() => (files ? buildFileTree(files) : null), [files])
  const active = useMemo(
    () => files?.find((f) => f.path === activePath) || null,
    [files, activePath],
  )
  const previewDomain = useMemo(() => {
    if (!template?.name) return 'preview.com'
    return `${template.name.toLowerCase().replace(/[^a-z0-9]+/g, '')}.com`
  }, [template?.name])

  if (!template) return <NotFound />

  const onCopy = async () => {
    if (!active) return
    try {
      await navigator.clipboard.writeText(active.code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1400)
    } catch {
      /* noop */
    }
  }

  return (
    <div className="relative">
      {/* Header */}
      <section className="border-b border-neutral-200 bg-white">
        <div className="container-page py-8 md:py-10">
          <div className="flex flex-col gap-5">
            <Link
              to="/templates"
              className="inline-flex items-center gap-1.5 text-[12.5px] text-neutral-500 hover:text-neutral-900 w-fit"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              All templates
            </Link>

            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div className="max-w-2xl">
                <div className="flex flex-wrap items-center gap-2">
                  <Tag tone="soft">{template.category}</Tag>
                  {template.tags.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
                <h1 className="mt-3 text-3xl md:text-4xl font-semibold tracking-[-0.025em] text-neutral-900 text-balance">
                  {template.name}
                </h1>
                <p className="mt-2 text-neutral-600 text-[15px] text-balance leading-relaxed">
                  {template.description}
                </p>
                <TemplateStack
                  slug={template.slug}
                  variant="detail"
                  className="mt-5"
                  label="Libraries used"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap">
                <Button
                  as="a"
                  href={template.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  variant="secondary"
                  size="md"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  Live demo
                </Button>
                <Button
                  as="a"
                  href={template.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  variant="secondary"
                  size="md"
                >
                  <GithubIcon className="h-3.5 w-3.5" />
                  GitHub
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Workbench */}
      <section className="container-page py-6 md:py-8">
        <div className="md:hidden mb-3 flex p-1 rounded-md border border-neutral-200 bg-white w-fit">
          {[
            { id: 'preview', label: 'Preview', icon: Eye },
            { id: 'code', label: 'Code', icon: Files },
          ].map((v) => (
            <button
              key={v.id}
              onClick={() => setView(v.id)}
              className={cn(
                'inline-flex items-center gap-1.5 h-8 px-3 rounded-sm text-[12.5px]',
                view === v.id
                  ? 'bg-neutral-900 text-white'
                  : 'text-neutral-700 hover:text-neutral-900',
              )}
            >
              <v.icon className="h-3.5 w-3.5" />
              {v.label}
            </button>
          ))}
        </div>

        <div className="grid gap-6">
          {/* Live preview */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className={cn(
              'card overflow-hidden flex flex-col',
              view === 'code' && 'hidden md:flex',
            )}
          >
            <div className="flex items-center justify-between border-b border-neutral-200 px-3 py-2 text-[12px] text-neutral-500">
              <div className="flex items-center gap-2 min-w-0">
                <span className="flex gap-1.5 shrink-0">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
                </span>
                <span className="ml-2 truncate">{previewDomain}</span>
              </div>
              <a
                href={template.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 hover:text-neutral-900 shrink-0"
              >
                Open <ExternalLink className="h-3 w-3" />
              </a>
            </div>
            <div className="relative bg-neutral-50 aspect-[4/3] md:aspect-auto md:h-[640px]">
              {!previewLoaded && (
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <DinoLoader compact />
                </div>
              )}
              <video
                ref={previewVideoRef}
                key={template.previewVideoUrl}
                className="h-full w-full bg-black object-cover"
                autoPlay
                muted
                loop
                playsInline
                controls
                preload="metadata"
                onLoadedMetadata={() => setPreviewLoaded(true)}
                onLoadedData={() => setPreviewLoaded(true)}
                onCanPlay={() => setPreviewLoaded(true)}
                onPlaying={() => setPreviewLoaded(true)}
              >
                <source src={template.previewVideoUrl} type="video/mp4" />
              </video>
            </div>
          </motion.div>

          {/* Code workspace */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.04 }}
            className={cn(
              'card overflow-hidden flex flex-col h-[640px] !bg-[#0a0a0a] border-neutral-900',
              view === 'preview' && 'hidden md:flex',
            )}
          >
            {/* Toolbar (dark) */}
            <div className="flex items-center justify-between border-b border-white/5 px-2 py-1.5">
              <div className="flex items-center gap-1 min-w-0">
                <button
                  type="button"
                  onClick={() => setSidebarOpen((v) => !v)}
                  className="inline-flex h-7 w-7 items-center justify-center rounded-md text-neutral-400 hover:text-white hover:bg-white/[0.05]"
                  aria-label="Toggle file tree"
                >
                  {sidebarOpen ? (
                    <PanelLeftClose className="h-3.5 w-3.5" />
                  ) : (
                    <PanelLeftOpen className="h-3.5 w-3.5" />
                  )}
                </button>
                <span className="text-[12.5px] text-neutral-300 px-2 truncate font-mono">
                  {active?.path || '—'}
                </span>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <span className="hidden sm:inline-flex items-center gap-1 text-[10.5px] uppercase tracking-[0.16em] text-neutral-500 px-2">
                  {active?.lang || 'text'}
                </span>
                <button
                  type="button"
                  onClick={onCopy}
                  disabled={!active}
                  className={cn(
                    'inline-flex items-center gap-1.5 h-7 px-2.5 rounded-md text-[12px] border',
                    copied
                      ? 'border-emerald-500/30 text-emerald-300 bg-emerald-500/5'
                      : 'border-white/10 text-neutral-300 hover:bg-white/[0.05]',
                  )}
                >
                  {copied ? (
                    <>
                      <Check className="h-3 w-3" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      Copy
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="flex flex-1 min-h-0">
              <div className="sm:hidden flex-1 min-w-0 overflow-hidden" data-lenis-prevent>
                {loading ? (
                  <div className="flex h-full items-center justify-center p-4">
                    <DinoLoader compact />
                  </div>
                ) : (
                  <CodeViewer file={active} />
                )}
              </div>
              {sidebarOpen ? (
                <div className="hidden sm:flex sm:flex-1 min-h-0">
                  <Allotment separator snapOnCtrl={false}>
                  <Allotment.Pane minSize={180} preferredSize={260} snap>
                    <aside className="flex h-full border-r border-white/5 flex-col">
                      <div className="px-3 pt-2.5 pb-1 text-[10.5px] uppercase tracking-[0.16em] text-neutral-500">
                        Files
                      </div>
                      <div className="flex-1 overflow-y-auto py-1.5" data-lenis-prevent>
                        {loading ? (
                          <div className="px-3 py-3 flex items-center justify-center">
                            <DinoLoader compact />
                          </div>
                        ) : (
                          <FileTree
                            tree={tree}
                            activePath={activePath}
                            onSelect={(f) => setActivePath(f.path)}
                          />
                        )}
                      </div>
                    </aside>
                  </Allotment.Pane>
                  <Allotment.Pane minSize={360}>
                    <div className="h-full min-w-0 overflow-hidden" data-lenis-prevent>
                      {loading ? (
                        <div className="flex h-full items-center justify-center p-4">
                          <DinoLoader compact />
                        </div>
                      ) : (
                        <CodeViewer file={active} />
                      )}
                    </div>
                  </Allotment.Pane>
                  </Allotment>
                </div>
              ) : (
                <div className="hidden sm:flex sm:flex-1 min-w-0 overflow-hidden" data-lenis-prevent>
                  {loading ? (
                    <div className="flex h-full items-center justify-center p-4">
                      <DinoLoader compact />
                    </div>
                  ) : (
                    <CodeViewer file={active} />
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>

        <div className="mt-6 text-[12px] text-neutral-500 flex items-center justify-between">
          <span>Read-only viewer · Source is loaded directly from the template folder.</span>
          <Link to="/docs" className="text-neutral-700 hover:text-neutral-900">
            How to use FossilUI →
          </Link>
        </div>
      </section>
    </div>
  )
}
