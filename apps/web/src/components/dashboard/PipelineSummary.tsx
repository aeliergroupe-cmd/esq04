'use client'

import { motion } from 'framer-motion'
import { formatCurrency } from '@/lib/utils'
import { mockOpportunities } from '@/lib/mock-data'
import { PIPELINE_STAGES } from '@/lib/constants'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function PipelineSummary() {
  const stageData = PIPELINE_STAGES.map((stage) => {
    const opps = mockOpportunities.filter((o) => o.stage === stage.id)
    return {
      ...stage,
      count: opps.length,
      value: opps.reduce((sum, o) => sum + o.value, 0),
    }
  })

  const total = stageData.reduce((sum, s) => sum + s.value, 0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="card-luxury p-6"
    >
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="font-medium text-espresso">Pipeline Overview</h3>
          <p className="text-xs text-muted mt-0.5">
            Total value: <span className="font-semibold text-espresso">{formatCurrency(total, 'USD', true)}</span>
          </p>
        </div>
        <Link
          href="/crm"
          className="text-xs text-gold hover:text-gold-dark flex items-center gap-1 transition-colors"
        >
          View pipeline <ArrowRight size={12} />
        </Link>
      </div>

      {/* Stage bars */}
      <div className="space-y-3">
        {stageData.map((stage) => (
          <div key={stage.id}>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: stage.color }}
                />
                <span className="text-muted">{stage.label}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-muted/70">{stage.count} deals</span>
                <span className="font-medium text-espresso">
                  {stage.value > 0 ? formatCurrency(stage.value, 'USD', true) : '—'}
                </span>
              </div>
            </div>
            <div className="h-1.5 bg-black/5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: total > 0 ? `${(stage.value / total) * 100}%` : '0%' }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="h-full rounded-full"
                style={{ backgroundColor: stage.color }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
