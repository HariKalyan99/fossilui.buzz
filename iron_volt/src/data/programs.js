import strength from '../assets/images/program-strength.webp'
import personal from '../assets/images/program-personal.webp'
import functional from '../assets/images/program-functional.webp'
import conditioning from '../assets/images/program-conditioning.webp'
import muscle from '../assets/images/program-muscle.webp'
import mobility from '../assets/images/program-mobility.webp'

/**
 * `layout` controls the editorial grid on the homepage:
 * span (of 12 columns on desktop), aspect ratio and vertical offset.
 */
export const programs = [
  {
    slug: 'strength',
    title: 'Strength Training',
    short: 'Barbell fundamentals and progressive overload for lifters at every level.',
    description:
      'Squat, hinge, press and pull — coached with clear technique standards and loads that progress week to week.',
    forWho: 'New lifters building a base and experienced lifters chasing new numbers.',
    format: 'Small-group and open-gym blocks',
    focus: ['Compound lifts', 'Technique', 'Progressive overload'],
    image: strength,
    alt: 'Athlete in training shoes gripping a loaded barbell on a dark gym floor',
    position: '50% 60%',
    layout: { span: 'sm:col-span-2 lg:col-span-7', aspect: 'aspect-[16/11]' },
  },
  {
    slug: 'personal-training',
    title: 'Personal Training',
    short: 'One coach, one plan, built entirely around your goals and schedule.',
    description:
      'A fully individual program with one-to-one sessions, regular check-ins and adjustments as you progress.',
    forWho: 'Anyone who wants maximum accountability and a fully tailored plan.',
    format: '1:1 sessions',
    focus: ['Individual programming', 'Accountability', 'Form coaching'],
    image: personal,
    alt: 'Coach spotting an athlete during a bench press',
    position: '50% 40%',
    layout: { span: 'lg:col-span-5', aspect: 'aspect-[4/5]' },
  },
  {
    slug: 'functional',
    title: 'Functional Fitness',
    short: 'Kettlebells, carries and bodyweight work for strength that transfers.',
    description:
      'Multi-plane movement that builds usable strength, coordination and control for sport and daily life.',
    forWho: 'People who want to move better, not just lift more.',
    format: 'Small-group classes',
    focus: ['Kettlebells', 'Carries', 'Movement quality'],
    image: functional,
    alt: 'Athlete in a deep lunge pressing a kettlebell overhead',
    position: '45% 50%',
    layout: { span: 'lg:col-span-4', aspect: 'aspect-[4/5]' },
  },
  {
    slug: 'conditioning',
    title: 'Conditioning',
    short: 'Intervals and engine work that raise your ceiling without burning you out.',
    description:
      'Structured intervals using ropes, sleds, bikes and rowers — scaled to your current fitness and tracked over time.',
    forWho: 'Anyone building work capacity, endurance or sport-specific fitness.',
    format: 'Small-group classes',
    focus: ['Intervals', 'Work capacity', 'Heart-rate zones'],
    image: conditioning,
    alt: 'Battle ropes in motion inside an industrial training space',
    position: '40% 50%',
    layout: { span: 'lg:col-span-4', aspect: 'aspect-[4/5]', offset: 'lg:mt-24' },
  },
  {
    slug: 'muscle-building',
    title: 'Muscle Building',
    short: 'Hypertrophy blocks with smart volume, clean execution and steady progress.',
    description:
      'Periodised hypertrophy programming with exercise selection, volume and rest dialled in for growth.',
    forWho: 'Lifters focused on size, shape and body composition.',
    format: 'Programmed blocks with coach check-ins',
    focus: ['Hypertrophy', 'Volume planning', 'Execution'],
    image: muscle,
    alt: 'Athlete performing a dumbbell curl in a gym',
    position: '35% 40%',
    layout: { span: 'lg:col-span-4', aspect: 'aspect-[4/5]' },
  },
  {
    slug: 'mobility',
    title: 'Mobility & Recovery',
    short: 'Range, control and recovery work that keeps you training for the long run.',
    description:
      'Guided mobility, breathing and recovery sessions designed to complement heavy training — not replace it.',
    forWho: 'Every member. Especially those who lift, sit, or both.',
    format: 'Guided sessions',
    focus: ['Range of motion', 'Recovery', 'Breathing'],
    image: mobility,
    alt: 'Athlete holding a deep stretch on a training mat',
    position: '50% 55%',
    layout: { span: 'lg:col-span-8 lg:col-start-5', aspect: 'aspect-[16/9]' },
  },
]
