'use client'

import { motion } from 'framer-motion'
import { MessageSquare, Phone, Mail, Calendar, FileText, Zap } from 'lucide-react'
import { formatRelative } from '@/lib/utils'
import { mockActivities } from '@/lib/mock-data'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const ACTIVITY_ICONS = {
  NOTE: MessageSquare,
  CALL: Phone,
  EMAIL: Mail,
  MEETING: Calendar,
  TASK: FileText,
  SYSTEM: Zap,
}

const ACTIVITY_COLORS = {
  NOTE: 'text-blue-500 bg-blue-50',
  CALL: 'text-emerald-500 bg-emerald-50',
  EMAIL: 'text-violet-500 bg-violet-50',
  MEETING: 'text-amber-500 bg-amber-50',
  TASK: 'text-slate-500 bg-slate-100',
  SYSTEM: 'text-gold bg-gold/10',
}

export function ActivityFeed() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="card-luxury p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-espresso">Activity Feed</h3>
        <Link href="/crm" className="text-xs text-gold hover:text-gold-dark flex items-center gap-1">
          View all <ArrowRight size={12} />
        </Link>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-3.5 top-0 bottom-0 w-px bg-black/[0.05]" />

        <div className="space-y-4">
          {mockActivities.slice(0, 5).map((activity, i) => {
            const Icon = ACTIVITY_ICONS[activity.type as keyof typeof ACTIVITY_ICONS] || Zap
            const colorClass = ACTIVITY_COLORS[activity.type as keyof typeof ACTIVITY_COLORS] || 'text-muted bg-ivory'

            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.5 + i * 0.06 }}
                className="flex gap-3 relative"
              >
                <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${colorClass}`}>
                  <Icon size={12} />
                </div>
                <div className="flex-1 min-w-0 pt-0.5">
                  <p className="text-xs text-espresso leading-relaxed">{activity.content}</p>
                  <p className="text-[10px] text-muted mt-1">{formatRelative(activity.createdAt)}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}
