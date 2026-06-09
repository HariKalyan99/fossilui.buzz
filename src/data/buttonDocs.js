export const BUTTON_INSTALL_SNIPPET = `# Full component library
npm install @fossilui/react lucide-react

# Buttons-only package (lightweight)
npm install @fossilui/buttons lucide-react

# Required for both — Tailwind v4 (Vite)
npm install -D tailwindcss @tailwindcss/vite`

export const BUTTON_VITE_SNIPPET = `// vite.config.js
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})`

export const BUTTON_IMPORT_SNIPPET = `// Full library import
import {
  Button,
} from '@fossilui/react'

// OR buttons path inside @fossilui/react:
import { Button } from '@fossilui/react/button'

// OR standalone buttons package:
import { Button } from '@fossilui/buttons'

// OR ready template with all variants:
import { ButtonExample } from '@fossilui/buttons/example'`

export const BUTTON_TAILWIND_SNIPPET = `/* app.css */
@import "tailwindcss";`

export const BUTTON_TAILWIND_REACT_SNIPPET = `/* app.css — use with @fossilui/react */
@import "tailwindcss";
@source "../node_modules/@fossilui/react/dist";`

export const BUTTON_TAILWIND_BUTTONS_SNIPPET = `/* app.css — use with @fossilui/buttons */
@import "tailwindcss";
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
    property: 'motion',
    description: 'Animation style when using the standard <Button /> wrapper.',
    type: "'rollText' | 'staggerText' | 'slideFill' | 'shineSweep' | 'borderReveal' | 'iconSlide' | 'underlineGrow' | 'liftShadow' | 'letterSpacing' | 'skewFill'",
    default: "'liftShadow'",
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
    type: "'default' | 'primary' | 'secondary' | 'info' | 'teal' | 'cyan' | 'blue' | 'violet' | 'purple' | 'pink' | 'rose' | 'lime' | 'danger' | 'success' | 'warning'",
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
    description: 'Legacy shorthand (maps to variant + color).',
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
    description: 'Corner shape: `default` (rounded), `square` (no rounded edges), `round` (pill).',
    type: "'default' | 'square' | 'round'",
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

export const BUTTON_MOTION_COMPATIBILITY = [
  {
    motion: 'rollText',
    bestWith: 'solid / filled; medium-large labels; primary/default colors',
    limited: 'Very long labels with round shape can feel tight',
    notes: 'Best for primary CTAs where text animation is the main effect.',
  },
  {
    motion: 'staggerText',
    bestWith: 'filled / text; short labels; any semantic palette',
    limited: 'Long labels reduce stagger clarity',
    notes: 'Character-by-character lift uses color-aware hover accents for each palette.',
  },
  {
    motion: 'slideFill',
    bestWith: 'outlined; default/primary/success; medium size',
    limited: 'Ghost + outlined often feels too subtle',
    notes: 'Starts from white surface and reveals color fill on hover.',
  },
  {
    motion: 'shineSweep',
    bestWith: 'solid / filled; primary and danger',
    limited: 'Link variant provides little room for shine',
    notes: 'Great for directional actions with premium highlight feel.',
  },
  {
    motion: 'borderReveal',
    bestWith: 'outlined default look',
    limited: 'Color, variant, ghost, icon, loading are intentionally constrained',
    notes: 'Use as minimal editorial button with simple text content.',
  },
  {
    motion: 'iconSlide',
    bestWith: 'outlined / filled + icon + iconPlacement=end',
    limited: 'Without icon, effect falls back to label-only motion',
    notes: 'Ideal for “Continue”, “Explore”, “Next” style actions.',
  },
  {
    motion: 'underlineGrow',
    bestWith: 'text / link; medium size; concise labels',
    limited: 'Solid variant can hide underline emphasis',
    notes: 'Works well for navigation and doc links.',
  },
  {
    motion: 'liftShadow',
    bestWith: 'solid / outlined; all semantic colors; icon optional',
    limited: 'Very subtle on text/link variants',
    notes: 'Most flexible default motion for general CTAs.',
  },
  {
    motion: 'letterSpacing',
    bestWith: 'outlined / text; short uppercase or title-case labels',
    limited: 'Dense copy looks noisy',
    notes: 'Editorial style; great for brand-forward sections.',
  },
  {
    motion: 'skewFill',
    bestWith: 'outlined / solid; medium-large size; short labels',
    limited: 'Very long labels with round shape can feel tight',
    notes: 'High-energy motion for standout secondary actions.',
  },
]

export const BUTTON_EXAMPLES = [
  {
    title: 'Sizes and loading',
    description: 'Try changing size or toggling loading. Copy the snippet when it looks right.',
    defaultCode: `import { Button } from '@fossilui/react'

<Button motion="liftShadow" size="large" loading>
  Saving…
</Button>`,
  },
  {
    title: 'Danger + block',
    description: 'Combine danger and block for full-width destructive actions.',
    defaultCode: `import { Button } from '@fossilui/react'

<Button motion="liftShadow" danger block>
  Delete project
</Button>`,
  },
  {
    title: 'Outlined with icon',
    description: 'Use icon and iconPlacement with any lucide-react icon.',
    defaultCode: `import { Mail } from 'lucide-react'
import { Button } from '@fossilui/react'

<Button
  motion="liftShadow"
  color="primary"
  variant="outlined"
  icon={<Mail className="h-4 w-4" />}
  iconPlacement="end"
>
  Contact us
</Button>`,
  },
  {
    title: 'Link-style CTA',
    description: 'Use href for navigation; underline animations pair well with link variant.',
    defaultCode: `import { Button } from '@fossilui/react'

<Button
  motion="underlineGrow"
  href="https://fossilui.buzz"
  target="_blank"
  color="primary"
>
  Documentation
</Button>`,
  },
]

export const BUTTON_VARIANTS = [
  {
    id: 'roll-text',
    name: 'Roll text',
    description: 'Label rolls upward; a duplicate line slides into place.',
    component: 'RollTextButton',
    label: 'Fossil UI',
    snippet: `import { Button } from '@fossilui/react'

<Button motion="rollText">
  Fossil UI
</Button>`,
  },
  {
    id: 'stagger-letters',
    name: 'Stagger letters',
    description: 'Each character lifts with a short staggered delay.',
    component: 'StaggerTextButton',
    label: 'Fossil UI',
    snippet: `import { Button } from '@fossilui/react'

<Button motion="staggerText">
  Fossil UI
</Button>`,
  },
  {
    id: 'slide-fill',
    name: 'Slide fill',
    description: 'Accent background scales up from the bottom edge.',
    component: 'SlideFillButton',
    label: 'Fossil UI',
    snippet: `import { Button } from '@fossilui/react'

<Button motion="slideFill">
  Fossil UI
</Button>`,
  },
  {
    id: 'shine-sweep',
    name: 'Shine sweep',
    description: 'A diagonal highlight sweeps across on hover.',
    component: 'ShineSweepButton',
    label: 'Fossil UI',
    snippet: `import { Button } from '@fossilui/react'

<Button motion="shineSweep">
  Fossil UI
</Button>`,
  },
  {
    id: 'border-reveal',
    name: 'Border reveal',
    description: 'Hairlines grow from the center on the top and bottom.',
    component: 'BorderRevealButton',
    label: 'Fossil UI',
    snippet: `import { Button } from '@fossilui/react'

<Button motion="borderReveal">
  Fossil UI
</Button>`,
  },
  {
    id: 'icon-slide',
    name: 'Icon slide',
    description: 'Arrow slides in from the left; label shifts slightly right.',
    component: 'IconSlideButton',
    label: 'Fossil UI',
    snippet: `import { Button } from '@fossilui/react'

<Button motion="iconSlide">
  Fossil UI
</Button>`,
  },
  {
    id: 'underline-grow',
    name: 'Underline grow',
    description: 'Indigo underline expands from the center on hover.',
    component: 'UnderlineGrowButton',
    label: 'Fossil UI',
    snippet: `import { Button } from '@fossilui/react'

<Button motion="underlineGrow">
  Fossil UI
</Button>`,
  },
  {
    id: 'lift-shadow',
    name: 'Lift shadow',
    description: 'Button rises with a soft indigo glow beneath it.',
    component: 'LiftShadowButton',
    label: 'Fossil UI',
    snippet: `import { Button } from '@fossilui/react'

<Button motion="liftShadow">
  Fossil UI
</Button>`,
  },
  {
    id: 'outlined-icon',
    name: 'Outlined + icon',
    description: 'Primary outline with end icon — standard contact / CTA pattern.',
    component: 'LiftShadowButton',
    label: 'Contact us',
    snippet: `import { Mail } from 'lucide-react'
import { Button } from '@fossilui/react'

<Button
  motion="liftShadow"
  color="primary"
  variant="outlined"
  icon={<Mail className="h-4 w-4" />}
  iconPlacement="end"
>
  Contact us
</Button>`,
  },
  {
    id: 'letter-spacing',
    name: 'Letter spacing',
    description: 'Tracking widens smoothly for an airy, editorial feel.',
    component: 'LetterSpacingButton',
    label: 'Fossil UI',
    snippet: `import { Button } from '@fossilui/react'

<Button motion="letterSpacing">
  Fossil UI
</Button>`,
  },
  {
    id: 'skew-fill',
    name: 'Skew fill',
    description: 'Skewed panel sweeps in from the left and inverts the text.',
    component: 'SkewFillButton',
    label: 'Fossil UI',
    snippet: `import { Button } from '@fossilui/react'

<Button motion="skewFill">
  Fossil UI
</Button>`,
  },
]

export const BUTTON_FAQS = [
  {
    q: 'Do I need Tailwind CSS?',
    a: 'Yes. Install tailwindcss and @tailwindcss/vite, enable the Vite plugin, and add @import "tailwindcss" in your CSS. Without Tailwind, components mount but look unstyled.',
  },
  {
    q: 'Which @source path should I add?',
    a: 'Add only the @source line for the package you installed. Full library: @source "../node_modules/@fossilui/react/dist". Buttons-only: @source "../node_modules/@fossilui/buttons/dist". See the separate Tailwind snippets in Import — do not add both unless you installed both packages.',
  },
  {
    q: 'Does the configurator sync controls and code both ways?',
    a: 'Yes. The control panel and code editor share one source of truth. Changing controls updates code + preview, and valid code edits update controls + preview. If code is temporarily invalid while typing, the UI shows a parse warning and keeps a safe fallback preview.',
  },
  {
    q: 'How is text contrast handled across colors?',
    a: 'Foreground text is contrast-aware for light and dark fills. Motions such as slideFill and staggerText use semantic color tokens (including hover text) so each palette stays readable without hardcoded single-color behavior.',
  },
  {
    q: 'Can I use these in Next.js or Remix?',
    a: 'Yes. Install the package, add the Tailwind source path, and import components in client components ("use client" in the App Router) because buttons rely on hover and browser APIs.',
  },
  {
    q: 'Why does my loading button hide the label?',
    a: 'From v0.1.0 onward, loading shows a spinner and keeps the label visible. Upgrade @fossilui/react or @fossilui/buttons if you still see label-only spinners.',
  },
  {
    q: 'Which button should I pick?',
    a: 'Use LiftShadow or RollText for primary CTAs, IconSlide or ShineSweep for forward navigation, and BorderReveal or LetterSpacing for minimal editorial layouts. See When to use for more guidance.',
  },
  {
    q: 'Can I pass className or override styles?',
    a: 'Yes. className merges on the root. For finer control, use classNames and styles on root, icon, and content slots.',
  },
  {
    q: 'Do animations work on touch devices?',
    a: 'Hover effects respond to tap on most touch browsers. For critical actions, do not rely on hover alone — keep labels clear and use loading or disabled states where needed.',
  },
]
