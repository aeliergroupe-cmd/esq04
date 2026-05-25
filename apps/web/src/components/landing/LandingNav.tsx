'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { Menu, X } from 'lucide-react'

export function LandingNav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav className={cn(
      'fixed top-0 inset-x-0 z-50 transition-all duration-500',
      scrolled ? 'bg-white/90 backdrop-blur-xl border-b border-black/[0.06] shadow-luxury' : 'bg-transparent'
    )}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gold-gradient flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 1L14 4.5V11.5L8 15L2 11.5V4.5L8 1Z" stroke="white" strokeWidth="1.2" strokeLinejoin="round" />
              <path d="M8 5L11 6.75V10.25L8 12L5 10.25V6.75L8 5Z" fill="white" fillOpacity="0.5" />
            </svg>
          </div>
          <span className="font-semibold text-espresso tracking-[0.08em] text-sm uppercase">Nobility</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {['Platform', 'Suppliers', 'Fabrics', 'Pricing'].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm text-muted hover:text-espresso transition-colors"
            >
              {item}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/dashboard" className="btn-ghost text-sm py-2">
            Sign in
          </Link>
          <Link href="/dashboard" className="btn-primary py-2 text-xs">
            Request Access
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-espresso"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-black/[0.06] px-6 py-4 space-y-3">
          {['Platform', 'Suppliers', 'Fabrics', 'Pricing'].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              className="block text-sm text-muted hover:text-espresso py-2"
              onClick={() => setMobileOpen(false)}
            >
              {item}
            </Link>
          ))}
          <Link href="/dashboard" className="btn-primary w-full justify-center mt-4">
            Request Access
          </Link>
        </div>
      )}
    </nav>
  )
}
