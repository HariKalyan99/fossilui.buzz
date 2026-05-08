import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, Code2, Crown, ExternalLink } from 'lucide-react'
import { GithubIcon } from './icons/Brand'
import { Tag } from './ui/Tag'
import { cn } from '../lib/cn'

export function TemplateCard({ template, index = 0 }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.03, 0.18), ease: 'easeOut' }}
      className="card card-hover group relative overflow-hidden"
    >
      <Link
        to={`/templates/${template.slug}`}
        className="block focus:outline-none"
        aria-label={`Open ${template.name}`}
      >
        <div
          className={cn(
            'relative aspect-[16/10] overflow-hidden rounded-t-[14px] border-b border-neutral-200',
            'bg-gradient-to-br',
            template.accent,
          )}
        >
          <div className="pointer-events-none absolute left-2 top-2 z-10 md:left-3 md:top-3">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-200/70 bg-gradient-to-br from-amber-200 via-yellow-300 to-orange-400 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-amber-950 shadow-[0_10px_16px_-8px_rgba(120,53,15,0.6),inset_0_1px_0_rgba(255,255,255,0.55),inset_0_-2px_4px_rgba(146,64,14,0.28)]">
              <Crown className="h-3.5 w-3.5" />
              Premium
            </div>
          </div>
          {/* Faint dot pattern for editorial texture */}
          <div className="absolute inset-0 bg-grid opacity-60" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.22em] text-neutral-500">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: template.swatch || '#737373' }}
              />
              {template.category}
            </div>
            <div className="mt-2 text-2xl md:text-[28px] font-semibold tracking-[-0.025em] text-neutral-900">
              {template.name}
            </div>
            <div className="mt-1 text-[12.5px] text-neutral-600">{template.tagline}</div>
          </div>
          <div className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-white/90 backdrop-blur px-2.5 py-1 text-[11px] text-neutral-700 border border-neutral-200/80 opacity-0 group-hover:opacity-100 transition-opacity">
            View
            <ArrowUpRight className="h-3 w-3" />
          </div>
        </div>
      </Link>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-[15px] font-semibold tracking-tight text-neutral-900">
              {template.name}
            </h3>
            <p className="mt-0.5 text-[13px] text-neutral-500 line-clamp-1">
              {template.tagline}
            </p>
          </div>
          <Tag tone="soft" className="shrink-0">{template.category}</Tag>
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {template.tags.slice(0, 3).map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>

        <div className="mt-5 grid grid-cols-3 gap-1.5">
          <a
            href={template.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-1.5 h-9 rounded-md bg-white border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50 text-[12.5px] text-neutral-700 transition-colors"
          >
            <ExternalLink className="h-3 w-3" />
            Live
          </a>
          <a
            href={template.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-1.5 h-9 rounded-md bg-white border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50 text-[12.5px] text-neutral-700 transition-colors"
          >
            <GithubIcon className="h-3 w-3" />
            GitHub
          </a>
          <Link
            to={`/templates/${template.slug}`}
            className="inline-flex items-center justify-center gap-1.5 h-9 rounded-md bg-neutral-900 hover:bg-neutral-800 text-[12.5px] font-medium text-white transition-colors"
          >
            <Code2 className="h-3 w-3" />
            Code
          </Link>
        </div>
      </div>
    </motion.article>
  )
}
