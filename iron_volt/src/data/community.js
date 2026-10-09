import run from '../assets/images/community-run.webp'
import groupClass from '../assets/images/community-class.webp'
import partner from '../assets/images/community-partner.webp'
import pushup from '../assets/images/community-pushup.webp'

export const communityImages = [
  { src: run, alt: 'Group of members running together outdoors', ratio: 'aspect-[3/2]', speed: -6 },
  { src: partner, alt: 'Two members training together with a partner exercise', ratio: 'aspect-[2/3]', speed: 10 },
  { src: groupClass, alt: 'Small-group class training on the gym floor', ratio: 'aspect-[3/2]', speed: -12 },
  { src: pushup, alt: 'Member performing push-ups on a gym floor', ratio: 'aspect-[2/3]', speed: 6 },
]

/** What the community experience includes. Edit to match what the gym offers. */
export const communityHighlights = [
  {
    title: 'Small-group sessions',
    body: 'Train alongside people with the same goals, coached closely enough to keep standards high.',
  },
  {
    title: 'Progress check-ins',
    body: 'Regular reviews of your lifts, sessions and habits so progress stays visible.',
  },
  {
    title: 'Beginner onboarding',
    body: 'A guided start that makes the gym floor feel familiar from your first week.',
  },
]

export const marqueeWords = ['Strength', 'Conditioning', 'Performance', 'Recovery', 'Community']
