// Simulated paged API to make the app behave like a real product.
// All operations resolve asynchronously with a small artificial latency
// to exercise loading states and optimistic UI patterns.

const PAGE_SIZE = 6;
const LATENCY = [220, 480];

function delay(min = LATENCY[0], max = LATENCY[1]) {
  const ms = min + Math.random() * (max - min);
  return new Promise((res) => setTimeout(res, ms));
}

export function makeApi(world) {
  // We mutate copies kept here so the UI feels like a real backend.
  const state = {
    users: world.users,
    me: world.me,
    posts: [...world.posts],
    notifications: [...world.notifications],
  };

  return {
    state,
    async fetchFeed({ page = 0 } = {}) {
      await delay();
      const start = page * PAGE_SIZE;
      const end = start + PAGE_SIZE;
      const slice = state.posts.slice(start, end);
      return {
        posts: slice,
        nextPage: end < state.posts.length ? page + 1 : null,
      };
    },
    async fetchUserPosts(userId) {
      await delay(120, 260);
      return state.posts.filter((p) => p.authorId === userId);
    },
    async createPost({ text, media }) {
      await delay(120, 260);
      const post = {
        id: `p_local_${Date.now()}`,
        authorId: "me",
        type: media ? media.kind : "text",
        text,
        createdAt: Date.now(),
        likes: 0,
        comments: 0,
        shares: 0,
        liked: false,
        bookmarked: false,
        media: media || undefined,
      };
      state.posts.unshift(post);
      return post;
    },
    async toggleLike(postId) {
      const p = state.posts.find((x) => x.id === postId);
      if (!p) return null;
      p.liked = !p.liked;
      p.likes += p.liked ? 1 : -1;
      return p;
    },
    async toggleBookmark(postId) {
      const p = state.posts.find((x) => x.id === postId);
      if (!p) return null;
      p.bookmarked = !p.bookmarked;
      return p;
    },
    async addComment(postId) {
      const p = state.posts.find((x) => x.id === postId);
      if (!p) return null;
      p.comments += 1;
      return p;
    },
    async share(postId) {
      const p = state.posts.find((x) => x.id === postId);
      if (!p) return null;
      p.shares += 1;
      return p;
    },
    getUser(id) {
      if (id === "me") return state.me;
      return state.users.find((u) => u.id === id) || null;
    },
    getMe() {
      return state.me;
    },
    listUsers() {
      return state.users;
    },
    listNotifications() {
      return state.notifications;
    },
    markAllNotificationsRead() {
      state.notifications = state.notifications.map((n) => ({ ...n, read: true }));
      return state.notifications;
    },
  };
}
