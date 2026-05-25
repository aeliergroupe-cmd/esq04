import { Header } from '@/components/layout/Header'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { mockFabrics } from '@/lib/mock-data'
import { formatCurrency, COUNTRY_FLAGS } from '@/lib/utils'
import { ArrowLeft, Leaf } from 'lucide-react'

export default function FabricDetailPage({ params }: { params: { id: string } }) {
  const fabric = mockFabrics.find((f) => f.id === params.id)
  if (!fabric) notFound()

  const flag = COUNTRY_FLAGS[fabric.supplierCountry] || '🌐'

  return (
    <div className="flex flex-col h-full">
      <Header title={fabric.name} subtitle={`${fabric.sku} · ${fabric.supplierName}`} />
      <div className="flex-1 overflow-y-auto">
        <div className="platform-container py-6">
          <Link href="/fabrics" className="flex items-center gap-2 text-sm text-muted hover:text-espresso mb-6 transition-colors">
            <ArrowLeft size={14} />
            Back to catalog
          </Link>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2 space-y-6">
              <div className="card-luxury overflow-hidden">
                <div className="relative h-64">
                  <Image
                    src={fabric.images[0]}
                    alt={fabric.name}
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h1 className="text-heading font-medium text-espresso">{fabric.name}</h1>
                      <p className="text-sm text-muted mt-0.5">{flag} {fabric.supplierName} · SKU: {fabric.sku}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-semibold text-espresso">
                        {formatCurrency(fabric.pricePerMeter, fabric.currency)}/m
                      </p>
                      {fabric.moqMeters && (
                        <p className="text-xs text-muted mt-0.5">MOQ: {fabric.moqMeters}m</p>
                      )}
                    </div>
                  </div>

                  {fabric.description && (
                    <p className="text-sm text-muted leading-relaxed mb-4">{fabric.description}</p>
                  )}

                  {/* Fiber composition */}
                  <div className="mb-4">
                    <p className="text-xs text-muted uppercase tracking-wider mb-2">Fiber Composition</p>
                    <div className="flex flex-wrap gap-2">
                      {(fabric.fiberContent as Array<{ fiber: string; percentage: number }>).map((fc) => (
                        <span key={fc.fiber} className="badge badge-gold">
                          {fc.percentage}% {fc.fiber}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Specs grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-ivory rounded-xl">
                    {[
                      { label: 'Weight', value: fabric.weightGsm ? `${fabric.weightGsm} gsm` : '—' },
                      { label: 'Width', value: fabric.widthCm ? `${fabric.widthCm} cm` : '—' },
                      { label: 'Weave', value: fabric.weaveType || '—' },
                      { label: 'Finish', value: fabric.finish || '—' },
                      { label: 'Stretch', value: fabric.stretch ? 'Yes' : 'No' },
                      { label: 'Lead Time', value: fabric.leadTimeDays ? `${fabric.leadTimeDays} days` : '—' },
                      { label: 'Stock', value: fabric.stockMeters ? `${fabric.stockMeters}m` : '—' },
                      { label: 'MOQ', value: fabric.moqMeters ? `${fabric.moqMeters}m` : '—' },
                    ].map(({ label, value }) => (
                      <div key={label}>
                        <p className="text-[10px] text-muted uppercase tracking-wider mb-0.5">{label}</p>
                        <p className="text-sm font-medium text-espresso">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {/* Sustainability */}
              <div className="card-luxury p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Leaf size={14} className="text-emerald-600" />
                  <h3 className="font-medium text-espresso">Sustainability</h3>
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl font-semibold text-espresso">{fabric.sustainabilityScore}</span>
                  <div>
                    <p className="text-xs font-medium text-espresso">Score</p>
                    <p className="text-[10px] text-muted">out of 100</p>
                  </div>
                </div>
                <div className="h-2 bg-black/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full"
                    style={{ width: `${fabric.sustainabilityScore}%` }}
                  />
                </div>
              </div>

              {/* Certifications */}
              <div className="card-luxury p-5">
                <h3 className="font-medium text-espresso mb-3">Certifications</h3>
                <div className="flex flex-wrap gap-2">
                  {fabric.certifications.map((cert) => (
                    <span key={cert} className="badge badge-green text-xs">{cert}</span>
                  ))}
                </div>
              </div>

              {/* Seasonality */}
              <div className="card-luxury p-5">
                <h3 className="font-medium text-espresso mb-3">Seasonality</h3>
                <div className="flex flex-wrap gap-2">
                  {fabric.seasonality.map((s) => (
                    <span key={s} className="badge badge-slate">{s}</span>
                  ))}
                </div>
              </div>

              {/* Request quote CTA */}
              <button className="btn-primary w-full justify-center">
                Request Quote
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
