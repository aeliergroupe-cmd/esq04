'use client'

import { useQuery } from '@tanstack/react-query'
import { mockOpportunities } from '@/lib/mock-data'

export type OpportunityFilters = {
  stage?: string
  supplierId?: string
}

export function useOpportunities(filters: OpportunityFilters = {}) {
  return useQuery({
    queryKey: ['opportunities', filters],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 180))
      let results = [...mockOpportunities]
      if (filters.stage && filters.stage !== 'All') {
        results = results.filter((o) => o.stage === filters.stage)
      }
      if (filters.supplierId) {
        results = results.filter((o) => o.supplierId === filters.supplierId)
      }
      return results
    },
    staleTime: 2 * 60 * 1000,
  })
}

export function useOpportunity(id: string) {
  return useQuery({
    queryKey: ['opportunity', id],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 150))
      const opp = mockOpportunities.find((o) => o.id === id)
      if (!opp) throw new Error(`Opportunity ${id} not found`)
      return opp
    },
    enabled: !!id,
    staleTime: 2 * 60 * 1000,
  })
}

export function usePipelineSummary() {
  return useQuery({
    queryKey: ['pipeline', 'summary'],
    queryFn: async () => {
      const stages = ['DISCOVERY', 'SAMPLING', 'QUOTATION', 'NEGOTIATION', 'PRODUCTION', 'SHIPMENT', 'COMPLETED']
      return stages.map((stage) => {
        const deals = mockOpportunities.filter((o) => o.stage === stage)
        return {
          stage,
          count: deals.length,
          totalValue: deals.reduce((sum, d) => sum + (d.value ?? 0), 0),
        }
      })
    },
    staleTime: 5 * 60 * 1000,
  })
}

export function useDashboardMetrics() {
  return useQuery({
    queryKey: ['dashboard', 'metrics'],
    queryFn: async () => {
      const active = mockOpportunities.filter(
        (o) => !['COMPLETED', 'LOST'].includes(o.stage)
      )
      const pipelineValue = active.reduce((sum, o) => sum + (o.value ?? 0), 0)
      const activeDeals = active.length
      return {
        pipelineValue,
        activeDeals,
        openRFQs: 3,
        shipmentsInTransit: 2,
      }
    },
    staleTime: 5 * 60 * 1000,
  })
}
