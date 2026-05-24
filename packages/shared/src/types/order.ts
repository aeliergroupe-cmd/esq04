export type OrderStatus =
  | 'DRAFT'
  | 'CONFIRMED'
  | 'SAMPLING'
  | 'PRODUCTION'
  | 'QC'
  | 'PACKING'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED'

export type Incoterm = 'FOB' | 'CIF' | 'EXW' | 'DDP' | 'CPT' | 'CFR' | 'DAP'

export type QuoteStatus = 'DRAFT' | 'SENT' | 'RECEIVED' | 'ACCEPTED' | 'REJECTED' | 'EXPIRED'

export const ORDER_STATUSES: Record<OrderStatus, { label: string; color: string; step: number }> = {
  DRAFT: { label: 'Draft', color: '#94A3B8', step: 0 },
  CONFIRMED: { label: 'Confirmed', color: '#60A5FA', step: 1 },
  SAMPLING: { label: 'Sampling', color: '#A78BFA', step: 2 },
  PRODUCTION: { label: 'Production', color: '#F59E0B', step: 3 },
  QC: { label: 'Quality Check', color: '#F97316', step: 4 },
  PACKING: { label: 'Packing', color: '#06B6D4', step: 5 },
  SHIPPED: { label: 'Shipped', color: '#3B82F6', step: 6 },
  DELIVERED: { label: 'Delivered', color: '#22C55E', step: 7 },
  CANCELLED: { label: 'Cancelled', color: '#EF4444', step: -1 },
}

export const INCOTERMS: Record<Incoterm, string> = {
  FOB: 'FOB — Free On Board',
  CIF: 'CIF — Cost, Insurance & Freight',
  EXW: 'EXW — Ex Works',
  DDP: 'DDP — Delivered Duty Paid',
  CPT: 'CPT — Carriage Paid To',
  CFR: 'CFR — Cost & Freight',
  DAP: 'DAP — Delivered At Place',
}
