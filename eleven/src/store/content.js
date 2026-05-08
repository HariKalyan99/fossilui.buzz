import { create } from 'zustand'
import { mockPosts, mockUsers, mockMedia, mockActivity } from '@/data/mock'

/**
 * Single source of truth for content + media + users + activity.
 * Kept simple intentionally — no networking layer to over-design.
 */
export const useContentStore = create((set, get) => ({
  posts: mockPosts,
  users: mockUsers,
  media: mockMedia,
  activity: mockActivity,

  // ---- Posts ----
  upsertPost: (post) =>
    set((state) => {
      const exists = state.posts.some((p) => p.id === post.id)
      const next = exists
        ? state.posts.map((p) => (p.id === post.id ? { ...p, ...post } : p))
        : [post, ...state.posts]
      return { posts: next }
    }),

  deletePost: (id) =>
    set((state) => ({ posts: state.posts.filter((p) => p.id !== id) })),

  deletePosts: (ids) =>
    set((state) => ({ posts: state.posts.filter((p) => !ids.includes(p.id)) })),

  setPostStatus: (ids, status) =>
    set((state) => ({
      posts: state.posts.map((p) =>
        ids.includes(p.id) ? { ...p, status, updatedAt: new Date().toISOString() } : p,
      ),
    })),

  // ---- Media ----
  addMedia: (file) =>
    set((state) => ({ media: [file, ...state.media] })),

  deleteMedia: (id) =>
    set((state) => ({ media: state.media.filter((m) => m.id !== id) })),

  // ---- Activity log ----
  logActivity: (entry) =>
    set((state) => ({
      activity: [
        { id: crypto.randomUUID?.() || String(Date.now()), at: new Date().toISOString(), ...entry },
        ...state.activity,
      ].slice(0, 50),
    })),

  // ---- Selectors ----
  getPost: (id) => get().posts.find((p) => p.id === id),
  getUser: (id) => get().users.find((u) => u.id === id),
}))
