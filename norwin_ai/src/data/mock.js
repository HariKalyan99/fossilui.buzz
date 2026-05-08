// Curated Unsplash images (stable IDs) used as mock AI-generated artwork.
// Each entry is a real, self-contained image URL — no uploads required.

export const MOCK_IMAGES = [
  {
    id: 'img-1',
    url: 'https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?auto=format&fit=crop&w=900&q=80',
    prompt: 'A neon-lit cyberpunk alley in the rain, cinematic, ultra-detailed',
    style: 'Cinematic',
    ratio: '1:1',
    createdAt: '2h ago',
  },
  {
    id: 'img-2',
    url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=900&q=80',
    prompt: 'Surreal floating islands above a sea of clouds at golden hour',
    style: 'Surreal',
    ratio: '4:5',
    createdAt: '4h ago',
  },
  {
    id: 'img-3',
    url: 'https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=900&q=80',
    prompt: 'Portrait of an astronaut in a field of bioluminescent flowers',
    style: 'Photoreal',
    ratio: '3:4',
    createdAt: 'Yesterday',
  },
  {
    id: 'img-4',
    url: 'https://images.unsplash.com/photo-1604079628040-94301bb21b91?auto=format&fit=crop&w=900&q=80',
    prompt: 'Isometric micro-world of a cozy coffee shop, tiny details',
    style: '3D Render',
    ratio: '1:1',
    createdAt: 'Yesterday',
  },
  {
    id: 'img-5',
    url: 'https://images.unsplash.com/photo-1532456745301-b2c645d8b80d?auto=format&fit=crop&w=900&q=80',
    prompt: 'Abstract liquid metal flowing over a mirrored surface',
    style: 'Abstract',
    ratio: '16:9',
    createdAt: '2d ago',
  },
  {
    id: 'img-6',
    url: 'https://images.unsplash.com/photo-1518544801976-3e188ea7ea06?auto=format&fit=crop&w=900&q=80',
    prompt: 'Vintage anime cityscape under a violet sunset',
    style: 'Anime',
    ratio: '16:9',
    createdAt: '3d ago',
  },
  {
    id: 'img-7',
    url: 'https://images.unsplash.com/photo-1536152470836-b943b246224c?auto=format&fit=crop&w=900&q=80',
    prompt: 'Ancient temple reclaimed by nature, volumetric light rays',
    style: 'Cinematic',
    ratio: '3:2',
    createdAt: '4d ago',
  },
  {
    id: 'img-8',
    url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=900&q=80&sat=-50',
    prompt: 'Monochrome minimal sculpture on a gradient backdrop',
    style: 'Minimal',
    ratio: '1:1',
    createdAt: '5d ago',
  },
];

// Short open-source ambient video clips for video mock output.
export const MOCK_VIDEOS = [
  {
    id: 'vid-1',
    url: 'https://cdn.coverr.co/videos/coverr-a-foggy-forest-7646/1080p.mp4',
    poster:
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=900&q=80',
    prompt: 'Misty forest at dawn, slow dolly shot, cinematic',
    style: 'Cinematic',
    duration: '0:06',
    createdAt: 'Today',
  },
  {
    id: 'vid-2',
    url: 'https://cdn.coverr.co/videos/coverr-driving-through-the-city-at-night-3768/1080p.mp4',
    poster:
      'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=900&q=80',
    prompt: 'Driving through a neon city at night, rain on windshield',
    style: 'Cyberpunk',
    duration: '0:08',
    createdAt: '1d ago',
  },
  {
    id: 'vid-3',
    url: 'https://cdn.coverr.co/videos/coverr-ocean-waves-breaking-7649/1080p.mp4',
    poster:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80',
    prompt: 'Aerial shot of ocean waves at golden hour',
    style: 'Nature',
    duration: '0:10',
    createdAt: '2d ago',
  },
  {
    id: 'vid-4',
    url: 'https://cdn.coverr.co/videos/coverr-a-man-walking-through-a-field-of-flowers-3678/1080p.mp4',
    poster:
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=80',
    prompt: 'Person walking through a field of wildflowers, slow motion',
    style: 'Dreamy',
    duration: '0:07',
    createdAt: '3d ago',
  },
];

export const STYLE_PRESETS = [
  'Cinematic',
  'Photoreal',
  'Anime',
  '3D Render',
  'Surreal',
  'Minimal',
  'Abstract',
  'Cyberpunk',
];

export const ASPECT_RATIOS = ['1:1', '3:4', '4:5', '16:9', '3:2', '9:16'];
export const VIDEO_DURATIONS = ['4s', '6s', '8s', '12s'];
export const VIDEO_MOTION = ['Subtle', 'Balanced', 'Dynamic'];
