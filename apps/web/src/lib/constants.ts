export const PIPELINE_STAGES = [
  { id: 'DISCOVERY', label: 'Discovery', color: '#94A3B8', bgColor: 'bg-slate-100', textColor: 'text-slate-600' },
  { id: 'SAMPLING', label: 'Sampling', color: '#60A5FA', bgColor: 'bg-blue-50', textColor: 'text-blue-600' },
  { id: 'QUOTATION', label: 'Quotation', color: '#A78BFA', bgColor: 'bg-violet-50', textColor: 'text-violet-600' },
  { id: 'NEGOTIATION', label: 'Negotiation', color: '#F59E0B', bgColor: 'bg-amber-50', textColor: 'text-amber-600' },
  { id: 'PRODUCTION', label: 'Production', color: '#F97316', bgColor: 'bg-orange-50', textColor: 'text-orange-600' },
  { id: 'SHIPMENT', label: 'Shipment', color: '#10B981', bgColor: 'bg-emerald-50', textColor: 'text-emerald-600' },
  { id: 'COMPLETED', label: 'Completed', color: '#22C55E', bgColor: 'bg-green-50', textColor: 'text-green-600' },
] as const

export const ORDER_STAGES = [
  { id: 'DRAFT', label: 'Draft', icon: 'FileText' },
  { id: 'CONFIRMED', label: 'Confirmed', icon: 'CheckCircle' },
  { id: 'SAMPLING', label: 'Sampling', icon: 'Scissors' },
  { id: 'PRODUCTION', label: 'Production', icon: 'Factory' },
  { id: 'QC', label: 'Quality Check', icon: 'ShieldCheck' },
  { id: 'PACKING', label: 'Packing', icon: 'Package' },
  { id: 'SHIPPED', label: 'Shipped', icon: 'Ship' },
  { id: 'DELIVERED', label: 'Delivered', icon: 'PackageCheck' },
] as const

export const NAVIGATION = [
  { href: '/dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
  { href: '/crm', label: 'CRM Pipeline', icon: 'Kanban' },
  { href: '/suppliers', label: 'Suppliers', icon: 'Building2' },
  { href: '/fabrics', label: 'Fabrics', icon: 'Layers' },
  { href: '/quotes', label: 'Quotes', icon: 'FileText' },
  { href: '/orders', label: 'Orders', icon: 'ShoppingBag' },
  { href: '/shipments', label: 'Shipments', icon: 'Ship' },
  { href: '/analytics', label: 'Analytics', icon: 'BarChart3' },
  { href: '/ai-sourcing', label: 'AI Sourcing', icon: 'Sparkles' },
] as const
