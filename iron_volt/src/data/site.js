/**
 * Global brand + business details.
 *
 * Everything marked PLACEHOLDER must be replaced with the gym's real
 * information before launch. While `showSampleNotices` is true, the site
 * displays small notices wherever sample content is shown.
 */
export const site = {
  name: 'IRONVOLT',
  wordmark: ['IRON', 'VOLT'],
  tagline: 'Stronger Every Day',
  pillars: ['Strength', 'Conditioning', 'Performance'],
  showSampleNotices: true,

  contact: {
    // PLACEHOLDER — `.example` domains are reserved and never deliver mail.
    email: 'hello@ironvolt.example',
    // PLACEHOLDER — 555-01xx numbers are reserved for fictional use.
    phone: '+1 (555) 010-0199',
    phoneHref: 'tel:+15550100199',
    // PLACEHOLDER
    address: ['Street address to be confirmed', 'City, Postcode'],
    mapUrl: null,
  },

  // PLACEHOLDER — sample opening hours.
  hours: [
    { days: 'Mon – Fri', time: '06:00 – 22:00' },
    { days: 'Saturday', time: '08:00 – 20:00' },
    { days: 'Sunday', time: '09:00 – 18:00' },
  ],

  // PLACEHOLDER — replace with the gym's own profile URLs.
  socials: [
    { label: 'Instagram', url: 'https://www.instagram.com/' },
    { label: 'TikTok', url: 'https://www.tiktok.com/' },
    { label: 'YouTube', url: 'https://www.youtube.com/' },
  ],
}

export const mainNav = [
  { label: 'Programs', to: '/programs' },
  { label: 'Membership', to: '/membership' },
  { label: 'Trainers', to: '/trainers' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export const legalNav = [
  { label: 'Privacy', to: '/privacy' },
  { label: 'Terms', to: '/terms' },
]
