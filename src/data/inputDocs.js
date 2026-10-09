import { importGuideSnippets, importSnippet, sharedFaqs } from './sharedDocs'

export const INPUT_PACKAGE = { label: 'Inputs', packageName: '@fossilui/inputs' }

export const INPUT_IMPORT_SNIPPETS = importGuideSnippets(INPUT_PACKAGE)

export const INPUT_IMPORT_SNIPPET = importSnippet({
  names: ['Input'],
  subpath: 'inputs',
  packageName: INPUT_PACKAGE.packageName,
})

export const INPUT_DEMO = {
  label: 'Email address',
  placeholder: 'you@company.com',
  type: 'email',
}

export function inputSnippet(attrs) {
  const lines = attrs.map((attr) => `  ${attr}`).join('\n')
  return `import { Input } from '@fossilui/react'

<Input
${lines}
/>`
}

function demoSnippet(motion) {
  return inputSnippet([
    `motion="${motion}"`,
    `label="${INPUT_DEMO.label}"`,
    `type="${INPUT_DEMO.type}"`,
    `placeholder="${INPUT_DEMO.placeholder}"`,
  ])
}

export const INPUT_VARIANTS = [
  {
    id: 'focus-glow',
    name: 'Focus glow',
    description: 'Soft indigo ring blooms around the field on focus.',
    component: 'FocusGlowInput',
    snippet: demoSnippet('focusGlow'),
  },
  {
    id: 'floating-label',
    name: 'Floating label',
    description: 'Label rests inside the field and floats up when typing.',
    component: 'FloatingLabelInput',
    snippet: demoSnippet('floatingLabel'),
  },
  {
    id: 'underline-grow',
    name: 'Underline grow',
    description: 'Minimal line field with an underline that grows from the center.',
    component: 'UnderlineGrowInput',
    snippet: demoSnippet('underlineGrow'),
  },
  {
    id: 'gradient-border',
    name: 'Gradient border',
    description: 'A multi-color gradient border fades in and keeps flowing around the field while focused.',
    component: 'GradientBorderInput',
    snippet: demoSnippet('gradientBorder'),
  },
  {
    id: 'icon-pop',
    name: 'Icon pop',
    description: 'Leading icon pops and tints when the field is focused.',
    component: 'IconPopInput',
    snippet: demoSnippet('iconPop'),
  },
  {
    id: 'fill-sweep',
    name: 'Fill sweep',
    description: 'Tinted background sweeps in from the left on focus.',
    component: 'FillSweepInput',
    snippet: demoSnippet('fillSweep'),
  },
  {
    id: 'placeholder-slide',
    name: 'Placeholder slide',
    description: 'Placeholder drifts right and fades as the field gains focus.',
    component: 'PlaceholderSlideInput',
    snippet: demoSnippet('placeholderSlide'),
  },
  {
    id: 'border-draw',
    name: 'Border draw',
    description: 'Border traces itself around the field, edge by edge.',
    component: 'BorderDrawInput',
    snippet: demoSnippet('borderDraw'),
  },
]

export const INPUT_WHEN_TO_USE = [
  {
    title: 'Sign-up and contact forms',
    body: 'FocusGlowInput and FloatingLabelInput give clear focus feedback while keeping labels visible — good defaults for conversion forms.',
  },
  {
    title: 'Search and filters',
    body: 'IconPopInput comes with a search icon by default and suits toolbars, command bars, and filter rows.',
  },
  {
    title: 'Editorial and minimal layouts',
    body: 'UnderlineGrowInput and PlaceholderSlideInput disappear into the page until focused — great for newsletters and checkout steps.',
  },
  {
    title: 'Brand moments',
    body: 'GradientBorderInput, BorderDrawInput, and FillSweepInput add polish to hero sign-ups or waitlist fields. Use one style per form.',
  },
  {
    title: 'When not to use',
    body: 'Avoid mixing several motions in one form or animating dense admin tables. Consistency matters more than flair when users fill many fields.',
  },
]

export const INPUT_PROPS = [
  {
    property: 'motion',
    description: 'Focus animation when using the standard <Input /> wrapper.',
    type: "'focusGlow' | 'floatingLabel' | 'underlineGrow' | 'gradientBorder' | 'iconPop' | 'fillSweep' | 'placeholderSlide' | 'borderDraw'",
    default: "'focusGlow'",
  },
  {
    property: 'label',
    description: 'Visible label linked to the input via htmlFor/id.',
    type: 'ReactNode',
    default: '—',
  },
  {
    property: 'helperText',
    description: 'Hint text under the field, linked with aria-describedby.',
    type: 'ReactNode',
    default: '—',
  },
  {
    property: 'error',
    description: 'Marks the field invalid and shakes it once. A string replaces the helper text with the message.',
    type: 'boolean | string',
    default: 'false',
  },
  {
    property: 'size',
    description: 'Field height and text size.',
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
  },
  {
    property: 'icon',
    description: 'Leading icon node. IconPopInput defaults to a search icon.',
    type: 'ReactNode',
    default: '—',
  },
  {
    property: 'className',
    description: 'Extra classes on the outer wrapper (label, field, and helper text).',
    type: 'string',
    default: '—',
  },
  {
    property: 'inputClassName',
    description: 'Extra classes on the native <input> element.',
    type: 'string',
    default: '—',
  },
  {
    property: 'style',
    description: 'Inline styles on the outer wrapper.',
    type: 'CSSProperties',
    default: '—',
  },
  {
    property: '...input props',
    description: 'Every native input attribute (type, name, value, onChange, placeholder, disabled, required, ...) is forwarded, and ref points at the <input>.',
    type: 'InputHTMLAttributes',
    default: '—',
  },
]

export const INPUT_MOTION_COMPATIBILITY = [
  {
    motion: 'focusGlow',
    bestWith: 'any form; all sizes; error states',
    limited: '—',
    notes: 'Most flexible default.',
  },
  {
    motion: 'floatingLabel',
    bestWith: 'compact forms; md and lg sizes',
    limited: 'size="sm" (little room for the floated label)',
    notes: 'The label replaces the placeholder — keep labels short.',
  },
  {
    motion: 'underlineGrow',
    bestWith: 'minimal and editorial layouts',
    limited: 'Busy backgrounds (no box to anchor the field)',
    notes: 'Works well on tinted sections.',
  },
  {
    motion: 'gradientBorder',
    bestWith: 'hero sign-ups; waitlists',
    limited: 'Dense multi-field forms',
    notes: 'One per view keeps the effect special.',
  },
  {
    motion: 'iconPop',
    bestWith: 'search, filters, email with an icon',
    limited: 'Fields without a meaningful icon',
    notes: 'Pass icon to replace the default search glyph.',
  },
  {
    motion: 'fillSweep',
    bestWith: 'light surfaces; checkout steps',
    limited: 'Dark backgrounds',
    notes: 'The fill clearly marks the active field.',
  },
  {
    motion: 'placeholderSlide',
    bestWith: 'fields with an outer label',
    limited: 'Fields with no placeholder',
    notes: 'Placeholder fades out instead of snapping away.',
  },
  {
    motion: 'borderDraw',
    bestWith: 'portfolio and agency sites',
    limited: 'Long forms (repeated effect feels slow)',
    notes: 'Draws clockwise from the top-left — about 600ms total.',
  },
]

export const INPUT_FAQS = [
  {
    q: 'Does it work with react-hook-form or Formik?',
    a: 'Yes. Input forwards its ref to the native <input> and passes through name, value, onChange, and onBlur, so register() and Field components work as-is.',
  },
  {
    q: 'How do I show a validation error?',
    a: 'Pass error="Message" to show the message in rose and shake the field once. Pass error={true} to mark it invalid while keeping your own helper text.',
  },
  {
    q: 'Is the label accessible?',
    a: 'Yes. Each input gets a generated id (or your own id), the label points to it, and helper or error text is linked with aria-describedby. aria-invalid is set when error is truthy.',
  },
  ...sharedFaqs('inputs', INPUT_PACKAGE.packageName),
]
