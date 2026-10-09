import {
  Input,
  INPUT_MOTIONS,
  INPUT_SIZES,
  FocusGlowInput,
  FloatingLabelInput,
  UnderlineGrowInput,
  GradientBorderInput,
  IconPopInput,
  FillSweepInput,
  PlaceholderSlideInput,
  BorderDrawInput,
} from '@fossilui/react'
import { ComponentConfigurator } from '../docs/ComponentConfigurator'
import { boolAttr, optionAttr, pickStrings, stringAttr } from '../docs/snippetAttrs'
import { INPUT_DEMO, inputSnippet } from '../../data/inputDocs'
import { cn } from '../../lib/cn'

const COMPONENT_MAP = {
  Input,
  FocusGlowInput,
  FloatingLabelInput,
  UnderlineGrowInput,
  GradientBorderInput,
  IconPopInput,
  FillSweepInput,
  PlaceholderSlideInput,
  BorderDrawInput,
}

const NAMED_MOTIONS = {
  FocusGlowInput: 'focusGlow',
  FloatingLabelInput: 'floatingLabel',
  UnderlineGrowInput: 'underlineGrow',
  GradientBorderInput: 'gradientBorder',
  IconPopInput: 'iconPop',
  FillSweepInput: 'fillSweep',
  PlaceholderSlideInput: 'placeholderSlide',
  BorderDrawInput: 'borderDraw',
}

const INPUT_TYPES = ['text', 'email', 'password', 'search', 'url', 'tel']
const TEXT_KEYS = ['label', 'placeholder', 'helperText', 'error']

/** @type {import('../docs/ComponentConfigurator').ConfiguratorSchema} */
const SCHEMA = {
  wrapperName: 'Input',
  componentMap: COMPONENT_MAP,
  namedMotions: NAMED_MOTIONS,
  motions: INPUT_MOTIONS,
  defaults: {
    motion: 'focusGlow',
    label: INPUT_DEMO.label,
    placeholder: INPUT_DEMO.placeholder,
    helperText: "We'll never share your email.",
    error: '',
    type: INPUT_DEMO.type,
    size: 'md',
    disabled: false,
  },
  fields: [
    { key: 'label', label: 'Label', type: 'text' },
    { key: 'placeholder', label: 'Placeholder', type: 'text' },
    { key: 'helperText', label: 'Helper text', type: 'text', wide: true },
    { key: 'error', label: 'Error message', type: 'text', wide: true, placeholder: 'Type to show the error state' },
    { key: 'type', label: 'Type', type: 'select', options: INPUT_TYPES },
    { key: 'size', label: 'Size', type: 'select', options: INPUT_SIZES },
    { key: 'disabled', label: 'Disabled', type: 'checkbox' },
  ],
  buildSnippet: (state) =>
    inputSnippet([
      `motion="${state.motion}"`,
      ...stringAttr('label', state.label),
      ...optionAttr('type', state.type, 'text'),
      ...stringAttr('placeholder', state.placeholder),
      ...stringAttr('helperText', state.helperText),
      ...stringAttr('error', state.error),
      ...optionAttr('size', state.size, 'md'),
      ...boolAttr('disabled', state.disabled, false),
    ]),
  propsFromState: (state) => ({
    motion: state.motion,
    ...pickStrings(state, TEXT_KEYS),
    type: state.type,
    size: state.size,
    disabled: state.disabled,
  }),
  renderPreview: ({ Component, props }) => {
    const { className, ...rest } = props
    return <Component autoComplete="off" {...rest} className={cn('w-full max-w-sm', className)} />
  },
  description:
    'Pick props from the panel or edit the code directly — including className and style. Focus the preview field to see the motion; add an error message to see the shake.',
}

export function InputConfigurator() {
  return <ComponentConfigurator schema={SCHEMA} />
}
