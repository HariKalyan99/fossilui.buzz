import {
  Hero,
  HERO_ALIGNS,
  HERO_BACKGROUNDS,
  HERO_MOTIONS,
  FadeUpHero,
  StaggerWordsHero,
  BlurRevealHero,
  ScaleInHero,
  LetterCascadeHero,
  GradientTextHero,
  SpotlightHero,
  TypewriterHero,
} from '@fossilui/react'
import { ComponentConfigurator } from '../docs/ComponentConfigurator'
import { optionAttr, pickStrings, stringAttr } from '../docs/snippetAttrs'
import { TIMING_DEFAULTS, timingAttrs, timingFields, timingProps } from '../docs/timingFields'
import { HERO_DEMO, heroSnippet } from '../../data/heroDocs'
import { ReplayableHero } from './ReplayableHero'

const COMPONENT_MAP = {
  Hero,
  FadeUpHero,
  StaggerWordsHero,
  BlurRevealHero,
  ScaleInHero,
  LetterCascadeHero,
  GradientTextHero,
  SpotlightHero,
  TypewriterHero,
}

const NAMED_MOTIONS = {
  FadeUpHero: 'fadeUp',
  StaggerWordsHero: 'staggerWords',
  BlurRevealHero: 'blurReveal',
  ScaleInHero: 'scaleIn',
  LetterCascadeHero: 'letterCascade',
  GradientTextHero: 'gradientText',
  SpotlightHero: 'spotlight',
  TypewriterHero: 'typewriter',
}

const TEXT_KEYS = [
  'eyebrow',
  'title',
  'description',
  'primaryLabel',
  'primaryHref',
  'secondaryLabel',
  'secondaryHref',
]

/** @type {import('../docs/ComponentConfigurator').ConfiguratorSchema} */
const SCHEMA = {
  wrapperName: 'Hero',
  componentMap: COMPONENT_MAP,
  namedMotions: NAMED_MOTIONS,
  motions: HERO_MOTIONS,
  defaults: {
    motion: 'fadeUp',
    ...HERO_DEMO,
    align: 'center',
    background: 'grid',
    ...TIMING_DEFAULTS,
  },
  fields: [
    { key: 'eyebrow', label: 'Eyebrow', type: 'text' },
    { key: 'title', label: 'Title', type: 'text', wide: true },
    { key: 'description', label: 'Description', type: 'text', wide: true },
    { key: 'primaryLabel', label: 'Primary label', type: 'text' },
    { key: 'primaryHref', label: 'Primary href', type: 'text' },
    { key: 'secondaryLabel', label: 'Secondary label', type: 'text' },
    { key: 'secondaryHref', label: 'Secondary href', type: 'text' },
    { key: 'align', label: 'Align', type: 'select', options: HERO_ALIGNS },
    { key: 'background', label: 'Background', type: 'select', options: HERO_BACKGROUNDS },
    ...timingFields,
  ],
  buildSnippet: (state) =>
    heroSnippet([
      `motion="${state.motion}"`,
      ...TEXT_KEYS.flatMap((key) => stringAttr(key, state[key])),
      ...optionAttr('align', state.align, 'center'),
      ...optionAttr('background', state.background, 'grid'),
      ...timingAttrs(state),
    ]),
  propsFromState: (state) => ({
    motion: state.motion,
    ...pickStrings(state, TEXT_KEYS),
    align: state.align,
    background: state.background,
    ...timingProps(state),
  }),
  renderPreview: ({ Component, props, previewKey }) => (
    <ReplayableHero key={previewKey} Component={Component} props={props} />
  ),
  previewPlacement: 'below',
  previewClassName: 'block p-0 sm:p-0',
  description:
    'Pick props from the panel or edit the code directly. Duration, easing, and delay override the entrance. An easing the browser rejects is ignored. Changing them replays the entrance, and Replay does the same.',
}

export function HeroConfigurator() {
  return <ComponentConfigurator schema={SCHEMA} />
}
