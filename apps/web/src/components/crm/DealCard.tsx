'use client'

import Link from 'next/link'
import { formatCurrency, formatDate, getDaysUntil, COUNTRY_FLAGS } from '@/lib/utils'
import { Calendar, User } from 'lucide-react'
import type { MockOpportunity } from '@/lib/mock-data/opportunities'

interface DealCardProps {
  deal: MockOpportunity
  stageColor: string
}

export function DealCard({ deal, stageColor }: DealCardProps) {
  const flag = COUNTRY_FLAGS[deal.supplierCountry] || '🌐'
  const daysUntil = deal.expectedCloseDate ? getDaysUntil(deal.expectedCloseDate) : null
  const isOverdue = daysUntil !== null && daysUntil < 0
  const isUrgent = daysUntil !== null && daysUntil >= 0 && daysUntil <= 7

  return (
    <Link href={`/crm/${deal.id}`}>
      <div className="kanban-card group">
        {/* Top: value + flag */}
        <div className="flex items-start justify-between mb-3">
          <span className="text-base font-semibold text-espresso">
            {formatCurrency(deal.value, deal.currency, true)}
          </span>
          <span className="text-lg">{flag}</span>
        </div>

        {/* Title */}
        <p className="text-sm font-medium text-espresso leading-snug mb-1 group-hover:text-gold transition-colors">
          {deal.title}
        </p>
        <p className="text-xs text-muted mb-3">{deal.supplierName}</p>

        {/* Probability bar */}
        <div className="mb-3">
          <div className="flex justify-between text-[10px] text-muted/70 mb-1">
            <span>Probability</span>
            <span>{deal.probability}%</span>
          </div>
          <div className="h-1 bg-black/5 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${deal.probability}%`,
                backgroundColor: stageColor,
              }}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          {deal.contactName && (
            <div className="flex items-center gap-1 text-[10px] text-muted">
              <User size={10} />
              {deal.contactName}
            </div>
          )}
          {deal.expectedCloseDate && (
            <div className={`flex items-center gap-1 text-[10px] ml-auto ${
              isOverdue ? 'text-red-500' : isUrgent ? 'text-amber-500' : 'text-muted'
            }`}>
              <Calendar size={10} />
              {isOverdue
                ? `${Math.abs(daysUntil!)}d overdue`
                : daysUntil === 0
                ? 'Due today'
                : `${daysUntil}d left`}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
