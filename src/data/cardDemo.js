import { mediaFallbackUrl, mediaUrl } from '../lib/media'

export const CARD_DEMO_IMAGE = mediaUrl('images/14.jpg', '/14.jpg')
export const CARD_DEMO_IMAGE_FALLBACK = mediaFallbackUrl(CARD_DEMO_IMAGE) ?? '/14.jpg'
export const CARD_DEMO_IMAGE_ALT = 'Fossil UI card preview'

export const CARD_DEMO_PROPS = {
  imageSrc: CARD_DEMO_IMAGE,
  imageFallback: CARD_DEMO_IMAGE_FALLBACK,
  imageAlt: CARD_DEMO_IMAGE_ALT,
}
