import { useState } from 'react'
import {
  Modal,
  MODAL_MOTIONS,
  MODAL_SIZES,
  MODAL_TONES,
  ScaleFadeModal,
  SlideUpModal,
  SlideDownModal,
  ZoomBounceModal,
  FlipModal,
  BlurInModal,
  DrawerModal,
  BottomSheetModal,
} from '@fossilui/react'
import { ComponentConfigurator } from '../docs/ComponentConfigurator'
import { boolAttr, optionAttr, pickStrings, stringAttr } from '../docs/snippetAttrs'
import { MODAL_DEMO, modalSnippet } from '../../data/modalDocs'
import { DemoTrigger } from './DemoTrigger'

const COMPONENT_MAP = {
  Modal,
  ScaleFadeModal,
  SlideUpModal,
  SlideDownModal,
  ZoomBounceModal,
  FlipModal,
  BlurInModal,
  DrawerModal,
  BottomSheetModal,
}

const NAMED_MOTIONS = {
  ScaleFadeModal: 'scaleFade',
  SlideUpModal: 'slideUp',
  SlideDownModal: 'slideDown',
  ZoomBounceModal: 'zoomBounce',
  FlipModal: 'flip',
  BlurInModal: 'blurIn',
  DrawerModal: 'drawer',
  BottomSheetModal: 'bottomSheet',
}

const TEXT_KEYS = ['title', 'description', 'confirmLabel', 'cancelLabel']

/** Contained so the modal stays inside the preview box; remounts (and replays) when the motion changes. */
function ModalPreview({ Component, props }) {
  const [open, setOpen] = useState(true)
  return (
    <>
      <DemoTrigger onClick={() => setOpen(true)}>Open modal</DemoTrigger>
      <Component {...props} contained open={open} onClose={() => setOpen(false)} />
    </>
  )
}

/** @type {import('../docs/ComponentConfigurator').ConfiguratorSchema} */
const SCHEMA = {
  wrapperName: 'Modal',
  componentMap: COMPONENT_MAP,
  namedMotions: NAMED_MOTIONS,
  motions: MODAL_MOTIONS,
  defaults: {
    motion: 'scaleFade',
    ...MODAL_DEMO,
    size: 'md',
    tone: 'default',
    closeOnOverlay: true,
    showClose: true,
  },
  fields: [
    { key: 'title', label: 'Title', type: 'text', wide: true },
    { key: 'description', label: 'Description', type: 'text', wide: true },
    { key: 'confirmLabel', label: 'Confirm label', type: 'text', placeholder: 'Leave empty to hide' },
    { key: 'cancelLabel', label: 'Cancel label', type: 'text', placeholder: 'Leave empty to hide' },
    { key: 'size', label: 'Size', type: 'select', options: MODAL_SIZES },
    { key: 'tone', label: 'Tone', type: 'select', options: MODAL_TONES },
    { key: 'closeOnOverlay', label: 'Close on overlay click', type: 'checkbox' },
    { key: 'showClose', label: 'Show close button', type: 'checkbox' },
  ],
  buildSnippet: (state) =>
    modalSnippet([
      `motion="${state.motion}"`,
      ...TEXT_KEYS.flatMap((key) => stringAttr(key, state[key])),
      ...optionAttr('size', state.size, 'md'),
      ...optionAttr('tone', state.tone, 'default'),
      ...boolAttr('closeOnOverlay', state.closeOnOverlay, true),
      ...boolAttr('showClose', state.showClose, true),
    ]),
  propsFromState: (state) => ({
    motion: state.motion,
    ...pickStrings(state, TEXT_KEYS),
    size: state.size,
    tone: state.tone,
    closeOnOverlay: state.closeOnOverlay,
    showClose: state.showClose,
  }),
  renderPreview: ({ Component, props, previewKey }) => (
    <ModalPreview key={previewKey} Component={Component} props={props} />
  ),
  previewPlacement: 'below',
  previewClassName: 'min-h-[24rem] sm:min-h-[26rem]',
  description:
    'Pick props from the panel or edit the code directly. The preview modal is rendered contained, so it opens inside the box. Switching the motion replays the entrance; close it and use Open modal to watch the exit.',
}

export function ModalConfigurator() {
  return <ComponentConfigurator schema={SCHEMA} />
}
