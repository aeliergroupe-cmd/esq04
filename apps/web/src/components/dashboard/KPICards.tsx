'use client'

import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, DollarSign, Kanban, FileText, Ship } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
import { mockOpportunities, mockOrders, mockShipments } from '@/lib/mock-data'

const pipelineValue = mockOpportunities
  .filter((o) => o.stage !== 'COMPLETED' && o.stage !== 'LOST')
  .reduce((sum, o) => sum + o.value, 0)

const activeDeals = mockOpportunities.filter(
  (o) => o.stage !== 'COMPLETED' && o.stage !== 'LOST'
).length

const openOrders = mockOrders.filter(
  (o) => o.status !== 'DELIVERED' && o.status !== 'CANCELLED'
).length

const shipmentsInTransit = mockShipments.filter(
  (s) => s.status === 'TRANSIT' || s.status === 'CUSTOMS'
).length

const KPIS = [
  {
    label: 'Pipeline Value',
    value: formatCurrency(pipelineValue, 'USD', true),
    change: '+24%',
    trend: 'up',
    icon: DollarSign,
    description: 'vs last quarter',
  },
  {
    label: 'Active Deals',
    value: activeDeals.toString(),
    change: '+3',
    trend: 'up',
    icon: Kanban,
    description: 'across 7 stages',
  },
  {
    label: 'Open Orders',
    value: openOrders.toString(),
    change: '-1',
    trend: 'neutral',
    icon: FileText,
    description: 'in production',
  },
  {
    label: 'In Transit',
    value: shipmentsInTransit.toString(),
    change: '+1',
    trend: 'up',
    icon: Ship,
    description: 'active shipments',
  },
]

export function KPICards() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {KPIS.map((kpi, i) => {
        const Icon = kpi.icon
        return (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="stat-card"
          >
            <div className="flex items-start justify-between">
              <div className="w-9 h-9 rounded-xl bg-gold/10 flex items-center justify-center">
                <Icon size={16} className="text-gold" />
              </div>
              <span className={`text-xs font-medium flex items-center gap-1 ${
                kpi.trend === 'up' ? 'text-emerald-600' : kpi.trend === 'down' ? 'text-red-500' : 'text-muted'
              }`}>
                {kpi.trend === 'up' ? <TrendingUp size={11} /> : kpi.trend === 'down' ? <TrendingDown size={11} /> : null}
                {kpi.change}
              </span>
            </div>
            <div>
              <p className="text-2xl font-semibold text-espresso tracking-tight">{kpi.value}</p>
              <p className="text-xs text-muted">{kpi.label}</p>
              <p className="text-[10px] text-muted/60 mt-0.5">{kpi.description}</p>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
