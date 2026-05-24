'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Kanban, Building2, ShoppingBag, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

const MOBILE_NAV = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/crm', label: 'Pipeline', icon: Kanban },
  { href: '/suppliers', label: 'Suppliers', icon: Building2 },
  { href: '/orders', label: 'Orders', icon: ShoppingBag },
  { href: '/ai-sourcing', label: 'AI', icon: Sparkles },
]

export function MobileNav() {
  const pathname = usePathname()

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-white border-t border-black/[0.06] pb-safe">
      <div className="flex items-center justify-around px-2 pt-2 pb-3">
        {MOBILE_NAV.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-all',
                isActive ? 'text-gold' : 'text-muted'
              )}
            >
              <Icon size={20} strokeWidth={isActive ? 2 : 1.5} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
