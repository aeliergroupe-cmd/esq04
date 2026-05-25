'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Star, Globe, Award } from 'lucide-react'
import { mockSuppliers } from '@/lib/mock-data'
import { SupplierCard } from './SupplierCard'
import { cn } from '@/lib/utils'

const TYPES = ['All', 'MILL', 'FACTORY', 'TRADER', 'AGENT', 'DISTRIBUTOR']
const REGIONS = ['All', 'Europe', 'Asia', 'Americas', 'Middle East']

export function SupplierGrid() {
  const [search, setSearch] = useState('')
  const [activeType, setActiveType] = useState('All')
  const [activeRegion, setActiveRegion] = useState('All')

  const EUROPE_COUNTRIES = ['Italy', 'France', 'UK', 'Portugal', 'Spain', 'Germany', 'Switzerland']
  const ASIA_COUNTRIES = ['Japan', 'China', 'India', 'Bangladesh', 'Vietnam', 'Korea', 'Turkey']
  const AMERICAS_COUNTRIES = ['Peru', 'Brazil', 'USA', 'Canada']

  const filtered = mockSuppliers.filter((s) => {
    const matchesSearch =
      !search ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.country.toLowerCase().includes(search.toLowerCase()) ||
      s.specialties.some((sp) => sp.toLowerCase().includes(search.toLowerCase()))

    const matchesType = activeType === 'All' || s.type === activeType

    const matchesRegion =
      activeRegion === 'All' ||
      (activeRegion === 'Europe' && EUROPE_COUNTRIES.includes(s.country)) ||
      (activeRegion === 'Asia' && ASIA_COUNTRIES.includes(s.country)) ||
      (activeRegion === 'Americas' && AMERICAS_COUNTRIES.includes(s.country))

    return matchesSearch && matchesType && matchesRegion
  })

  return (
    <div>
      {/* Stats bar */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { icon: Globe, label: 'Verified Suppliers', value: mockSuppliers.filter((s) => s.isVerified).length },
          { icon: Star, label: 'Tier 1 Partners', value: mockSuppliers.filter((s) => s.tier === 'TIER1').length },
          { icon: Award, label: 'Countries', value: [...new Set(mockSuppliers.map((s) => s.country))].length },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} className="card-luxury p-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gold/10 flex items-center justify-center">
              <Icon size={16} className="text-gold" />
            </div>
            <div>
              <p className="text-lg font-semibold text-espresso">{value}</p>
              <p className="text-xs text-muted">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search suppliers…"
            className="input-luxury pl-9 py-2 text-sm"
          />
        </div>

        {/* Type filter */}
        <div className="flex gap-1 bg-white rounded-xl border border-black/[0.06] p-1">
          {TYPES.map((type) => (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className={cn(
                'px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                activeType === type
                  ? 'bg-espresso text-white'
                  : 'text-muted hover:text-espresso'
              )}
            >
              {type === 'All' ? 'All Types' : type.charAt(0) + type.slice(1).toLowerCase()}
            </button>
          ))}
        </div>

        {/* Region filter */}
        <div className="flex gap-1 bg-white rounded-xl border border-black/[0.06] p-1">
          {REGIONS.map((region) => (
            <button
              key={region}
              onClick={() => setActiveRegion(region)}
              className={cn(
                'px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                activeRegion === region
                  ? 'bg-espresso text-white'
                  : 'text-muted hover:text-espresso'
              )}
            >
              {region}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-muted">
          <Globe size={32} className="mx-auto mb-3 opacity-30" />
          <p>No suppliers match your filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((supplier, i) => (
            <motion.div
              key={supplier.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <SupplierCard supplier={supplier} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
