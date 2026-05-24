'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Star, MapPin, Award, ExternalLink } from 'lucide-react'
import { cn, formatCurrency, COUNTRY_FLAGS } from '@/lib/utils'
import type { MockSupplier } from '@/lib/mock-data/suppliers'

interface SupplierCardProps {
  supplier: MockSupplier
}

const TIER_STYLES = {
  TIER1: 'badge-gold',
  TIER2: 'badge-blue',
  TIER3: 'badge-slate',
}

const TYPE_LABELS = {
  MILL: 'Textile Mill',
  FACTORY: 'Factory',
  TRADER: 'Trader',
  AGENT: 'Agent',
  DISTRIBUTOR: 'Distributor',
}

export function SupplierCard({ supplier }: SupplierCardProps) {
  const flag = COUNTRY_FLAGS[supplier.country] || '🌐'

  return (
    <Link href={`/suppliers/${supplier.id}`}>
      <div className="card-luxury-hover overflow-hidden group">
        {/* Cover image */}
        <div className="relative h-32 overflow-hidden">
          <Image
            src={supplier.profileImage}
            alt={supplier.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

          {/* Tier badge */}
          <div className="absolute top-3 left-3">
            <span className={cn('badge', TIER_STYLES[supplier.tier as keyof typeof TIER_STYLES])}>
              {supplier.tier.replace('TIER', 'Tier ')}
            </span>
          </div>

          {/* Verified */}
          {supplier.isVerified && (
            <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
              <Award size={12} className="text-white" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-semibold text-espresso text-sm leading-snug group-hover:text-gold transition-colors">
              {supplier.name}
            </h3>
            <span className="text-base flex-shrink-0">{flag}</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-muted mb-3">
            <MapPin size={11} />
            {supplier.city ? `${supplier.city}, ` : ''}{supplier.country}
            <span className="text-muted/30 mx-1">·</span>
            <span className={cn('badge text-[10px]',
              supplier.type === 'MILL' ? 'badge-slate' : 'badge-blue'
            )}>
              {TYPE_LABELS[supplier.type as keyof typeof TYPE_LABELS] || supplier.type}
            </span>
          </div>

          {/* Specialties */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {supplier.specialties.slice(0, 3).map((specialty) => (
              <span key={specialty} className="badge badge-slate text-[10px]">
                {specialty}
              </span>
            ))}
            {supplier.specialties.length > 3 && (
              <span className="badge badge-slate text-[10px]">
                +{supplier.specialties.length - 3}
              </span>
            )}
          </div>

          {/* Bottom row */}
          <div className="flex items-center justify-between text-xs text-muted border-t border-black/[0.05] pt-3">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={11}
                  className={supplier.rating >= star ? 'text-gold fill-gold' : 'text-black/10 fill-black/5'}
                />
              ))}
              <span className="ml-1 text-[10px] text-muted">{supplier.rating?.toFixed(1)}</span>
            </div>
            {supplier.moqMeters && (
              <span className="text-[10px]">MOQ {supplier.moqMeters}m</span>
            )}
            {supplier.priceRangeMin && supplier.priceRangeMax && (
              <span className="text-[10px] font-medium text-espresso">
                {formatCurrency(supplier.priceRangeMin, supplier.currency)}–{formatCurrency(supplier.priceRangeMax, supplier.currency)}/m
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
