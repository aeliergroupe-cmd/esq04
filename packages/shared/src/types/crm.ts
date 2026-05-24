export type ContactStage = 'LEAD' | 'PROSPECT' | 'ACTIVE' | 'DORMANT' | 'CHURNED'
export type OpportunityStage =
  | 'DISCOVERY'
  | 'SAMPLING'
  | 'QUOTATION'
  | 'NEGOTIATION'
  | 'PRODUCTION'
  | 'SHIPMENT'
  | 'COMPLETED'
  | 'LOST'

export const OPPORTUNITY_STAGES: Record<OpportunityStage, { label: string; color: string; probability: number }> = {
  DISCOVERY: { label: 'Discovery', color: '#94A3B8', probability: 10 },
  SAMPLING: { label: 'Sampling', color: '#60A5FA', probability: 25 },
  QUOTATION: { label: 'Quotation', color: '#A78BFA', probability: 40 },
  NEGOTIATION: { label: 'Negotiation', color: '#F59E0B', probability: 60 },
  PRODUCTION: { label: 'Production', color: '#F97316', probability: 80 },
  SHIPMENT: { label: 'Shipment', color: '#10B981', probability: 90 },
  COMPLETED: { label: 'Completed', color: '#22C55E', probability: 100 },
  LOST: { label: 'Lost', color: '#EF4444', probability: 0 },
}

export type ActivityType = 'NOTE' | 'CALL' | 'EMAIL' | 'MEETING' | 'TASK' | 'SYSTEM'
