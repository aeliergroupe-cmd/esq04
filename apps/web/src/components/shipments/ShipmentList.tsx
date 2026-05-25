'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Ship, ArrowRight, MapPin, Calendar, Package } from 'lucide-react'
import { formatDate, COUNTRY_FLAGS } from '@/lib/utils'
import { mockShipments } from '@/lib/mock-data'

const STATUS_CONFIG = {
  BOOKING: { label: 'Booking Confirmed', color: '#94A3B8', bg: 'bg-slate-100 text-slate-600' },
  PICKUP: { label: 'Picked Up', color: '#A78BFA', bg: 'bg-violet-50 text-violet-600' },
  TRANSIT: { label: 'In Transit', color: '#3B82F6', bg: 'bg-blue-50 text-blue-600' },
  CUSTOMS: { label: 'Customs Clearance', color: '#F59E0B', bg: 'bg-amber-50 text-amber-600' },
  DELIVERY: { label: 'Out for Delivery', color: '#F97316', bg: 'bg-orange-50 text-orange-600' },
  DELIVERED: { label: 'Delivered', color: '#22C55E', bg: 'bg-emerald-50 text-emerald-600' },
  DELAYED: { label: 'Delayed', color: '#EF4444', bg: 'bg-red-50 text-red-600' },
  CANCELLED: { label: 'Cancelled', color: '#9CA3AF', bg: 'bg-slate-100 text-slate-400' },
}

const PROGRESS_STEPS = ['BOOKING', 'PICKUP', 'TRANSIT', 'CUSTOMS', 'DELIVERY', 'DELIVERED']

export function ShipmentList() {
  return (
    <div className="space-y-4">
      {mockShipments.map((shipment, i) => {
        const config = STATUS_CONFIG[shipment.status as keyof typeof STATUS_CONFIG]
        const currentStep = PROGRESS_STEPS.indexOf(shipment.status)
        const originFlag = COUNTRY_FLAGS[shipment.originCountry || ''] || '🌐'
        const destFlag = COUNTRY_FLAGS[shipment.destCountry || ''] || '🌐'

        return (
          <motion.div
            key={shipment.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <Link href={`/shipments/${shipment.id}`}>
              <div className="card-luxury p-6 hover:shadow-luxury-lg transition-all hover:-translate-y-0.5 group">
                <div className="flex flex-col sm:flex-row sm:items-start gap-5">
                  {/* Left: carrier info */}
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                      <Ship size={20} className="text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-xs font-semibold text-espresso">{shipment.reference}</span>
                        <span className={`badge text-[10px] ${config?.bg}`}>
                          {config?.label}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-espresso group-hover:text-gold transition-colors mb-1">
                        {shipment.carrier}
                        {shipment.trackingNumber && (
                          <span className="text-xs text-muted font-normal ml-2 font-mono">
                            {shipment.trackingNumber}
                          </span>
                        )}
                      </p>

                      {/* Route */}
                      <div className="flex items-center gap-2 text-xs text-muted">
                        <span>{originFlag} {shipment.originPort}, {shipment.originCountry}</span>
                        <ArrowRight size={12} className="text-muted/40" />
                        <span>{destFlag} {shipment.destPort}, {shipment.destCountry}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: dates + details */}
                  <div className="flex flex-row sm:flex-col gap-4 sm:gap-2 sm:text-right text-xs text-muted">
                    {shipment.etd && (
                      <div className="flex items-center gap-1 sm:justify-end">
                        <Calendar size={11} />
                        <span>ETD: {formatDate(shipment.etd, 'MMM d')}</span>
                      </div>
                    )}
                    {shipment.eta && (
                      <div className="flex items-center gap-1 sm:justify-end">
                        <Calendar size={11} />
                        <span>ETA: {formatDate(shipment.eta, 'MMM d')}</span>
                      </div>
                    )}
                    {shipment.grossWeightKg && (
                      <div className="flex items-center gap-1 sm:justify-end">
                        <Package size={11} />
                        <span>{shipment.grossWeightKg.toLocaleString()} kg</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-5">
                  <div className="flex items-center gap-1">
                    {PROGRESS_STEPS.map((step, stepIdx) => {
                      const isCompleted = stepIdx < currentStep || shipment.status === 'DELIVERED'
                      const isActive = step === shipment.status
                      return (
                        <div key={step} className="flex-1 flex flex-col items-center gap-1">
                          <div
                            className="h-1.5 w-full rounded-full transition-all"
                            style={{
                              backgroundColor: isCompleted || isActive
                                ? config?.color
                                : '#E5E7EB',
                              opacity: isActive ? 1 : isCompleted ? 0.7 : 0.3,
                            }}
                          />
                          <span className={`text-[9px] hidden sm:block ${
                            isActive ? 'text-espresso font-medium' : 'text-muted/50'
                          }`}>
                            {step === 'TRANSIT' ? 'Transit' :
                             step === 'CUSTOMS' ? 'Customs' :
                             step === 'DELIVERY' ? 'Delivery' :
                             step.charAt(0) + step.slice(1).toLowerCase()}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Events preview */}
                {shipment.events && shipment.events.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-black/[0.05]">
                    <div className="flex items-center justify-between">
                      <p className="text-[10px] text-muted">
                        Latest: {(shipment.events as Array<{date: string; location: string; status: string}>)[shipment.events.length - 1].status}
                        {' · '}{(shipment.events as Array<{date: string; location: string; status: string}>)[shipment.events.length - 1].location}
                      </p>
                      <span className="text-[10px] text-gold flex items-center gap-1">
                        {shipment.events.length} events <ArrowRight size={10} />
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </Link>
          </motion.div>
        )
      })}
    </div>
  )
}
