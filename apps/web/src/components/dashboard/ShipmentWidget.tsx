'use client'

import Link from 'next/link'
import { ArrowRight, Ship } from 'lucide-react'
import { mockShipments } from '@/lib/mock-data'
import { formatDate } from '@/lib/utils'
import { motion } from 'framer-motion'

const STATUS_COLORS = {
  TRANSIT: 'text-blue-600 bg-blue-50',
  CUSTOMS: 'text-amber-600 bg-amber-50',
  DELIVERED: 'text-emerald-600 bg-emerald-50',
  BOOKING: 'text-slate-600 bg-slate-100',
  PICKUP: 'text-violet-600 bg-violet-50',
  DELIVERY: 'text-orange-600 bg-orange-50',
  DELAYED: 'text-red-600 bg-red-50',
  CANCELLED: 'text-slate-400 bg-slate-100',
}

export function ShipmentWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="card-luxury p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-espresso">Active Shipments</h3>
        <Link href="/shipments" className="text-xs text-gold hover:text-gold-dark flex items-center gap-1">
          View all <ArrowRight size={12} />
        </Link>
      </div>

      <div className="space-y-3">
        {mockShipments.slice(0, 3).map((shipment) => {
          const statusColor = STATUS_COLORS[shipment.status as keyof typeof STATUS_COLORS] || 'text-muted bg-ivory'

          return (
            <Link
              key={shipment.id}
              href={`/shipments/${shipment.id}`}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-black/[0.03] transition-colors group"
            >
              <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                <Ship size={14} className="text-gold" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-espresso truncate">{shipment.reference}</p>
                <p className="text-[10px] text-muted">
                  {shipment.originCountry} → {shipment.destCountry}
                </p>
                {shipment.eta && (
                  <p className="text-[10px] text-muted/60">ETA: {formatDate(shipment.eta, 'MMM d')}</p>
                )}
              </div>
              <span className={`badge text-[10px] ${statusColor}`}>
                {shipment.status}
              </span>
            </Link>
          )
        })}
      </div>
    </motion.div>
  )
}
