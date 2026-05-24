'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { formatCurrency, formatDate, COUNTRY_FLAGS } from '@/lib/utils'
import { mockOrders } from '@/lib/mock-data'
import { cn } from '@/lib/utils'
import { Package, CheckCircle, Truck, Factory, Scissors, FileText, PackageCheck, X } from 'lucide-react'

const STATUS_CONFIG = {
  DRAFT: { label: 'Draft', icon: FileText, color: '#94A3B8', badge: 'badge-slate' },
  CONFIRMED: { label: 'Confirmed', icon: CheckCircle, color: '#60A5FA', badge: 'badge-blue' },
  SAMPLING: { label: 'Sampling', icon: Scissors, color: '#A78BFA', badge: 'bg-violet-50 text-violet-600 border-violet-200' },
  PRODUCTION: { label: 'Production', icon: Factory, color: '#F59E0B', badge: 'badge-amber' },
  QC: { label: 'Quality Check', icon: Package, color: '#F97316', badge: 'bg-orange-50 text-orange-600 border-orange-200' },
  PACKING: { label: 'Packing', icon: Package, color: '#06B6D4', badge: 'bg-cyan-50 text-cyan-600 border-cyan-200' },
  SHIPPED: { label: 'Shipped', icon: Truck, color: '#3B82F6', badge: 'badge-blue' },
  DELIVERED: { label: 'Delivered', icon: PackageCheck, color: '#22C55E', badge: 'badge-green' },
  CANCELLED: { label: 'Cancelled', icon: X, color: '#EF4444', badge: 'badge-red' },
}

const ALL_STATUSES = ['All', ...Object.keys(STATUS_CONFIG)]

export function OrderList() {
  const [activeStatus, setActiveStatus] = useState('All')

  const filtered = mockOrders.filter(
    (o) => activeStatus === 'All' || o.status === activeStatus
  )

  return (
    <div>
      {/* Status tabs */}
      <div className="flex gap-1 bg-white rounded-xl border border-black/[0.06] p-1 mb-6 overflow-x-auto">
        {ALL_STATUSES.map((status) => {
          const count = status === 'All'
            ? mockOrders.length
            : mockOrders.filter((o) => o.status === status).length
          return (
            <button
              key={status}
              onClick={() => setActiveStatus(status)}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap',
                activeStatus === status ? 'bg-espresso text-white' : 'text-muted hover:text-espresso'
              )}
            >
              {status === 'All' ? 'All Orders' : STATUS_CONFIG[status as keyof typeof STATUS_CONFIG]?.label}
              <span className={cn(
                'text-[10px] px-1.5 py-0.5 rounded-full',
                activeStatus === status ? 'bg-white/20 text-white' : 'bg-black/5 text-muted'
              )}>
                {count}
              </span>
            </button>
          )
        })}
      </div>

      {/* Orders */}
      <div className="space-y-3">
        {filtered.map((order, i) => {
          const config = STATUS_CONFIG[order.status as keyof typeof STATUS_CONFIG]
          const Icon = config?.icon || Package
          const flag = COUNTRY_FLAGS[order.supplierCountry] || '🌐'

          return (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
            >
              <Link href={`/orders/${order.id}`}>
                <div className="card-luxury p-5 hover:shadow-luxury-lg transition-all hover:-translate-y-0.5 group">
                  <div className="flex items-start gap-4">
                    {/* Status icon */}
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${config?.color}18` }}
                    >
                      <Icon size={18} style={{ color: config?.color }} />
                    </div>

                    {/* Main info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3 mb-1">
                        <div>
                          <h3 className="font-semibold text-espresso text-sm group-hover:text-gold transition-colors">
                            {order.title}
                          </h3>
                          <p className="text-xs text-muted mt-0.5">
                            <span className="font-mono">{order.orderNo}</span>
                            {' · '}
                            {flag} {order.supplierName}
                            {' · '}
                            {order.incoterm}
                          </p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-sm font-semibold text-espresso">
                            {formatCurrency(order.totalValue, order.currency, true)}
                          </p>
                          <p className="text-[10px] text-muted">{order.items.length} line items</p>
                        </div>
                      </div>

                      {/* Progress + date */}
                      <div className="flex items-center justify-between mt-3">
                        <span className={cn('badge text-[10px]', config?.badge)}>
                          {config?.label}
                        </span>
                        {order.deliveryDate && (
                          <span className="text-[10px] text-muted">
                            {order.status === 'DELIVERED' ? 'Delivered' : 'Expected'}: {formatDate(order.deliveryDate, 'MMM d, yyyy')}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
