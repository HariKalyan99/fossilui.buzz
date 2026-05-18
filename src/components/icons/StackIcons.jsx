import { STACK_META } from '../../data/templateStack'

const svgBase = {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 24 24',
  'aria-hidden': true,
}

function StackSvg({ className, color, children, ...props }) {
  return (
    <svg
      {...svgBase}
      {...props}
      className={className}
      style={{ color, ...props.style }}
    >
      {children}
    </svg>
  )
}

export function TailwindIcon({ className, color, ...props }) {
  return (
    <StackSvg className={className} color={color} fill="currentColor" {...props}>
      <path d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35.98.98 2.12 2.12 4.59 2.12 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.74-1.91-1.35C15.61 7.54 14.47 6.4 12 6.4zm-5 7.2c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35.98.98 2.12 2.12 4.59 2.12 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.74-1.91-1.35-.98-.98-2.12-2.12-4.59-2.12z" />
    </StackSvg>
  )
}

export function MotionIcon({ className, color, ...props }) {
  return (
    <StackSvg className={className} color={color} fill="currentColor" {...props}>
      <path d="M4 12c0-4.42 3.58-8 8-8v3c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5h3c0 4.42-3.58 8-8 8s-8-3.58-8-8zm11-5 4 5-4 5v-3.5H13v-3h2V7z" />
    </StackSvg>
  )
}

export function RouterIcon({ className, color, ...props }) {
  return (
    <StackSvg className={className} color={color} fill="currentColor" {...props}>
      <path d="M12 2C6.48 2 2 6.2 2 11.2c0 2.9 1.46 5.48 3.74 7.1L4 22l4.2-1.62c1.05.29 2.16.45 3.3.45 5.52 0 10-4.2 10-9.2S17.52 2 12 2zm0 16.2c-1 0-1.97-.14-2.88-.4l-.62-.2-2.48.95.95-2.42-.4-.63A7.8 7.8 0 0 1 4.2 11.2C4.2 7.1 7.72 4 12 4s7.8 3.1 7.8 7.2-3.52 7.2-7.8 7.2z" />
    </StackSvg>
  )
}

export function LucideIcon({ className, color, ...props }) {
  return (
    <StackSvg
      className={className}
      color={color}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      {...props}
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
    </StackSvg>
  )
}

export function RadixIcon({ className, color, ...props }) {
  return (
    <StackSvg className={className} color={color} fill="currentColor" {...props}>
      <path d="M12 3 4 7.5v9L12 21l8-4.5v-9L12 3zm0 2.2 5.5 3.1v6.2L12 17.6 6.5 14.5V8.4L12 5.2z" />
    </StackSvg>
  )
}

export function TiptapIcon({ className, color, ...props }) {
  return (
    <StackSvg className={className} color={color} fill="currentColor" {...props}>
      <path d="M6 5h12v2H8v10H6V5zm4 4h8v2h-8V9zm0 4h6v2h-6v-2z" />
    </StackSvg>
  )
}

export function RechartsIcon({ className, color, ...props }) {
  return (
    <StackSvg
      className={className}
      color={color}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      {...props}
    >
      <path d="M4 18V8M10 18V4M16 18v-6M22 18V10" strokeLinecap="round" />
    </StackSvg>
  )
}

export function ZustandIcon({ className, color, ...props }) {
  return (
    <StackSvg className={className} color={color} fill="currentColor" {...props}>
      <path d="M12 4c-3.5 2-6 4.5-6 8a6 6 0 0 0 12 0c0-3.5-2.5-6-6-8zm0 3.5c2.2 1.4 3.8 3 3.8 4.5a3.8 3.8 0 0 1-7.6 0c0-1.5 1.6-3.1 3.8-4.5z" />
    </StackSvg>
  )
}

export function ViteIcon({ className, color, ...props }) {
  return (
    <StackSvg className={className} color={color} fill="currentColor" {...props}>
      <path d="m12 3 9 16H3L12 3zm0 5.2L7.6 17h8.8L12 8.2z" />
    </StackSvg>
  )
}

const STACK_ICONS = {
  tailwind3: TailwindIcon,
  tailwind4: TailwindIcon,
  motion: MotionIcon,
  router: RouterIcon,
  lucide: LucideIcon,
  radix: RadixIcon,
  tiptap: TiptapIcon,
  recharts: RechartsIcon,
  zustand: ZustandIcon,
  vite: ViteIcon,
}

export function StackIcon({ id, className, color, ...props }) {
  const Icon = STACK_ICONS[id]
  if (!Icon) return null
  const resolvedColor = color ?? STACK_META[id]?.color
  return <Icon className={className} color={resolvedColor} {...props} />
}
