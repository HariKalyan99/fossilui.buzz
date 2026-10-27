import { useMemo, useState } from 'react'
import { ToastProvider, TOAST_MOTIONS, useToast } from '@fossilui/react'
import { CodeEditor } from '../code/CodeEditor'
import { DemoTrigger } from '../modals/DemoTrigger'
import { SELECT_CLASS } from '../docs/ComponentConfigurator'
import { TimingInputs } from '../docs/TimingInputs'
import { TOAST_DEMO, toastSnippet } from '../../data/toastDocs'
import { cn } from '../../lib/cn'

const MOTIONS = [...TOAST_MOTIONS]
const TONES = ['info', 'success', 'warning', 'error']

const DEFAULTS = {
  motion: 'slide',
  tone: TOAST_DEMO.tone,
  title: TOAST_DEMO.title,
  description: TOAST_DEMO.description,
  duration: TOAST_DEMO.duration,
  enterDuration: '',
  easing: '',
  delay: '',
}

function readSnippet(code) {
  if (!code.includes('<ToastProvider') || !code.includes('toast(')) {
    return { error: 'Keep the <ToastProvider> and the toast({ ... }) call so the preview can read them.' }
  }
  const motionMatch = /motion="([A-Za-z]+)"/.exec(code)?.[1]
  const motion = MOTIONS.includes(motionMatch) ? motionMatch : DEFAULTS.motion
  const tone = /tone:\s*['"](info|success|warning|error)['"]/.exec(code)?.[1] ?? DEFAULTS.tone
  const title = /title:\s*['"]([^'"]*)['"]/.exec(code)?.[1] ?? DEFAULTS.title
  const description = /description:\s*['"]([^'"]*)['"]/.exec(code)?.[1] ?? ''
  const durationMatch = /(?<!enter)duration:\s*(\d+)/.exec(code)
  const enterMatch = /enterDuration:\s*(-?\d+)/.exec(code)
  const easing = /easing:\s*['"]([^'"]*)['"]/.exec(code)?.[1] ?? ''
  const delayMatch = /delay:\s*(-?\d+)/.exec(code)
  return {
    error: null,
    motion: MOTIONS.includes(motion) ? motion : DEFAULTS.motion,
    tone: TONES.includes(tone) ? tone : DEFAULTS.tone,
    title,
    description,
    duration: durationMatch ? Number(durationMatch[1]) : DEFAULTS.duration,
    enterDuration: enterMatch ? enterMatch[1] : '',
    easing,
    delay: delayMatch ? delayMatch[1] : '',
  }
}

function ShowToastButton({ payload, label }) {
  const { toast } = useToast()
  return (
    <DemoTrigger
      onClick={() =>
        toast({
          title: payload.title,
          description: payload.description,
          tone: payload.tone,
          duration: Number(payload.duration) || 0,
          ...(payload.enterDuration !== '' && Number.isFinite(Number(payload.enterDuration))
            ? { enterDuration: Number(payload.enterDuration) }
            : {}),
          ...(payload.easing ? { easing: payload.easing } : {}),
          ...(payload.delay !== '' && Number.isFinite(Number(payload.delay)) ? { delay: Number(payload.delay) } : {}),
        })
      }
    >
      {label}
    </DemoTrigger>
  )
}

export function ToastConfigurator() {
  const [state, setState] = useState(DEFAULTS)
  const [code, setCode] = useState(() => toastSnippet(DEFAULTS))
  const parsed = useMemo(() => readSnippet(code), [code])

  const update = (key, value) => {
    const next = { ...state, [key]: value }
    setState(next)
    setCode(toastSnippet(next))
  }

  const updateCode = (value) => {
    setCode(value)
    const result = readSnippet(value)
    if (!result.error) {
      setState({
        motion: result.motion,
        tone: result.tone,
        title: result.title,
        description: result.description,
        duration: result.duration,
        enterDuration: result.enterDuration,
        easing: result.easing,
        delay: result.delay,
      })
    }
  }

  const payload = parsed.error ? state : parsed

  return (
    <article className="card min-w-0 overflow-hidden">
      <div className="border-b border-neutral-200/80 px-4 py-4 sm:px-5 sm:py-5">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-[15px] font-medium text-neutral-900 sm:text-base">Interactive configurator</h3>
          <button
            type="button"
            onClick={() => {
              setState(DEFAULTS)
              setCode(toastSnippet(DEFAULTS))
            }}
            className="inline-flex h-8 items-center rounded-md border border-neutral-200 bg-white px-3 text-[12px] font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
          >
            Reset
          </button>
        </div>
        <p className="mt-1.5 text-[13px] leading-relaxed text-neutral-500">
          The snippet is the real call: one provider, then toast(). Visible time is how long it stays. Enter duration, easing, and delay change the entrance. An easing the browser rejects is ignored.
        </p>
      </div>

      <div className="grid min-w-0 gap-0 xl:grid-cols-[1.05fr_1fr]">
        <div className="min-w-0 border-b border-neutral-200/80 p-4 sm:p-5 xl:border-r xl:border-b-0">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
            <label className="min-w-0 space-y-1.5">
              <span className="text-[12px] font-medium text-neutral-600">Motion</span>
              <select value={state.motion} onChange={(event) => update('motion', event.target.value)} className={SELECT_CLASS}>
                {MOTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            <label className="min-w-0 space-y-1.5">
              <span className="text-[12px] font-medium text-neutral-600">Tone</span>
              <select value={state.tone} onChange={(event) => update('tone', event.target.value)} className={SELECT_CLASS}>
                {TONES.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            <label className="min-w-0 space-y-1.5">
              <span className="text-[12px] font-medium text-neutral-600">Title</span>
              <input value={state.title} onChange={(event) => update('title', event.target.value)} className={cn(SELECT_CLASS, 'px-2.5')} />
            </label>
            <label className="min-w-0 space-y-1.5">
              <span className="text-[12px] font-medium text-neutral-600">Visible (ms)</span>
              <input
                value={state.duration}
                inputMode="numeric"
                onChange={(event) => update('duration', event.target.value.replace(/[^\d]/g, ''))}
                className={cn(SELECT_CLASS, 'px-2.5')}
              />
            </label>
            <TimingInputs
              durationLabel="Enter duration (ms)"
              values={{ duration: state.enterDuration, easing: state.easing, delay: state.delay }}
              onChange={(key, value) => update(key === 'duration' ? 'enterDuration' : key, value)}
            />
            <label className="min-w-0 space-y-1.5 md:col-span-2">
              <span className="text-[12px] font-medium text-neutral-600">Description</span>
              <input
                value={state.description}
                onChange={(event) => update('description', event.target.value)}
                className={cn(SELECT_CLASS, 'px-2.5')}
              />
            </label>
          </div>
        </div>

        <div className="min-w-0 space-y-4 p-4 sm:p-5">
          <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.14em] text-neutral-400">Code</p>
          <CodeEditor value={code} onChange={updateCode} minHeight="220px" />
          {parsed.error ? <p className="text-[12px] text-amber-700">Snippet parse warning: {parsed.error}</p> : null}
        </div>
      </div>

      <div className="border-t border-neutral-200/80 p-4 sm:p-5">
        <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.14em] text-neutral-400">Preview</p>
        <div className="relative flex min-h-[16rem] items-end justify-center overflow-hidden rounded-lg border border-dashed border-neutral-200 bg-neutral-50/90 p-4 pb-6">
          <ToastProvider key={payload.motion} motion={payload.motion} contained>
            <ShowToastButton payload={payload} label={payload.motion === 'stack' ? 'Add to stack' : 'Show toast'} />
          </ToastProvider>
        </div>
      </div>
    </article>
  )
}
