/**
 * PLACEHOLDER PRICING — replace `price` values and inclusions with the gym's
 * confirmed rates. Set `price` to null to show "Ask us" instead of a number.
 */
export const currency = '$'

export const memberships = [
  {
    id: 'essential',
    name: 'Essential',
    tagline: 'Everything you need to train on your own terms.',
    price: 39,
    period: 'month',
    featured: false,
    features: [
      'Full open-gym access during staffed hours',
      'Free weights, racks and cardio zones',
      'Onboarding session with a coach',
      'Training app with starter programs',
    ],
  },
  {
    id: 'performance',
    name: 'Performance',
    tagline: 'Coached classes and structure for steady progress.',
    price: 69,
    period: 'month',
    featured: true,
    features: [
      'Everything in Essential',
      'Unlimited small-group classes',
      'Monthly progress check-in',
      'Strength, conditioning and mobility programs',
      'Recovery area access',
    ],
  },
  {
    id: 'unlimited',
    name: 'Unlimited',
    tagline: 'Maximum support with one-to-one coaching built in.',
    price: 119,
    period: 'month',
    featured: false,
    features: [
      'Everything in Performance',
      'Two 1:1 personal training sessions per month',
      'Individual program written by your coach',
      'Priority class booking',
      'Bring a guest once a month',
    ],
  },
]

/** Comparison matrix for /membership. `true` = included. */
export const comparison = [
  { label: 'Open-gym access', values: [true, true, true] },
  { label: 'Coach onboarding', values: [true, true, true] },
  { label: 'Small-group classes', values: [false, true, true] },
  { label: 'Monthly progress check-in', values: [false, true, true] },
  { label: 'Recovery area', values: [false, true, true] },
  { label: '1:1 personal training', values: [false, false, '2 / month'] },
  { label: 'Individual program', values: [false, false, true] },
  { label: 'Guest passes', values: [false, false, '1 / month'] },
]

export const faq = [
  {
    q: 'Do I need gym experience to join?',
    a: 'No. Every membership starts with an onboarding session so a coach can understand your goals, check your movement and point you to the right program.',
  },
  {
    q: 'Can I try a session before committing?',
    a: 'Yes. Book a trial session and a coach will walk you through the space and a short workout matched to your level.',
  },
  {
    q: 'Can I switch memberships later?',
    a: 'Membership changes, contract length and notice periods are confirmed with the team when you join. Ask us and we will explain the options.',
  },
  {
    q: 'What should I bring to my first session?',
    a: 'Comfortable training clothes, clean indoor shoes, a water bottle and a towel. We will handle the rest.',
  },
]
