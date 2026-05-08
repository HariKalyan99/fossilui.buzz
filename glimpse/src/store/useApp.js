import { create } from "zustand";
import { buildWorld } from "../lib/mockData";
import { makeApi } from "../lib/api";

const world = buildWorld();
const api = makeApi(world);

function readTheme() {
  if (typeof window === "undefined") return "dark";
  const t = localStorage.getItem("glimpse:theme");
  return t === "light" ? "light" : "dark";
}

export const useApp = create((set, get) => ({
  api,
  // Identity
  me: api.getMe(),
  users: api.listUsers(),

  // UI
  theme: readTheme(),
  composerOpen: false,
  searchQuery: "",
  activeCommentPostId: null,

  // Feed
  feed: { posts: [], page: 0, hasMore: true, loading: false, initialized: false },

  // Notifications
  notifications: api.listNotifications(),

  // ----- actions -----
  setTheme(theme) {
    const root = document.documentElement;
    if (theme === "light") {
      root.classList.add("light");
      root.classList.remove("dark");
    } else {
      root.classList.add("dark");
      root.classList.remove("light");
    }
    localStorage.setItem("glimpse:theme", theme);
    set({ theme });
  },
  toggleTheme() {
    get().setTheme(get().theme === "dark" ? "light" : "dark");
  },

  openComposer() {
    set({ composerOpen: true });
  },
  closeComposer() {
    set({ composerOpen: false });
  },

  setSearchQuery(q) {
    set({ searchQuery: q });
  },

  openComments(postId) {
    set({ activeCommentPostId: postId });
  },
  closeComments() {
    set({ activeCommentPostId: null });
  },

  async loadInitialFeed() {
    const { feed } = get();
    if (feed.initialized || feed.loading) return;
    set({ feed: { ...feed, loading: true } });
    const { posts, nextPage } = await api.fetchFeed({ page: 0 });
    set({
      feed: {
        posts,
        page: nextPage ?? 0,
        hasMore: nextPage !== null,
        loading: false,
        initialized: true,
      },
    });
  },

  async loadMore() {
    const { feed } = get();
    if (feed.loading || !feed.hasMore) return;
    set({ feed: { ...feed, loading: true } });
    const { posts, nextPage } = await api.fetchFeed({ page: feed.page });
    set({
      feed: {
        posts: [...feed.posts, ...posts],
        page: nextPage ?? feed.page,
        hasMore: nextPage !== null,
        loading: false,
        initialized: true,
      },
    });
  },

  async createPost({ text, media }) {
    const post = await api.createPost({ text, media });
    set((s) => ({
      feed: { ...s.feed, posts: [post, ...s.feed.posts] },
    }));
    return post;
  },

  toggleLike(postId) {
    // Optimistic update — don't await the api.
    set((s) => ({
      feed: {
        ...s.feed,
        posts: s.feed.posts.map((p) =>
          p.id === postId
            ? { ...p, liked: !p.liked, likes: p.likes + (p.liked ? -1 : 1) }
            : p
        ),
      },
    }));
    api.toggleLike(postId);
  },

  toggleBookmark(postId) {
    set((s) => ({
      feed: {
        ...s.feed,
        posts: s.feed.posts.map((p) =>
          p.id === postId ? { ...p, bookmarked: !p.bookmarked } : p
        ),
      },
    }));
    api.toggleBookmark(postId);
  },

  share(postId) {
    set((s) => ({
      feed: {
        ...s.feed,
        posts: s.feed.posts.map((p) =>
          p.id === postId ? { ...p, shares: p.shares + 1 } : p
        ),
      },
    }));
    api.share(postId);
  },

  addCommentLocal(postId) {
    set((s) => ({
      feed: {
        ...s.feed,
        posts: s.feed.posts.map((p) =>
          p.id === postId ? { ...p, comments: p.comments + 1 } : p
        ),
      },
    }));
    api.addComment(postId);
  },

  markAllNotificationsRead() {
    api.markAllNotificationsRead();
    set({ notifications: api.listNotifications() });
  },

  // Helpers
  getUser(id) {
    return api.getUser(id);
  },
}));
