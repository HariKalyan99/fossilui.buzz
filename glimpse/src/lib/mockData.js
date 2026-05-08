// Deterministic mock data generator for the social feed.
// Crafted to feel like a real platform: variety of post types, plausible
// usernames, hashtags, and image content using picsum.photos seeded URLs.

const FIRSTS = [
  "Maya", "Leo", "Zara", "Kai", "Aria", "Eli", "Nova", "Theo", "Iris", "Jae",
  "Mira", "Sage", "Rumi", "Neo", "Luna", "Felix", "Oona", "Ravi", "Eva", "Otis",
  "June", "Soren", "Elif", "Niko", "Yuki", "Owen", "Amara", "Cy", "Wren", "Ines",
];
const LASTS = [
  "Park", "Chen", "Okafor", "Vega", "Ito", "Reyes", "Khan", "Moss", "Lin",
  "Patel", "Nguyen", "Morales", "Sato", "Bauer", "Kapoor", "Holt", "Adler",
  "Cole", "Diaz", "Singh", "Rossi", "Mwangi", "Bell", "Fox", "Ali", "Beck",
];

const BIOS = [
  "designer · plant hoarder · midnight tinkerer",
  "writing tiny essays about big feelings",
  "shipping software, sipping matcha",
  "breakfast enthusiast · part-time photographer",
  "synth + spreadsheets · making strange things",
  "running slow, thinking fast",
  "building Glimpse · always reading",
  "taking pictures of doors I'll never open",
  "Berlin → Lisbon · ambient music for sad robots",
  "ex-architect making weird games",
  "keeping a garden of ideas",
  "studio engineer · noise enthusiast",
];

const POST_TEMPLATES = [
  { type: "text", text: "Just had the best ramen of my life. The broth was a religious experience. 🍜" },
  { type: "image", text: "First light over the harbor. Stayed up all night for this one." },
  { type: "text", text: "The trick isn't to ship every day. It's to make something you would scroll past and stop." },
  { type: "image", text: "Tiny apartment, big plans. Set up the new desk this weekend." },
  { type: "text", text: "Reminder that the algorithm rewards confidence, not correctness. Stay weird." },
  { type: "image", text: "Field notes from a Tuesday walk. Found three new colors." },
  { type: "text", text: "Hot take: a good loading state is worth ten new features." },
  { type: "image", text: "Studio is finally coming together. Prints from the last show on the wall." },
  { type: "text", text: "Currently reading: 'The Creative Act'. Currently feeling: very seen." },
  { type: "video", text: "Quick demo of the prototype I've been hiding for weeks 👀" },
  { type: "text", text: "If you're stuck, ship the ugly version. It will give you better problems." },
  { type: "image", text: "Bouldering session today. Almost got the project, fell off the last move twice." },
  { type: "text", text: "I miss the early internet. Small communities, weird websites, no metrics." },
  { type: "image", text: "Three coffees in. The deck is almost done." },
  { type: "text", text: "Naming things is 80% of design. Change my mind." },
  { type: "image", text: "Made pasta from scratch for the first time. Dough is forgiving, sauces are not." },
  { type: "text", text: "Found a tiny bug that explained six months of weird behavior. Joy." },
  { type: "image", text: "Late summer light hits different in this part of the city." },
  { type: "text", text: "What's the best book you've finished in the last 30 days? Need recs." },
  { type: "image", text: "New brand system landed today. Six months of debate, one perfect mark." },
];

const HASHTAGS = [
  ["#design", "#productdesign"],
  ["#photography", "#streetphoto"],
  ["#dev", "#webdev", "#react"],
  ["#music", "#ambient"],
  ["#books"],
  ["#coffee", "#mornings"],
  ["#travel", "#lisbon"],
  ["#food", "#ramen"],
  ["#climbing", "#bouldering"],
  ["#writing"],
  [],
  [],
];

// Mulberry32 - deterministic PRNG
function rng(seed) {
  let s = seed >>> 0;
  return function () {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pick(rand, arr) {
  return arr[Math.floor(rand() * arr.length)];
}

function makeHandle(first, last, n) {
  const variants = [
    `${first}${last}`.toLowerCase(),
    `${first.toLowerCase()}.${last.toLowerCase()}`,
    `${first.toLowerCase()}${n}`,
    `the${first.toLowerCase()}`,
    `${first.toLowerCase()}_writes`,
    `${first.toLowerCase()}_${last.toLowerCase()}`,
  ];
  return variants[n % variants.length];
}

function avatarFor(seed) {
  // DiceBear avatars are SVG-only and CDN cached, deterministic by seed.
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
    seed
  )}&backgroundType=gradientLinear&backgroundColor=6366f1,a855f7,ec4899`;
}

function imageFor(seed, w = 1080, h = 720) {
  return `https://picsum.photos/seed/${encodeURIComponent(seed)}/${w}/${h}`;
}

export function generateUsers(count = 28) {
  const rand = rng(42);
  const users = [];
  for (let i = 0; i < count; i++) {
    const first = pick(rand, FIRSTS);
    const last = pick(rand, LASTS);
    const handle = makeHandle(first, last, i);
    users.push({
      id: `u_${i}`,
      name: `${first} ${last}`,
      handle,
      avatar: avatarFor(handle),
      bio: pick(rand, BIOS),
      followers: Math.floor(rand() * 50_000),
      following: Math.floor(rand() * 1000),
      verified: rand() > 0.85,
    });
  }
  return users;
}

export function generatePosts(users, count = 60) {
  const rand = rng(7);
  const now = Date.now();
  const posts = [];
  for (let i = 0; i < count; i++) {
    const author = users[Math.floor(rand() * users.length)];
    const t = POST_TEMPLATES[Math.floor(rand() * POST_TEMPLATES.length)];
    const tags = HASHTAGS[Math.floor(rand() * HASHTAGS.length)];
    const minutesAgo = Math.floor(rand() * 60 * 24 * 14); // up to 14 days
    const ts = now - minutesAgo * 60 * 1000;
    const post = {
      id: `p_${i}`,
      authorId: author.id,
      type: t.type,
      text: t.text + (tags.length ? "  " + tags.join(" ") : ""),
      createdAt: ts,
      likes: Math.floor(rand() * 8000),
      comments: Math.floor(rand() * 240),
      shares: Math.floor(rand() * 80),
      liked: false,
      bookmarked: false,
    };
    if (t.type === "image") {
      const ratio = rand() > 0.5 ? "landscape" : "portrait";
      post.media = {
        kind: "image",
        url:
          ratio === "landscape"
            ? imageFor(`${author.handle}-${i}`, 1200, 800)
            : imageFor(`${author.handle}-${i}`, 900, 1200),
        ratio,
      };
    } else if (t.type === "video") {
      post.media = {
        kind: "video",
        // Free sample MP4s from coverr/big-buck-bunny mirror
        url: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
        poster: imageFor(`${author.handle}-${i}-poster`, 1200, 800),
      };
    }
    posts.push(post);
  }
  posts.sort((a, b) => b.createdAt - a.createdAt);
  return posts;
}

const NOTIF_TEMPLATES = [
  { type: "like", text: "liked your post" },
  { type: "like", text: "liked your comment" },
  { type: "comment", text: "commented:" },
  { type: "follow", text: "started following you" },
  { type: "mention", text: "mentioned you in a post" },
];

export function generateNotifications(users, posts, count = 18) {
  const rand = rng(99);
  const items = [];
  for (let i = 0; i < count; i++) {
    const u = users[Math.floor(rand() * users.length)];
    const tpl = NOTIF_TEMPLATES[Math.floor(rand() * NOTIF_TEMPLATES.length)];
    const post =
      tpl.type === "follow" ? null : posts[Math.floor(rand() * posts.length)];
    items.push({
      id: `n_${i}`,
      type: tpl.type,
      actorId: u.id,
      text: tpl.text,
      createdAt: Date.now() - Math.floor(rand() * 60 * 60 * 24 * 7) * 1000,
      postId: post?.id,
      preview:
        tpl.type === "comment"
          ? "honestly this is exactly what I needed today"
          : null,
      read: rand() > 0.55,
    });
  }
  items.sort((a, b) => b.createdAt - a.createdAt);
  return items;
}

export function generateTrendingTopics() {
  return [
    { tag: "#productdesign", posts: 12_400 },
    { tag: "#latenightcoding", posts: 9_312 },
    { tag: "#streetphoto", posts: 7_804 },
    { tag: "#ambient", posts: 4_120 },
    { tag: "#bouldering", posts: 2_988 },
    { tag: "#bookstack", posts: 2_104 },
  ];
}

// Build the canonical world used across the app.
export function buildWorld() {
  const users = generateUsers(28);
  const posts = generatePosts(users, 60);
  const notifications = generateNotifications(users, posts, 18);
  const topics = generateTrendingTopics();
  // Current "me" user — separate so we can edit profile etc.
  const me = {
    id: "me",
    name: "Hari Kalyan",
    handle: "harikalyan",
    avatar: avatarFor("harikalyan-glimpse"),
    bio: "building Glimpse · likes ramen, ambient music, and quiet web pages",
    followers: 1248,
    following: 312,
    verified: true,
  };
  return { users, posts, notifications, topics, me };
}

export { avatarFor, imageFor };
