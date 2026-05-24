'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Leaf } from 'lucide-react'
import { formatCurrency, COUNTRY_FLAGS } from '@/lib/utils'
import type { MockFabric } from '@/lib/mock-data/fabrics'

interface FabricCardProps {
  fabric: MockFabric
}

export function FabricCard({ fabric }: FabricCardProps) {
  const flag = COUNTRY_FLAGS[fabric.supplierCountry] || '🌐'
  const sustainabilityColor =
    fabric.sustainabilityScore >= 80
      ? 'text-emerald-600 bg-emerald-50'
      : fabric.sustainabilityScore >= 60
      ? 'text-amber-600 bg-amber-50'
      : 'text-muted bg-ivory'

  return (
    <Link href={`/fabrics/${fabric.id}`}>
      <div className="card-luxury-hover overflow-hidden group">
        {/* Image */}
        <div className="relative h-40 overflow-hidden bg-ivory">
          <Image
            src={fabric.images[0] || 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80'}
            alt={fabric.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, 25vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

          {/* Season badges */}
          <div className="absolute top-3 left-3 flex gap-1">
            {fabric.seasonality.map((s) => (
              <span
                key={s}
                className="badge bg-white/90 text-espresso text-[9px] border-0 backdrop-blur-sm"
              >
                {s}
              </span>
            ))}
          </div>

          {/* Sustainability score */}
          {fabric.sustainabilityScore > 0 && (
            <div className={`absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full text-[9px] font-medium ${sustainabilityColor} bg-white/90 backdrop-blur-sm`}>
              <Leaf size={9} />
              {fabric.sustainabilityScore}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-semibold text-espresso text-sm leading-snug group-hover:text-gold transition-colors">
              {fabric.name}
            </h3>
            <span className="text-base flex-shrink-0">{flag}</span>
          </div>

          <p className="text-[11px] text-muted mb-2">
            {fabric.supplierName} · SKU {fabric.sku}
          </p>

          {/* Fiber breakdown */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {(fabric.fiberContent as Array<{ fiber: string; percentage: number }>).map((fc) => (
              <span key={fc.fiber} className="badge badge-slate text-[10px]">
                {fc.percentage}% {fc.fiber}
              </span>
            ))}
          </div>

          {/* Specs row */}
          <div className="flex items-center gap-3 text-[10px] text-muted mb-3">
            {fabric.weightGsm && <span>{fabric.weightGsm} gsm</span>}
            {fabric.widthCm && <span>{fabric.widthCm} cm</span>}
            {fabric.weaveType && <span>{fabric.weaveType}</span>}
          </div>

          {/* Price + MOQ */}
          <div className="flex items-center justify-between border-t border-black/[0.05] pt-3">
            <div>
              <span className="text-sm font-semibold text-espresso">
                {formatCurrency(fabric.pricePerMeter, fabric.currency)}/m
              </span>
            </div>
            <div className="text-right">
              {fabric.moqMeters && (
                <span className="text-[10px] text-muted">MOQ {fabric.moqMeters}m</span>
              )}
              {fabric.leadTimeDays && (
                <p className="text-[10px] text-muted">{fabric.leadTimeDays}d lead time</p>
              )}
            </div>
          </div>

          {/* Certs */}
          {fabric.certifications.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {fabric.certifications.slice(0, 2).map((cert) => (
                <span key={cert} className="badge badge-green text-[9px]">{cert}</span>
              ))}
              {fabric.certifications.length > 2 && (
                <span className="badge badge-slate text-[9px]">+{fabric.certifications.length - 2}</span>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
