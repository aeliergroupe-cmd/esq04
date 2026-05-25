import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  read: boolean
  createdAt: string
}

interface UIState {
  sidebarCollapsed: boolean
  activeFilters: Record<string, string[]>
  notifications: Notification[]
  unreadCount: number

  toggleSidebar: () => void
  setSidebarCollapsed: (collapsed: boolean) => void

  setFilter: (section: string, key: string, values: string[]) => void
  clearFilters: (section: string) => void
  clearAllFilters: () => void

  addNotification: (notification: Omit<Notification, 'id' | 'read' | 'createdAt'>) => void
  markNotificationRead: (id: string) => void
  markAllNotificationsRead: () => void
  clearNotification: (id: string) => void
}

export const useUIStore = create<UIState>()(
  persist(
    (set, get) => ({
      sidebarCollapsed: false,
      activeFilters: {},
      notifications: [
        {
          id: 'notif_01',
          title: 'Quote received',
          message: 'Vitale Barberis Canonico responded to RFQ-2025-0089',
          type: 'success',
          read: false,
          createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: 'notif_02',
          title: 'Shipment update',
          message: 'SHP-2025-0089 is approaching Genoa — ETA in 18 days',
          type: 'info',
          read: false,
          createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: 'notif_03',
          title: 'Deal moved',
          message: 'Como Silk Jacquard SS25 advanced to Negotiation stage',
          type: 'info',
          read: true,
          createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        },
      ],
      unreadCount: 2,

      toggleSidebar: () =>
        set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),

      setSidebarCollapsed: (collapsed) =>
        set({ sidebarCollapsed: collapsed }),

      setFilter: (section, key, values) =>
        set((state) => ({
          activeFilters: {
            ...state.activeFilters,
            [`${section}.${key}`]: values,
          },
        })),

      clearFilters: (section) =>
        set((state) => {
          const next = { ...state.activeFilters }
          Object.keys(next).forEach((k) => {
            if (k.startsWith(`${section}.`)) delete next[k]
          })
          return { activeFilters: next }
        }),

      clearAllFilters: () => set({ activeFilters: {} }),

      addNotification: (notification) => {
        const n: Notification = {
          ...notification,
          id: `notif_${Date.now()}`,
          read: false,
          createdAt: new Date().toISOString(),
        }
        set((state) => ({
          notifications: [n, ...state.notifications],
          unreadCount: state.unreadCount + 1,
        }))
      },

      markNotificationRead: (id) =>
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          ),
          unreadCount: Math.max(0, state.unreadCount - 1),
        })),

      markAllNotificationsRead: () =>
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, read: true })),
          unreadCount: 0,
        })),

      clearNotification: (id) =>
        set((state) => {
          const n = state.notifications.find((n) => n.id === id)
          return {
            notifications: state.notifications.filter((n) => n.id !== id),
            unreadCount: n && !n.read ? Math.max(0, state.unreadCount - 1) : state.unreadCount,
          }
        }),
    }),
    {
      name: 'nobility-ui',
      partialize: (state) => ({
        sidebarCollapsed: state.sidebarCollapsed,
      }),
    }
  )
)
