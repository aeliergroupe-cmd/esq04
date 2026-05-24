export type ShipmentStatus =
  | 'BOOKING'
  | 'PICKUP'
  | 'TRANSIT'
  | 'CUSTOMS'
  | 'DELIVERY'
  | 'DELIVERED'
  | 'DELAYED'
  | 'CANCELLED'

export const SHIPMENT_STATUSES: Record<ShipmentStatus, { label: string; color: string; step: number }> = {
  BOOKING: { label: 'Booking Confirmed', color: '#94A3B8', step: 0 },
  PICKUP: { label: 'Picked Up', color: '#60A5FA', step: 1 },
  TRANSIT: { label: 'In Transit', color: '#A78BFA', step: 2 },
  CUSTOMS: { label: 'Customs Clearance', color: '#F59E0B', step: 3 },
  DELIVERY: { label: 'Out for Delivery', color: '#F97316', step: 4 },
  DELIVERED: { label: 'Delivered', color: '#22C55E', step: 5 },
  DELAYED: { label: 'Delayed', color: '#EF4444', step: -1 },
  CANCELLED: { label: 'Cancelled', color: '#6B7280', step: -1 },
}

export const CARRIERS = [
  'Maersk', 'MSC', 'CMA CGM', 'Evergreen', 'Hapag-Lloyd',
  'COSCO', 'Yang Ming', 'ONE', 'DHL', 'FedEx', 'UPS', 'Flexport',
]
