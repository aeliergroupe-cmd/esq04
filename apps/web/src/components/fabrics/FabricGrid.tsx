'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Layers } from 'lucide-react'
import { mockFabrics } from '@/lib/mock-data'
import { FabricCard } from './FabricCard'
import { cn } from '@/lib/utils'

const FIBERS = ['All', 'Wool', 'Cashmere', 'Silk', 'Cotton', 'Alpaca', 'Denim']
const SEASONALITY = ['All', 'SS', 'FW', 'Resort', 'All Season']

export function FabricGrid() {
  const [search, setSearch] = useState('')
  const [activeFiber, setActiveFiber] = useState('All')
  const [activeSeason, setActiveSeason] = useState('All')

  const filtered = mockFabrics.filter((f) => {
    const matchesSearch =
      !search ||
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.supplierName.toLowerCase().includes(search.toLowerCase()) ||
      f.sku.toLowerCase().includes(search.toLowerCase())

    const matchesFiber =
      activeFiber === 'All' ||
      (f.fiberContent as Array<{ fiber: string; percentage: number }>).some(
        (fc) => fc.fiber.toLowerCase().includes(activeFiber.toLowerCase())
      )

    const matchesSeason =
      activeSeason === 'All' || f.seasonality.includes(activeSeason)

    return matchesSearch && matchesFiber && matchesSeason
  })

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search fabrics, SKU, supplier…"
            className="input-luxury pl-9 py-2 text-sm"
          />
        </div>

        <div className="flex gap-1 bg-white rounded-xl border border-black/[0.06] p-1">
          {FIBERS.map((fiber) => (
            <button
              key={fiber}
              onClick={() => setActiveFiber(fiber)}
              className={cn(
                'px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                activeFiber === fiber ? 'bg-espresso text-white' : 'text-muted hover:text-espresso'
              )}
            >
              {fiber}
            </button>
          ))}
        </div>

        <div className="flex gap-1 bg-white rounded-xl border border-black/[0.06] p-1">
          {SEASONALITY.map((season) => (
            <button
              key={season}
              onClick={() => setActiveSeason(season)}
              className={cn(
                'px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                activeSeason === season ? 'bg-espresso text-white' : 'text-muted hover:text-espresso'
              )}
            >
              {season}
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs text-muted mb-4">{filtered.length} fabrics found</p>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-muted">
          <Layers size={32} className="mx-auto mb-3 opacity-30" />
          <p>No fabrics match your filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
          {filtered.map((fabric, i) => (
            <motion.div
              key={fabric.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <FabricCard fabric={fabric} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
