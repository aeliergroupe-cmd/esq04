'use client'

import { motion } from 'framer-motion'
import { PIPELINE_STAGES } from '@/lib/constants'
import { mockOpportunities } from '@/lib/mock-data'
import { DealCard } from './DealCard'
import { formatCurrency } from '@/lib/utils'
import { Plus } from 'lucide-react'

export function KanbanBoard() {
  return (
    <div className="h-full overflow-x-auto">
      <div className="flex gap-4 p-6 h-full min-w-max">
        {PIPELINE_STAGES.map((stage, colIdx) => {
          const deals = mockOpportunities.filter((o) => o.stage === stage.id)
          const totalValue = deals.reduce((sum, d) => sum + d.value, 0)

          return (
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: colIdx * 0.06 }}
              className="kanban-column"
            >
              {/* Column header */}
              <div className="flex items-center justify-between px-1 mb-3">
                <div className="flex items-center gap-2">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: stage.color }}
                  />
                  <span className="text-sm font-medium text-espresso">{stage.label}</span>
                  <span
                    className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-medium"
                    style={{
                      backgroundColor: `${stage.color}18`,
                      color: stage.color,
                    }}
                  >
                    {deals.length}
                  </span>
                </div>
                {totalValue > 0 && (
                  <span className="text-[10px] text-muted font-medium">
                    {formatCurrency(totalValue, 'USD', true)}
                  </span>
                )}
              </div>

              {/* Cards */}
              <div className="space-y-3 flex-1 overflow-y-auto pr-1">
                {deals.map((deal, cardIdx) => (
                  <motion.div
                    key={deal.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: colIdx * 0.06 + cardIdx * 0.04 }}
                  >
                    <DealCard deal={deal} stageColor={stage.color} />
                  </motion.div>
                ))}

                {/* Add deal button */}
                <button className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-muted/60 hover:text-muted hover:bg-black/[0.04] border border-dashed border-black/10 text-xs transition-all">
                  <Plus size={13} />
                  Add deal
                </button>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
