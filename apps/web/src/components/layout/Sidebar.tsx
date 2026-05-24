'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, Kanban, Building2, Layers,
  FileText, ShoppingBag, Ship, BarChart3, Sparkles,
  ChevronLeft, ChevronRight, Settings, LogOut, Bell,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/crm', label: 'CRM Pipeline', icon: Kanban },
  { href: '/suppliers', label: 'Suppliers', icon: Building2 },
  { href: '/fabrics', label: 'Fabrics', icon: Layers },
  { href: '/quotes', label: 'Quotes', icon: FileText },
  { href: '/orders', label: 'Orders', icon: ShoppingBag },
  { href: '/shipments', label: 'Shipments', icon: Ship },
  { href: '/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/ai-sourcing', label: 'AI Sourcing', icon: Sparkles },
]

export function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 72 : 240 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="hidden md:flex flex-col bg-deep border-r border-white/5 overflow-hidden flex-shrink-0"
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-white/5 flex-shrink-0">
        <div className="w-8 h-8 flex-shrink-0 rounded-lg bg-gold-gradient flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 1L14 4.5V11.5L8 15L2 11.5V4.5L8 1Z" stroke="white" strokeWidth="1.2" strokeLinejoin="round" />
            <path d="M8 5L11 6.75V10.25L8 12L5 10.25V6.75L8 5Z" fill="white" fillOpacity="0.4" />
          </svg>
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <span className="text-white font-semibold text-sm tracking-[0.08em] uppercase">
                Nobility
              </span>
              <span className="block text-white/30 text-[10px] tracking-[0.12em] uppercase -mt-0.5">
                Textile
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-2 space-y-0.5 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative',
                isActive
                  ? 'bg-white/10 text-white'
                  : 'text-white/50 hover:bg-white/8 hover:text-white/80'
              )}
            >
              <Icon
                size={18}
                className={cn(
                  'flex-shrink-0 transition-colors',
                  isActive ? 'text-gold' : 'text-white/40 group-hover:text-white/60'
                )}
              />
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="truncate"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
              {isActive && (
                <motion.div
                  layoutId="active-sidebar"
                  className="absolute inset-0 rounded-xl bg-white/10"
                  style={{ zIndex: -1 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </Link>
          )
        })}
      </nav>

      {/* Bottom actions */}
      <div className="px-2 pb-4 space-y-0.5 border-t border-white/5 pt-4">
        <button
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-white/40 hover:bg-white/8 hover:text-white/70 text-sm transition-all"
        >
          <Settings size={18} className="flex-shrink-0" />
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="truncate"
              >
                Settings
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        {/* User */}
        <div className={cn(
          'flex items-center gap-3 px-3 py-2.5 rounded-xl',
          collapsed ? 'justify-center' : ''
        )}>
          <div className="w-7 h-7 rounded-full bg-gold-gradient flex-shrink-0 flex items-center justify-center text-white text-xs font-semibold">
            MF
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 min-w-0"
              >
                <p className="text-white/80 text-xs font-medium truncate">Marco Ferragamo</p>
                <p className="text-white/30 text-[10px] truncate">marco@nobility.com</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-5 h-5 rounded-full bg-deep border border-white/10 flex items-center justify-center text-white/40 hover:text-white/80 transition-colors z-10"
      >
        {collapsed ? <ChevronRight size={10} /> : <ChevronLeft size={10} />}
      </button>
    </motion.aside>
  )
}
