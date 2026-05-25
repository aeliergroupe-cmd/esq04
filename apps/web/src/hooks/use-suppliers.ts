'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { mockSuppliers } from '@/lib/mock-data'

export type SupplierFilters = {
  type?: string
  tier?: string
  country?: string
  search?: string
}

export function useSuppliers(filters: SupplierFilters = {}) {
  return useQuery({
    queryKey: ['suppliers', filters],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 200))
      let results = [...mockSuppliers]
      if (filters.type && filters.type !== 'All') {
        results = results.filter((s) => s.type === filters.type)
      }
      if (filters.tier && filters.tier !== 'All') {
        results = results.filter((s) => s.tier === filters.tier)
      }
      if (filters.country && filters.country !== 'All') {
        results = results.filter((s) => s.country === filters.country)
      }
      if (filters.search) {
        const q = filters.search.toLowerCase()
        results = results.filter(
          (s) =>
            s.name.toLowerCase().includes(q) ||
            s.country.toLowerCase().includes(q) ||
            s.specialties.some((sp) => sp.toLowerCase().includes(q))
        )
      }
      return results
    },
    staleTime: 5 * 60 * 1000,
  })
}

export function useSupplier(id: string) {
  return useQuery({
    queryKey: ['supplier', id],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 150))
      const supplier = mockSuppliers.find((s) => s.id === id)
      if (!supplier) throw new Error(`Supplier ${id} not found`)
      return supplier
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  })
}

export function useSupplierStats() {
  return useQuery({
    queryKey: ['suppliers', 'stats'],
    queryFn: async () => {
      const suppliers = mockSuppliers
      const byCountry = suppliers.reduce<Record<string, number>>((acc, s) => {
        acc[s.country] = (acc[s.country] ?? 0) + 1
        return acc
      }, {})
      return {
        total: suppliers.length,
        verified: suppliers.filter((s) => s.isVerified).length,
        tier1: suppliers.filter((s) => s.tier === 'TIER1').length,
        countries: Object.keys(byCountry).length,
        byCountry,
      }
    },
    staleTime: 10 * 60 * 1000,
  })
}
