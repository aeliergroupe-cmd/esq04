export type WeaveType = 'PLAIN' | 'TWILL' | 'SATIN' | 'JERSEY' | 'DOBBY' | 'JACQUARD' | 'FLEECE' | 'RIB'

export const WEAVE_TYPES: Record<WeaveType, string> = {
  PLAIN: 'Plain Weave',
  TWILL: 'Twill',
  SATIN: 'Satin',
  JERSEY: 'Jersey',
  DOBBY: 'Dobby',
  JACQUARD: 'Jacquard',
  FLEECE: 'Fleece',
  RIB: 'Rib',
}

export const FIBER_TYPES = [
  'Wool', 'Cashmere', 'Silk', 'Cotton', 'Linen', 'Mohair',
  'Alpaca', 'Vicuña', 'Camel', 'Merino', 'Polyester', 'Nylon',
  'Viscose', 'Tencel', 'Modal', 'Bamboo',
]

export const CERTIFICATIONS = [
  'GOTS', 'OEKO-TEX Standard 100', 'bluesign', 'GRS',
  'Cradle to Cradle', 'ISO 9001', 'ISO 14001',
  'Woolmark', 'REACH', 'Fair Trade', 'B Corp',
]

export const SEASONALITY_OPTIONS = ['SS', 'FW', 'Resort', 'All Season']

export interface FabricFilters {
  supplierId?: string
  fibers?: string[]
  minWeight?: number
  maxWeight?: number
  minPrice?: number
  maxPrice?: number
  certifications?: string[]
  seasonality?: string[]
  search?: string
  inStock?: boolean
}
