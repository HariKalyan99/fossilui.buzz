import { create } from 'zustand'

const STORAGE_KEY = 'eleven-sidebar-collapsed'

function getInitial() {
  if (typeof window === 'undefined') return false
  return localStorage.getItem(STORAGE_KEY) === 'true'
}

export const useSidebarStore = create((set, get) => ({
  collapsed: getInitial(),
  mobileOpen: false,
  toggle: () => {
    const next = !get().collapsed
    localStorage.setItem(STORAGE_KEY, String(next))
    set({ collapsed: next })
  },
  setCollapsed: (collapsed) => {
    localStorage.setItem(STORAGE_KEY, String(collapsed))
    set({ collapsed })
  },
  openMobile: () => set({ mobileOpen: true }),
  closeMobile: () => set({ mobileOpen: false }),
  toggleMobile: () => set({ mobileOpen: !get().mobileOpen }),
}))
