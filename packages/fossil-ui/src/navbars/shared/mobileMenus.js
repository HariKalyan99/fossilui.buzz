const EASE = 'ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none'
const FADE_ITEM = `transition-[opacity,translate,scale] duration-300 ${EASE}`
const LIST_LINK =
  'flex h-10 items-center rounded-md px-3 text-[14px] font-medium text-neutral-600 transition-colors hover:bg-neutral-50 data-[touch]:bg-neutral-50 hover:text-neutral-900 data-[touch]:text-neutral-900'

/**
 * Mobile menu presets. Each navbar variant opens its menu with a different motion and layout.
 *
 * - `animateHeight`: the header grows with the menu; otherwise it snaps open and waits for the
 *   exit motion before collapsing.
 * - `panel` / `panelState(open)`: the moving surface that holds the links.
 * - `item` / `itemState(open)` and `link` / `linkState(open)`: per-link classes; delays stagger by index.
 */
export const MOBILE_MENUS = {
  /** Classic accordion: the header grows downward and links fade in top to bottom. */
  dropdown: {
    animateHeight: true,
    panel: 'border-t border-neutral-200/80',
    list: 'flex flex-col gap-0.5 px-3 pb-4 pt-3',
    item: FADE_ITEM,
    itemState: (open) => (open ? 'translate-y-0 opacity-100' : '-translate-y-1.5 opacity-0'),
    link: LIST_LINK,
    linkActive: 'bg-neutral-100 text-neutral-900',
    ctaItem: 'pt-2',
  },

  /** Horizontal chips that pop in left to right. */
  pills: {
    panel: 'border-t border-neutral-200/80',
    list: 'flex flex-wrap gap-2 px-4 pb-4 pt-3',
    item: `origin-left ${FADE_ITEM}`,
    itemState: (open) => (open ? 'scale-100 opacity-100' : 'scale-75 opacity-0'),
    link: 'inline-flex h-9 items-center rounded-full border border-neutral-200 bg-white px-3.5 text-[13.5px] font-medium text-neutral-600 transition-colors hover:border-neutral-300 data-[touch]:border-neutral-300 hover:text-neutral-900 data-[touch]:text-neutral-900',
    linkActive: 'border-neutral-900 bg-neutral-900 text-white hover:border-neutral-900 data-[touch]:border-neutral-900 hover:text-white data-[touch]:text-white',
    ctaItem: 'basis-full pt-1',
    stagger: 35,
  },

  /** The whole panel slides in from the right edge; a side bar marks the active link. */
  drawerRight: {
    panel: `border-t border-neutral-200/80 transition-[translate,opacity] duration-[400ms] ${EASE}`,
    panelState: (open) => (open ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'),
    list: 'flex flex-col gap-0.5 px-3 pb-4 pt-3',
    link: `${LIST_LINK} rounded-none rounded-r-md border-l-2 border-transparent`,
    linkActive: 'border-neutral-900 bg-neutral-50 text-neutral-900',
    ctaItem: 'pt-2',
    stagger: 0,
  },

  /** Links cascade in from the left; the active one draws its underline. */
  cascadeLeft: {
    panel: 'border-t border-neutral-200/80',
    list: 'flex flex-col gap-0.5 px-3 pb-4 pt-3',
    item: FADE_ITEM,
    itemState: (open) => (open ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'),
    link: `${LIST_LINK} relative w-fit hover:bg-transparent data-[touch]:bg-transparent`,
    linkActive: 'text-neutral-900',
    underline: true,
    ctaItem: 'pt-2',
    stagger: 55,
  },

  /** Two-column tiles that zoom in from the center. */
  grid: {
    panel: 'border-t border-neutral-200/80',
    list: 'grid grid-cols-2 gap-2 px-4 pb-4 pt-3',
    item: `origin-center ${FADE_ITEM}`,
    itemState: (open) => (open ? 'scale-100 opacity-100' : 'scale-90 opacity-0'),
    link: 'relative flex h-12 items-center justify-center rounded-xl bg-neutral-50 text-[13.5px] font-medium text-neutral-600 transition-colors hover:bg-neutral-100 data-[touch]:bg-neutral-100 hover:text-neutral-900 data-[touch]:text-neutral-900',
    linkActive:
      'bg-indigo-50 text-indigo-700 after:absolute after:bottom-1.5 after:left-1/2 after:h-1.5 after:w-1.5 after:-translate-x-1/2 after:rounded-full after:bg-indigo-500 hover:bg-indigo-50 data-[touch]:bg-indigo-50',
    ctaItem: 'col-span-2 pt-1',
    stagger: 40,
  },

  /** Labels roll up from below, bottom link first. */
  rollUp: {
    panel: 'border-t border-neutral-200/80',
    list: 'flex flex-col gap-0.5 px-3 pb-4 pt-3',
    item: 'overflow-hidden',
    link: `${LIST_LINK} transition-[translate,color,background-color] duration-[450ms] ${EASE} [transition-delay:inherit]`,
    linkState: (open) => (open ? 'translate-y-0' : 'translate-y-full'),
    linkActive: 'bg-neutral-100 text-neutral-900',
    ctaItem: 'pt-2',
    stagger: 50,
    reverse: true,
  },

  /** A circular reveal grows out of the menu button's corner; hovering dims the other links. */
  circleReveal: {
    panel: `border-t border-neutral-200/80 transition-[clip-path] duration-500 ${EASE}`,
    panelState: (open) =>
      open ? '[clip-path:circle(150%_at_calc(100%_-_2rem)_0%)]' : '[clip-path:circle(0%_at_calc(100%_-_2rem)_0%)]',
    list: 'group/mlinks flex flex-col gap-0.5 px-3 pb-4 pt-3',
    link: `${LIST_LINK} transition-[opacity,color,background-color] duration-300 group-hover/mlinks:opacity-40 group-has-[[data-touch]]/mlinks:opacity-40 hover:!opacity-100 data-[touch]:!opacity-100`,
    linkActive: 'bg-neutral-100 text-neutral-900',
    ctaItem: 'pt-2',
    stagger: 0,
  },

  /** A detached frosted card scales out from the top-right corner. */
  floatingCard: {
    panel: `mx-2 mb-2 origin-top-right rounded-2xl border border-neutral-200/80 bg-white/80 shadow-[0_12px_32px_-16px_rgba(15,23,42,0.3)] backdrop-blur-md transition-[opacity,scale,translate] duration-300 ${EASE}`,
    panelState: (open) => (open ? 'translate-y-0 scale-100 opacity-100' : '-translate-y-1 scale-90 opacity-0'),
    list: 'flex flex-col gap-0.5 p-2',
    link: `${LIST_LINK} rounded-full`,
    linkActive: 'bg-neutral-900 text-white hover:bg-neutral-900 data-[touch]:bg-neutral-900 hover:text-white data-[touch]:text-white',
    ctaItem: 'pt-1',
    stagger: 0,
  },
}
