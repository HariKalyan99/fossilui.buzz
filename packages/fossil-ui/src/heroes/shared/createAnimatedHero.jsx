import { forwardRef, useCallback, useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { cn } from '../../lib/cn.js'
import { TRANSITION_MOTION, useInViewOnce, useReducedMotion } from '../../lib/motion.js'
import { HERO_ALIGNS, HERO_BACKGROUNDS } from './constants.js'

const EASE_OUT = 'ease-[cubic-bezier(0.22,1,0.36,1)]'

export const HERO_ITEM_MOTIONS = {
  fadeUp: {
    transition: `${TRANSITION_MOTION} duration-700 ${EASE_OUT}`,
    hidden: 'opacity-0 translate-y-5',
    shown: 'opacity-100 translate-y-0',
  },
  blur: {
    transition: `${TRANSITION_MOTION} duration-[900ms] ${EASE_OUT}`,
    hidden: 'opacity-0 blur-md translate-y-2',
    shown: 'opacity-100 blur-none translate-y-0',
  },
}

const BACKGROUND_CLASSES = {
  grid: 'bg-[radial-gradient(rgba(15,23,42,0.08)_1px,transparent_1px)] bg-[length:22px_22px] [mask-image:radial-gradient(ellipse_70%_65%_at_50%_40%,black,transparent)]',
  glow: 'bg-[radial-gradient(60%_55%_at_50%_0%,rgba(99,102,241,0.18),transparent_70%)]',
  none: '',
}

export const HERO_TITLE =
  'text-[2rem] font-semibold leading-[1.08] tracking-[-0.03em] text-neutral-900 text-balance @xl:text-[2.6rem] @3xl:text-[3.4rem]'

/**
 * @typedef {import('react').HTMLAttributes<HTMLElement> & {
 *   eyebrow?: import('react').ReactNode
 *   title?: string
 *   description?: import('react').ReactNode
 *   primaryLabel?: string
 *   primaryHref?: string
 *   secondaryLabel?: string
 *   secondaryHref?: string
 *   align?: 'center' | 'left'
 *   background?: 'grid' | 'glow' | 'none'
 * }} FossilHeroProps
 */

/**
 * Factory for hero sections whose content animates in when scrolled into view.
 *
 * @param {object} config
 * @param {string} config.displayName
 * @param {{ transition: string, hidden: string, shown: string }} [config.itemMotion]
 * @param {import('react').ComponentType<{ title: string, shown: boolean, reduceMotion: boolean, item: Function }>} [config.Title]
 * @param {import('react').ComponentType<{ reduceMotion: boolean }>} [config.Overlay]
 */
export function createAnimatedHero({ displayName, itemMotion = HERO_ITEM_MOTIONS.fadeUp, Title, Overlay }) {
  const Component = forwardRef(function AnimatedHero(props, ref) {
    const {
      eyebrow,
      title,
      description,
      primaryLabel,
      primaryHref,
      secondaryLabel,
      secondaryHref,
      align = 'center',
      background = 'grid',
      children,
      className,
      ...rest
    } = props

    const rootRef = useRef(null)
    const reduceMotion = useReducedMotion()
    const shown = useInViewOnce(rootRef, reduceMotion)
    const safeAlign = HERO_ALIGNS.includes(align) ? align : 'center'
    const safeBackground = HERO_BACKGROUNDS.includes(background) ? background : 'grid'

    const setRootRef = useCallback(
      (node) => {
        rootRef.current = node
        if (typeof ref === 'function') ref(node)
        else if (ref) ref.current = node
      },
      [ref],
    )

    /** Staggered entrance props for the nth piece of content. */
    const item = (index, className) => ({
      className: cn(itemMotion.transition, 'motion-reduce:transition-none', shown ? itemMotion.shown : itemMotion.hidden, className),
      style: { transitionDelay: shown ? `${index * 90}ms` : '0ms' },
    })

    const PrimaryTag = primaryHref ? 'a' : 'button'
    const SecondaryTag = secondaryHref ? 'a' : 'button'

    return (
      <section
        ref={setRootRef}
        className={cn(
          'group/hero @container relative isolate w-full overflow-hidden bg-white px-6 py-16 @2xl:px-10 @2xl:py-24',
          className,
        )}
        {...rest}
      >
        {safeBackground !== 'none' ? (
          <div aria-hidden className={cn('pointer-events-none absolute inset-0 -z-10', BACKGROUND_CLASSES[safeBackground])} />
        ) : null}
        {Overlay ? <Overlay reduceMotion={reduceMotion} /> : null}

        <div
          className={cn(
            'relative mx-auto flex max-w-3xl flex-col gap-5',
            safeAlign === 'center' ? 'items-center text-center' : 'items-start text-left',
          )}
        >
          {eyebrow ? (
            <div {...item(0)}>
              <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/80 px-3 py-1 text-[12px] font-medium text-neutral-600 backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                {eyebrow}
              </span>
            </div>
          ) : null}

          {title ? (
            <h1 className={HERO_TITLE}>
              {Title && typeof title === 'string' ? (
                <Title title={title} shown={shown} reduceMotion={reduceMotion} item={item} />
              ) : (
                <span {...item(1, 'block')}>{title}</span>
              )}
            </h1>
          ) : null}

          {description ? (
            <p {...item(2, 'max-w-xl text-[15px] leading-relaxed text-neutral-600 @xl:text-[16.5px]')}>{description}</p>
          ) : null}

          {primaryLabel || secondaryLabel ? (
            <div
              {...item(
                3,
                cn('mt-2 flex flex-wrap gap-3', safeAlign === 'center' ? 'justify-center' : 'justify-start'),
              )}
            >
              {primaryLabel ? (
                <PrimaryTag
                  href={primaryHref}
                  type={primaryHref ? undefined : 'button'}
                  className="group/cta inline-flex h-11 items-center gap-2 rounded-lg bg-neutral-900 px-5 text-[14px] font-medium text-white shadow-[0_8px_20px_-10px_rgba(15,23,42,0.5)] transition-[background-color,translate,box-shadow] duration-300 hover:-translate-y-0.5 hover:bg-neutral-800 hover:shadow-[0_14px_28px_-12px_rgba(15,23,42,0.55)]"
                >
                  {primaryLabel}
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-1"
                    strokeWidth={2}
                  />
                </PrimaryTag>
              ) : null}
              {secondaryLabel ? (
                <SecondaryTag
                  href={secondaryHref}
                  type={secondaryHref ? undefined : 'button'}
                  className="inline-flex h-11 items-center rounded-lg border border-neutral-200 bg-white px-5 text-[14px] font-medium text-neutral-800 transition-colors hover:border-neutral-300 hover:bg-neutral-50"
                >
                  {secondaryLabel}
                </SecondaryTag>
              ) : null}
            </div>
          ) : null}

          {children ? <div {...item(4, 'w-full')}>{children}</div> : null}
        </div>
      </section>
    )
  })
  Component.displayName = displayName
  return Component
}
