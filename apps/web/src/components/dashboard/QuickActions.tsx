'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Plus, FileText, Building2, Sparkles } from 'lucide-react'

const ACTIONS = [
  { href: '/quotes/new', label: 'New RFQ', icon: FileText, color: 'bg-violet-50 text-violet-600' },
  { href: '/suppliers', label: 'Add Supplier', icon: Building2, color: 'bg-blue-50 text-blue-600' },
  { href: '/ai-sourcing', label: 'AI Sourcing', icon: Sparkles, color: 'bg-gold/10 text-gold' },
]

export function QuickActions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.35 }}
      className="card-luxury p-6"
    >
      <h3 className="font-medium text-espresso mb-4">Quick Actions</h3>
      <div className="grid grid-cols-3 gap-3">
        {ACTIONS.map((action) => {
          const Icon = action.icon
          return (
            <Link
              key={action.href}
              href={action.href}
              className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-black/[0.03] transition-all group"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${action.color} group-hover:scale-110 transition-transform`}>
                <Icon size={18} />
              </div>
              <span className="text-[10px] text-muted text-center leading-tight">{action.label}</span>
            </Link>
          )
        })}
      </div>
    </motion.div>
  )
}
