import { Header } from '@/components/layout/Header'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { mockOpportunities, mockSuppliers } from '@/lib/mock-data'
import { formatCurrency, formatDate, COUNTRY_FLAGS } from '@/lib/utils'
import { ArrowLeft, Calendar, DollarSign, TrendingUp, User } from 'lucide-react'
import { PIPELINE_STAGES } from '@/lib/constants'

export default function OpportunityDetailPage({ params }: { params: { id: string } }) {
  const opp = mockOpportunities.find((o) => o.id === params.id)
  if (!opp) notFound()

  const supplier = mockSuppliers.find((s) => s.id === opp.supplierId)
  const flag = COUNTRY_FLAGS[opp.supplierCountry] || '🌐'
  const stage = PIPELINE_STAGES.find((s) => s.id === opp.stage)

  return (
    <div className="flex flex-col h-full">
      <Header title={opp.title} subtitle={`${flag} ${opp.supplierName}`} />
      <div className="flex-1 overflow-y-auto">
        <div className="platform-container py-6">
          <Link href="/crm" className="flex items-center gap-2 text-sm text-muted hover:text-espresso mb-6 transition-colors">
            <ArrowLeft size={14} />
            Back to pipeline
          </Link>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2 space-y-6">
              {/* Main card */}
              <div className="card-luxury p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h1 className="text-heading font-medium text-espresso">{opp.title}</h1>
                    <p className="text-sm text-muted mt-1">{flag} {opp.supplierName} · {opp.supplierCountry}</p>
                  </div>
                  <span
                    className="badge"
                    style={{
                      backgroundColor: `${stage?.color}18`,
                      color: stage?.color,
                      borderColor: `${stage?.color}30`,
                    }}
                  >
                    {stage?.label}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-6 pb-6 border-b border-black/[0.05]">
                  {[
                    { icon: DollarSign, label: 'Deal Value', value: formatCurrency(opp.value, opp.currency) },
                    { icon: TrendingUp, label: 'Probability', value: `${opp.probability}%` },
                    { icon: Calendar, label: 'Expected Close', value: opp.expectedCloseDate ? formatDate(opp.expectedCloseDate) : '—' },
                    { icon: User, label: 'Contact', value: opp.contactName || '—' },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label}>
                      <div className="flex items-center gap-1.5 text-xs text-muted mb-1">
                        <Icon size={12} />
                        {label}
                      </div>
                      <p className="font-semibold text-espresso text-sm">{value}</p>
                    </div>
                  ))}
                </div>

                {opp.notes && (
                  <div>
                    <p className="text-xs text-muted uppercase tracking-wider mb-2">Notes</p>
                    <p className="text-sm text-espresso leading-relaxed">{opp.notes}</p>
                  </div>
                )}

                {opp.tags.length > 0 && (
                  <div className="flex gap-2 flex-wrap mt-4">
                    {opp.tags.map((tag) => (
                      <span key={tag} className="badge badge-gold text-xs">{tag}</span>
                    ))}
                  </div>
                )}
              </div>

              {/* Pipeline stage progress */}
              <div className="card-luxury p-6">
                <h2 className="font-medium text-espresso mb-4">Pipeline Progress</h2>
                <div className="flex gap-2">
                  {PIPELINE_STAGES.map((s) => {
                    const isActive = s.id === opp.stage
                    const isPassed = PIPELINE_STAGES.findIndex((x) => x.id === opp.stage) > PIPELINE_STAGES.findIndex((x) => x.id === s.id)
                    return (
                      <div
                        key={s.id}
                        className="flex-1 h-1.5 rounded-full"
                        style={{
                          backgroundColor: isActive || isPassed ? s.color : '#E5E7EB',
                          opacity: isPassed ? 0.6 : 1,
                        }}
                      />
                    )
                  })}
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-[10px] text-muted">Discovery</span>
                  <span className="text-[10px] text-muted">Completed</span>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              <div className="card-luxury p-5">
                <h3 className="font-medium text-espresso mb-3">Opportunity Info</h3>
                <div className="space-y-3 text-sm">
                  {[
                    { label: 'Created', value: formatDate(opp.createdAt) },
                    { label: 'Stage', value: stage?.label || opp.stage },
                    { label: 'Probability', value: `${opp.probability}%` },
                    { label: 'Currency', value: opp.currency },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between">
                      <span className="text-muted">{label}</span>
                      <span className="font-medium text-espresso">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {supplier && (
                <div className="card-luxury p-5">
                  <h3 className="font-medium text-espresso mb-3">Supplier</h3>
                  <Link href={`/suppliers/${supplier.id}`} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                    <div className="w-9 h-9 rounded-xl bg-gold/10 flex items-center justify-center text-lg">
                      {flag}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-espresso">{supplier.name}</p>
                      <p className="text-xs text-muted">{supplier.city}, {supplier.country}</p>
                    </div>
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
