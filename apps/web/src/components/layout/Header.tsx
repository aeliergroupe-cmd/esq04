'use client'

import { Bell, Search, Plus } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface HeaderProps {
  title?: string
  subtitle?: string
  action?: React.ReactNode
}

export function Header({ title, subtitle, action }: HeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <header className="h-16 flex items-center justify-between px-6 bg-white border-b border-black/[0.06] flex-shrink-0">
      {/* Page title */}
      <div>
        {title && (
          <h1 className="text-heading font-medium text-espresso">{title}</h1>
        )}
        {subtitle && (
          <p className="text-xs text-muted mt-0.5">{subtitle}</p>
        )}
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2">
        {/* Search */}
        <div className={cn(
          'flex items-center gap-2 transition-all duration-300',
          searchOpen ? 'w-64' : 'w-9'
        )}>
          {searchOpen ? (
            <input
              autoFocus
              onBlur={() => setSearchOpen(false)}
              placeholder="Search suppliers, fabrics, orders…"
              className="w-full px-3 py-1.5 text-sm rounded-lg border border-black/10 bg-ivory focus:outline-none focus:ring-2 focus:ring-gold/30"
            />
          ) : (
            <button
              onClick={() => setSearchOpen(true)}
              className="w-9 h-9 flex items-center justify-center rounded-xl text-muted hover:bg-ivory hover:text-espresso transition-all"
            >
              <Search size={16} />
            </button>
          )}
        </div>

        {/* Notifications */}
        <button className="relative w-9 h-9 flex items-center justify-center rounded-xl text-muted hover:bg-ivory hover:text-espresso transition-all">
          <Bell size={16} />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-gold" />
        </button>

        {/* Custom action */}
        {action}

        {/* New */}
        <button className="btn-primary py-2 text-xs">
          <Plus size={14} />
          New
        </button>

        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-gold-gradient flex items-center justify-center text-white text-xs font-semibold cursor-pointer">
          MF
        </div>
      </div>
    </header>
  )
}
