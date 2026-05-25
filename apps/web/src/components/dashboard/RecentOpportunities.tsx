'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { formatCurrency, formatRelative, COUNTRY_FLAGS } from '@/lib/utils'
import { mockOpportunities } from '@/lib/mock-data'
import { PIPELINE_STAGES } from '@/lib/constants'

export function RecentOpportunities() {
  const recent = mockOpportunities
    .filter((o) => o.stage !== 'COMPLETED' && o.stage !== 'LOST')
    .slice(0, 5)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="card-luxury p-6"
    >
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-medium text-espresso">Recent Opportunities</h3>
        <Link
          href="/crm"
          className="text-xs text-gold hover:text-gold-dark flex items-center gap-1 transition-colors"
        >
          View all <ArrowRight size={12} />
        </Link>
      </div>

      <div className="space-y-1">
        {recent.map((opp, i) => {
          const stage = PIPELINE_STAGES.find((s) => s.id === opp.stage)
          const flag = COUNTRY_FLAGS[opp.supplierCountry] || '🌐'

          return (
            <motion.div
              key={opp.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, delay: 0.4 + i * 0.06 }}
            >
              <Link
                href={`/crm/${opp.id}`}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-black/[0.03] transition-colors group"
              >
                {/* Avatar */}
                <div className="w-9 h-9 rounded-xl bg-gold/10 flex items-center justify-center text-lg flex-shrink-0">
                  {flag}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-espresso truncate group-hover:text-gold transition-colors">
                    {opp.title}
                  </p>
                  <p className="text-xs text-muted truncate">
                    {opp.supplierName} · {formatRelative(opp.createdAt)}
                  </p>
                </div>

                {/* Stage + value */}
                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                  <p className="text-sm font-semibold text-espresso">
                    {formatCurrency(opp.value, opp.currency, true)}
                  </p>
                  <span
                    className="badge text-[10px]"
                    style={{
                      backgroundColor: `${stage?.color}18`,
                      color: stage?.color,
                      borderColor: `${stage?.color}30`,
                    }}
                  >
                    {stage?.label}
                  </span>
                </div>
              </Link>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
