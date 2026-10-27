import { cn } from '../lib/cn.js'
import { CardBody, CardMedia } from './shared/CardContent.jsx'
import { createAnimatedCard } from './shared/createAnimatedCard.jsx'

/** Background gradient wash fades in over the card on hover. */
export const GradientShiftCard = createAnimatedCard({
  displayName: 'GradientShiftCard',
  animationClassName: ({ interactive = true }) =>
    cn(
      'overflow-hidden',
      interactive &&
        'transition-[border-color,box-shadow] delay-[var(--fossil-delay,0ms)] duration-[var(--fossil-duration,500ms)] ease-[var(--fossil-ease,ease-out)] hover:border-indigo-200/80 data-[touch]:border-indigo-200/80 hover:shadow-[0_8px_28px_-14px_rgba(99,102,241,0.28)] data-[touch]:shadow-[0_8px_28px_-14px_rgba(99,102,241,0.28)]',
    ),
  renderContent: (prepared) => (
    <>
      <CardMedia
        accent={prepared.accent}
        media={prepared.media}
        imageSrc={prepared.imageSrc}
        imageFallback={prepared.imageFallback}
        imageAlt={prepared.imageAlt}
        withMedia={prepared.withMedia}
      />
      {prepared.interactive ? (
        <span
          aria-hidden
          className={cn(
            'pointer-events-none absolute inset-0 z-[1]',
            'bg-gradient-to-br from-indigo-400/35 via-violet-300/15 to-fuchsia-400/30',
            'opacity-0 transition-opacity delay-[var(--fossil-delay,0ms)] duration-[var(--fossil-duration,500ms)] ease-[var(--fossil-ease,ease-out)] group-hover:opacity-100 group-data-[touch]:opacity-100',
          )}
        />
      ) : null}
      <CardBody
        title={prepared.title}
        description={prepared.description}
        size={prepared.size}
        bodyClassName="relative z-[2]"
      >
        {prepared.children}
      </CardBody>
    </>
  ),
})
