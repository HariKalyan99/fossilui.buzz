export const BUTTON_INSTALL_SNIPPET = `# Full component library
npm install @fossilui/react lucide-react

# Buttons-only package (lightweight)
npm install @fossilui/buttons lucide-react`

export const BUTTON_IMPORT_SNIPPET = `// Full library import
import {
  RollTextButton,
  LiftShadowButton,
  IconSlideButton,
} from '@fossilui/react'

// Buttons path inside @fossilui/react:
import { ShineSweepButton } from '@fossilui/react/button'

// Standalone buttons package:
import { ShineSweepButton } from '@fossilui/buttons'

// Ready template with all variants:
import { ButtonExample } from '@fossilui/buttons/example'`

export const BUTTON_TAILWIND_SNIPPET = `/* app.css */
@import "tailwindcss";

/* keep @fossilui/react if you install the full library */
@source "../node_modules/@fossilui/react/dist";

/* add this for buttons-only install */
@source "../node_modules/@fossilui/buttons/dist";`

export const WHEN_TO_USE = [
  {
    title: 'Primary actions with motion',
    body: 'Use LiftShadowButton or RollTextButton for hero CTAs and key conversions where hover feedback should feel premium without heavy animation libraries.',
  },
  {
    title: 'Editorial / brand moments',
    body: 'LetterSpacingButton, BorderRevealButton, and UnderlineGrowButton suit minimal layouts, portfolios, and fashion or editorial sites.',
  },
  {
    title: 'Directional navigation',
    body: 'IconSlideButton and ShineSweepButton work well for “Continue”, “View project”, or card actions that imply forward movement.',
  },
  {
    title: 'Playful micro-interactions',
    body: 'StaggerTextButton and SkewFillButton add personality to secondary actions, filters, or tags without dominating the page.',
  },
  {
    title: 'When not to use',
    body: 'Avoid animated buttons for destructive flows without clear copy, dense data tables, or anywhere `loading` / `disabled` states must stay visually calm. Prefer plain buttons for form submits that fire immediately.',
  },
]

export const BUTTON_PROPS = [
  {
    property: 'children',
    description: 'Button label. String recommended for roll, stagger, and letter-spacing animations.',
    type: 'ReactNode',
    default: '—',
  },
  {
    property: 'size',
    description: 'Control height, padding, and type scale.',
    type: "'small' | 'medium' | 'large'",
    default: "'medium'",
  },
  {
    property: 'color',
    description: 'Semantic color for fills, borders, and accents.',
    type: "'default' | 'primary' | 'danger' | 'success' | 'warning'",
    default: 'Per variant',
  },
  {
    property: 'variant',
    description: 'Visual style: solid, outlined, dashed, filled, text, or link.',
    type: "'solid' | 'outlined' | 'dashed' | 'filled' | 'text' | 'link'",
    default: 'Per variant',
  },
  {
    property: 'type',
    description: 'Ant Design legacy shorthand (maps to variant + color).',
    type: "'primary' | 'default' | 'dashed' | 'link' | 'text'",
    default: '—',
  },
  {
    property: 'danger',
    description: 'Shortcut for danger color.',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'ghost',
    description: 'Transparent background; keeps semantic text color.',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'loading',
    description: 'Shows spinner and disables interaction. Object form supports delay and custom icon.',
    type: 'boolean | { delay?: number, icon?: ReactNode }',
    default: 'false',
  },
  {
    property: 'disabled',
    description: 'Disabled state.',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'block',
    description: 'Full width of parent container.',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'icon',
    description: 'Icon element. IconSlideButton uses this for the sliding icon.',
    type: 'ReactNode',
    default: '—',
  },
  {
    property: 'iconPlacement',
    description: 'Position of icon relative to label.',
    type: "'start' | 'end'",
    default: "'start'",
  },
  {
    property: 'shape',
    description: 'Corner shape of the button.',
    type: "'default' | 'circle' | 'round'",
    default: "'default'",
  },
  {
    property: 'href',
    description: 'When set, renders an anchor instead of a button.',
    type: 'string',
    default: '—',
  },
  {
    property: 'target',
    description: 'Anchor target when href is set.',
    type: 'string',
    default: '—',
  },
  {
    property: 'htmlType',
    description: 'Native button type attribute.',
    type: "'button' | 'submit' | 'reset'",
    default: "'button'",
  },
  {
    property: 'autoInsertSpace',
    description: 'Insert space between adjacent CJK characters in the label.',
    type: 'boolean',
    default: 'true',
  },
  {
    property: 'className',
    description: 'Extra classes merged onto the root element.',
    type: 'string',
    default: '—',
  },
  {
    property: 'classNames',
    description: 'Per-part classes for root, icon, and content.',
    type: 'Record<"root" | "icon" | "content", string> | (info) => Record',
    default: '—',
  },
  {
    property: 'styles',
    description: 'Per-part inline styles for root, icon, and content.',
    type: 'Record<"root" | "icon" | "content", CSSProperties> | (info) => Record',
    default: '—',
  },
  {
    property: 'onClick',
    description: 'Click handler (and other native button / anchor attributes pass through).',
    type: 'MouseEventHandler',
    default: '—',
  },
]

export const BUTTON_EXAMPLES = [
  {
    title: 'Sizes and loading',
    description: 'Try changing size or toggling loading. Copy the snippet when it looks right.',
    defaultCode: `import { LiftShadowButton } from '@fossilui/react'

<LiftShadowButton size="large" loading>
  Saving…
</LiftShadowButton>`,
  },
  {
    title: 'Danger + block',
    description: 'Combine danger and block for full-width destructive actions.',
    defaultCode: `import { LiftShadowButton } from '@fossilui/react'

<LiftShadowButton danger block>
  Delete project
</LiftShadowButton>`,
  },
  {
    title: 'Outlined with icon',
    description: 'Use icon and iconPlacement with any lucide-react icon.',
    defaultCode: `import { Mail } from 'lucide-react'
import { LiftShadowButton } from '@fossilui/react'

<LiftShadowButton
  color="primary"
  variant="outlined"
  icon={<Mail className="h-4 w-4" />}
  iconPlacement="end"
>
  Contact us
</LiftShadowButton>`,
  },
  {
    title: 'Link-style CTA',
    description: 'Use href for navigation; underline animations pair well with link variant.',
    defaultCode: `import { UnderlineGrowButton } from '@fossilui/react'

<UnderlineGrowButton
  href="https://fossilui.buzz"
  target="_blank"
  color="primary"
>
  Documentation
</UnderlineGrowButton>`,
  },
]

export const BUTTON_VARIANTS = [
  {
    id: 'roll-text',
    name: 'Roll text',
    description: 'Label rolls upward; a duplicate line slides into place.',
    component: 'RollTextButton',
    label: 'Fossil UI',
    snippet: `import { RollTextButton } from '@fossilui/react'

<RollTextButton>
  Fossil UI
</RollTextButton>`,
  },
  {
    id: 'stagger-letters',
    name: 'Stagger letters',
    description: 'Each character lifts with a short staggered delay.',
    component: 'StaggerTextButton',
    label: 'Fossil UI',
    snippet: `import { StaggerTextButton } from '@fossilui/react'

<StaggerTextButton>
  Fossil UI
</StaggerTextButton>`,
  },
  {
    id: 'slide-fill',
    name: 'Slide fill',
    description: 'Accent background scales up from the bottom edge.',
    component: 'SlideFillButton',
    label: 'Fossil UI',
    snippet: `import { SlideFillButton } from '@fossilui/react'

<SlideFillButton>
  Fossil UI
</SlideFillButton>`,
  },
  {
    id: 'shine-sweep',
    name: 'Shine sweep',
    description: 'A diagonal highlight sweeps across on hover.',
    component: 'ShineSweepButton',
    label: 'Fossil UI',
    snippet: `import { ShineSweepButton } from '@fossilui/react'

<ShineSweepButton>
  Fossil UI
</ShineSweepButton>`,
  },
  {
    id: 'border-reveal',
    name: 'Border reveal',
    description: 'Hairlines grow from the center on the top and bottom.',
    component: 'BorderRevealButton',
    label: 'Fossil UI',
    snippet: `import { BorderRevealButton } from '@fossilui/react'

<BorderRevealButton>
  Fossil UI
</BorderRevealButton>`,
  },
  {
    id: 'icon-slide',
    name: 'Icon slide',
    description: 'Arrow slides in from the left; label shifts slightly right.',
    component: 'IconSlideButton',
    label: 'Fossil UI',
    snippet: `import { IconSlideButton } from '@fossilui/react'

<IconSlideButton>
  Fossil UI
</IconSlideButton>`,
  },
  {
    id: 'underline-grow',
    name: 'Underline grow',
    description: 'Indigo underline expands from the center on hover.',
    component: 'UnderlineGrowButton',
    label: 'Fossil UI',
    snippet: `import { UnderlineGrowButton } from '@fossilui/react'

<UnderlineGrowButton>
  Fossil UI
</UnderlineGrowButton>`,
  },
  {
    id: 'lift-shadow',
    name: 'Lift shadow',
    description: 'Button rises with a soft indigo glow beneath it.',
    component: 'LiftShadowButton',
    label: 'Fossil UI',
    snippet: `import { LiftShadowButton } from '@fossilui/react'

<LiftShadowButton>
  Fossil UI
</LiftShadowButton>`,
  },
  {
    id: 'outlined-icon',
    name: 'Outlined + icon',
    description: 'Primary outline with end icon — standard contact / CTA pattern.',
    component: 'LiftShadowButton',
    label: 'Contact us',
    snippet: `import { Mail } from 'lucide-react'
import { LiftShadowButton } from '@fossilui/react'

<LiftShadowButton
  color="primary"
  variant="outlined"
  icon={<Mail className="h-4 w-4" />}
  iconPlacement="end"
>
  Contact us
</LiftShadowButton>`,
  },
  {
    id: 'letter-spacing',
    name: 'Letter spacing',
    description: 'Tracking widens smoothly for an airy, editorial feel.',
    component: 'LetterSpacingButton',
    label: 'Fossil UI',
    snippet: `import { LetterSpacingButton } from '@fossilui/react'

<LetterSpacingButton>
  Fossil UI
</LetterSpacingButton>`,
  },
  {
    id: 'skew-fill',
    name: 'Skew fill',
    description: 'Skewed panel sweeps in from the left and inverts the text.',
    component: 'SkewFillButton',
    label: 'Fossil UI',
    snippet: `import { SkewFillButton } from '@fossilui/react'

<SkewFillButton>
  Fossil UI
</SkewFillButton>`,
  },
]

export const BUTTON_FAQS = [
  {
    q: 'Do I need Tailwind CSS?',
    a: 'Yes. Both @fossilui/react and @fossilui/buttons use Tailwind utility classes. Add the matching @source entry in your CSS so Tailwind scans the installed package.',
  },
  {
    q: 'Can I use these in Next.js or Remix?',
    a: 'Yes. Install the package, add the Tailwind source path, and import components in client components ("use client" in the App Router) because buttons rely on hover and browser APIs.',
  },
  {
    q: 'Why does my loading button hide the label?',
    a: 'From v0.1.0 onward, loading shows a spinner and keeps the label visible (Ant Design style). Upgrade @fossilui/react or @fossilui/buttons if you still see label-only spinners.',
  },
  {
    q: 'Which button should I pick?',
    a: 'Use LiftShadow or RollText for primary CTAs, IconSlide or ShineSweep for forward navigation, and BorderReveal or LetterSpacing for minimal editorial layouts. See When to use for more guidance.',
  },
  {
    q: 'Can I pass className or override styles?',
    a: 'Yes. className merges on the root. For finer control, use classNames and styles on root, icon, and content slots — same pattern as Ant Design.',
  },
  {
    q: 'Do animations work on touch devices?',
    a: 'Hover effects respond to tap on most touch browsers. For critical actions, do not rely on hover alone — keep labels clear and use loading or disabled states where needed.',
  },
]
