import { Header } from '@/components/layout/Header'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { mockShipments } from '@/lib/mock-data'
import { formatDate, COUNTRY_FLAGS } from '@/lib/utils'
import {
  ArrowLeft,
  ArrowRight,
  Ship,
  Package,
  CheckCircle,
  Clock,
  MapPin,
  Calendar,
  Weight,
  Layers,
} from 'lucide-react'

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  BOOKING: { label: 'Booking Confirmed', color: '#94A3B8', bg: 'bg-slate-100 text-slate-600' },
  PICKUP: { label: 'Picked Up', color: '#A78BFA', bg: 'bg-violet-50 text-violet-600' },
  TRANSIT: { label: 'In Transit', color: '#3B82F6', bg: 'bg-blue-50 text-blue-600' },
  CUSTOMS: { label: 'Customs Clearance', color: '#F59E0B', bg: 'bg-amber-50 text-amber-600' },
  DELIVERY: { label: 'Out for Delivery', color: '#F97316', bg: 'bg-orange-50 text-orange-600' },
  DELIVERED: { label: 'Delivered', color: '#22C55E', bg: 'bg-emerald-50 text-emerald-600' },
  DELAYED: { label: 'Delayed', color: '#EF4444', bg: 'bg-red-50 text-red-600' },
}

const PROGRESS_STEPS = ['BOOKING', 'PICKUP', 'TRANSIT', 'CUSTOMS', 'DELIVERY', 'DELIVERED']

const STEP_ICONS: Record<string, React.ElementType> = {
  BOOKING: CheckCircle,
  PICKUP: Package,
  TRANSIT: Ship,
  CUSTOMS: Layers,
  DELIVERY: MapPin,
  DELIVERED: CheckCircle,
}

export default function ShipmentDetailPage({ params }: { params: { id: string } }) {
  const shipment = mockShipments.find((s) => s.id === params.id)
  if (!shipment) notFound()

  const config = STATUS_CONFIG[shipment.status] ?? STATUS_CONFIG['TRANSIT']
  const currentStep = PROGRESS_STEPS.indexOf(shipment.status)
  const originFlag = COUNTRY_FLAGS[shipment.originCountry ?? ''] ?? '🌐'
  const destFlag = COUNTRY_FLAGS[shipment.destCountry ?? ''] ?? '🌐'
  const events = (shipment.events ?? []) as Array<{ date: string; location: string; status: string }>

  return (
    <div className="flex flex-col h-full">
      <Header
        title={shipment.reference}
        subtitle={`${shipment.carrier} · ${shipment.trackingNumber ?? ''}`}
      />
      <div className="flex-1 overflow-y-auto">
        <div className="platform-container py-6">
          <Link
            href="/shipments"
            className="flex items-center gap-2 text-sm text-muted hover:text-espresso mb-6 transition-colors"
          >
            <ArrowLeft size={14} />
            Back to shipments
          </Link>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Main column */}
            <div className="xl:col-span-2 space-y-6">
              {/* Route card */}
              <div className="card-luxury p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-editorial text-xl text-espresso">Shipment Route</h2>
                  <span className={`badge text-xs ${config.bg}`}>{config.label}</span>
                </div>

                {/* Route visual */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl mb-1">{originFlag}</div>
                    <p className="font-semibold text-espresso text-sm">{shipment.originPort}</p>
                    <p className="text-xs text-muted">{shipment.originCountry}</p>
                    {shipment.etd && (
                      <p className="text-[11px] text-muted mt-1">
                        ETD: {formatDate(shipment.etd, 'MMM d')}
                      </p>
                    )}
                  </div>

                  <div className="flex-1 relative flex items-center">
                    <div className="w-full h-px bg-gradient-to-r from-muted/30 via-gold/40 to-muted/30" />
                    <div
                      className="absolute left-0 h-1.5 rounded-full transition-all"
                      style={{
                        width: `${Math.min(100, ((currentStep + 1) / PROGRESS_STEPS.length) * 100)}%`,
                        backgroundColor: config.color,
                        opacity: 0.6,
                      }}
                    />
                    <Ship
                      size={18}
                      className="absolute"
                      style={{
                        left: `${Math.min(90, ((currentStep + 0.5) / PROGRESS_STEPS.length) * 100)}%`,
                        color: config.color,
                      }}
                    />
                  </div>

                  <div className="text-center">
                    <div className="text-2xl mb-1">{destFlag}</div>
                    <p className="font-semibold text-espresso text-sm">{shipment.destPort}</p>
                    <p className="text-xs text-muted">{shipment.destCountry}</p>
                    {shipment.eta && (
                      <p className="text-[11px] text-muted mt-1">
                        ETA: {formatDate(shipment.eta, 'MMM d')}
                      </p>
                    )}
                  </div>
                </div>

                {/* Progress steps */}
                <div className="flex items-start gap-1">
                  {PROGRESS_STEPS.map((step, idx) => {
                    const StepIcon = STEP_ICONS[step] ?? CheckCircle
                    const isCompleted = idx < currentStep || shipment.status === 'DELIVERED'
                    const isActive = step === shipment.status
                    return (
                      <div key={step} className="flex-1 flex flex-col items-center gap-1.5">
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center border-2 transition-all"
                          style={{
                            borderColor: isCompleted || isActive ? config.color : '#E5E7EB',
                            backgroundColor: isCompleted || isActive ? `${config.color}18` : 'white',
                          }}
                        >
                          <StepIcon
                            size={12}
                            style={{ color: isCompleted || isActive ? config.color : '#D1D5DB' }}
                          />
                        </div>
                        <div
                          className="h-1 w-full rounded-full"
                          style={{
                            backgroundColor: isCompleted ? config.color : '#F3F4F6',
                          }}
                        />
                        <span
                          className="text-[9px] text-center leading-tight"
                          style={{ color: isActive ? '#1E1B18' : '#9CA3AF' }}
                        >
                          {step === 'TRANSIT' ? 'Transit' :
                           step === 'CUSTOMS' ? 'Customs' :
                           step === 'DELIVERY' ? 'Delivery' :
                           step.charAt(0) + step.slice(1).toLowerCase()}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Event timeline */}
              <div className="card-luxury p-6">
                <h2 className="font-editorial text-xl text-espresso mb-5">Tracking Events</h2>
                <div className="space-y-0">
                  {events.length === 0 ? (
                    <p className="text-sm text-muted">No tracking events yet.</p>
                  ) : (
                    [...events].reverse().map((event, idx) => (
                      <div key={idx} className="flex gap-4 pb-5 last:pb-0">
                        <div className="flex flex-col items-center">
                          <div
                            className="w-2.5 h-2.5 rounded-full flex-shrink-0 mt-1"
                            style={{ backgroundColor: idx === 0 ? config.color : '#D1D5DB' }}
                          />
                          {idx < events.length - 1 && (
                            <div className="w-px flex-1 bg-black/[0.06] mt-1" />
                          )}
                        </div>
                        <div className="flex-1 pb-0">
                          <p className="text-sm font-medium text-espresso">{event.status}</p>
                          <div className="flex items-center gap-3 mt-0.5">
                            <span className="text-xs text-muted flex items-center gap-1">
                              <MapPin size={10} />
                              {event.location}
                            </span>
                            <span className="text-xs text-muted flex items-center gap-1">
                              <Calendar size={10} />
                              {formatDate(event.date, 'MMM d, HH:mm')}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Cargo details */}
              <div className="card-luxury p-5">
                <h3 className="font-semibold text-espresso text-sm mb-4">Cargo Details</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted flex items-center gap-1.5">
                      <Weight size={12} /> Gross Weight
                    </span>
                    <span className="text-sm font-medium text-espresso">
                      {shipment.grossWeightKg?.toLocaleString()} kg
                    </span>
                  </div>
                  {shipment.cbm && (
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted flex items-center gap-1.5">
                        <Layers size={12} /> Volume
                      </span>
                      <span className="text-sm font-medium text-espresso">{shipment.cbm} CBM</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted">Incoterm</span>
                    <span className="badge badge-blue text-xs">{shipment.incoterm}</span>
                  </div>
                </div>
              </div>

              {/* Containers */}
              {shipment.containers && shipment.containers.length > 0 && (
                <div className="card-luxury p-5">
                  <h3 className="font-semibold text-espresso text-sm mb-4">Containers</h3>
                  <div className="space-y-2">
                    {shipment.containers.map((c) => (
                      <div key={c} className="flex items-center gap-2">
                        <Package size={13} className="text-muted" />
                        <span className="font-mono text-xs text-espresso">{c}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Dates */}
              <div className="card-luxury p-5">
                <h3 className="font-semibold text-espresso text-sm mb-4">Key Dates</h3>
                <div className="space-y-3 text-xs">
                  {shipment.etd && (
                    <div className="flex justify-between">
                      <span className="text-muted">Est. Departure</span>
                      <span className="text-espresso font-medium">{formatDate(shipment.etd, 'MMM d, yyyy')}</span>
                    </div>
                  )}
                  {shipment.atd && (
                    <div className="flex justify-between">
                      <span className="text-muted">Act. Departure</span>
                      <span className="text-espresso font-medium">{formatDate(shipment.atd, 'MMM d, yyyy')}</span>
                    </div>
                  )}
                  {shipment.eta && (
                    <div className="flex justify-between">
                      <span className="text-muted">Est. Arrival</span>
                      <span className="text-espresso font-medium">{formatDate(shipment.eta, 'MMM d, yyyy')}</span>
                    </div>
                  )}
                  {shipment.ata && (
                    <div className="flex justify-between">
                      <span className="text-muted">Act. Arrival</span>
                      <span className="text-espresso font-medium">{formatDate(shipment.ata, 'MMM d, yyyy')}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Linked order */}
              {shipment.orderNo && (
                <div className="card-luxury p-5">
                  <h3 className="font-semibold text-espresso text-sm mb-3">Linked Order</h3>
                  <Link
                    href={`/orders/${shipment.orderId}`}
                    className="flex items-center justify-between text-sm text-gold hover:underline"
                  >
                    <span className="font-mono">{shipment.orderNo}</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
