export type SupplierType = 'MILL' | 'FACTORY' | 'TRADER' | 'AGENT' | 'DISTRIBUTOR'
export type SupplierTier = 'TIER1' | 'TIER2' | 'TIER3'

export const SUPPLIER_TYPES: Record<SupplierType, string> = {
  MILL: 'Textile Mill',
  FACTORY: 'Garment Factory',
  TRADER: 'Fabric Trader',
  AGENT: 'Sourcing Agent',
  DISTRIBUTOR: 'Distributor',
}

export const SUPPLIER_TIERS: Record<SupplierTier, string> = {
  TIER1: 'Tier 1 — Strategic',
  TIER2: 'Tier 2 — Preferred',
  TIER3: 'Tier 3 — Standard',
}

export interface SupplierFilters {
  country?: string
  type?: SupplierType
  tier?: SupplierTier
  certifications?: string[]
  minMoq?: number
  maxMoq?: number
  search?: string
}
