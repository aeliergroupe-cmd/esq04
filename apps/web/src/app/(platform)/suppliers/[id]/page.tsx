import { Header } from '@/components/layout/Header'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { mockSuppliers, mockFabrics } from '@/lib/mock-data'
import { COUNTRY_FLAGS } from '@/lib/utils'
import { MapPin, Globe, Mail, Phone, Award, Star, ArrowLeft } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function SupplierDetailPage({ params }: { params: { id: string } }) {
  const supplier = mockSuppliers.find((s) => s.id === params.id)
  if (!supplier) notFound()

  const supplierFabrics = mockFabrics.filter((f) => f.supplierId === supplier.id)
  const flag = COUNTRY_FLAGS[supplier.country] || '🌐'

  return (
    <div className="flex flex-col h-full">
      <Header title={supplier.name} subtitle={`${supplier.city}, ${supplier.country}`} />
      <div className="flex-1 overflow-y-auto">
        <div className="platform-container py-6">
          {/* Back */}
          <Link href="/suppliers" className="flex items-center gap-2 text-sm text-muted hover:text-espresso mb-6 transition-colors">
            <ArrowLeft size={14} />
            Back to suppliers
          </Link>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Main profile card */}
            <div className="xl:col-span-2 space-y-6">
              <div className="card-luxury overflow-hidden">
                <div className="relative h-48">
                  <Image src={supplier.profileImage} alt={supplier.name} fill className="object-cover" sizes="100vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-6">
                    <h1 className="text-2xl font-semibold text-white">{supplier.name}</h1>
                    <p className="text-white/60 text-sm mt-0.5">{flag} {supplier.city}, {supplier.country}</p>
                  </div>
                  {supplier.isVerified && (
                    <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500 text-white text-xs font-medium">
                      <Award size={11} />
                      Verified
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <p className="text-sm text-muted leading-relaxed mb-4">{supplier.description}</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {[
                      { label: 'Type', value: supplier.type },
                      { label: 'Tier', value: supplier.tier.replace('TIER', 'Tier ') },
                      { label: 'MOQ', value: supplier.moqMeters ? `${supplier.moqMeters}m` : '—' },
                      { label: 'Lead Time', value: supplier.leadTimeDays ? `${supplier.leadTimeDays} days` : '—' },
                      { label: 'Rating', value: supplier.rating?.toFixed(1) || '—' },
                      { label: 'Price Range', value: supplier.priceRangeMin ? `${supplier.currency} ${supplier.priceRangeMin}–${supplier.priceRangeMax}/m` : '—' },
                    ].map(({ label, value }) => (
                      <div key={label}>
                        <p className="text-[10px] text-muted uppercase tracking-wider mb-0.5">{label}</p>
                        <p className="text-sm font-medium text-espresso">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Fabrics */}
              {supplierFabrics.length > 0 && (
                <div className="card-luxury p-6">
                  <h2 className="font-medium text-espresso mb-4">Available Fabrics ({supplierFabrics.length})</h2>
                  <div className="space-y-3">
                    {supplierFabrics.map((fabric) => (
                      <Link key={fabric.id} href={`/fabrics/${fabric.id}`}>
                        <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-ivory transition-colors group">
                          <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                            <Image src={fabric.images[0]} alt={fabric.name} fill className="object-cover" sizes="48px" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-espresso group-hover:text-gold transition-colors truncate">{fabric.name}</p>
                            <p className="text-[10px] text-muted">{fabric.sku} · {fabric.weightGsm}gsm</p>
                          </div>
                          <p className="text-sm font-semibold text-espresso flex-shrink-0">
                            {fabric.currency} {fabric.pricePerMeter}/m
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Contact */}
              <div className="card-luxury p-5">
                <h3 className="font-medium text-espresso mb-4">Contact</h3>
                <div className="space-y-3">
                  {supplier.email && (
                    <a href={`mailto:${supplier.email}`} className="flex items-center gap-3 text-sm text-muted hover:text-espresso transition-colors">
                      <Mail size={14} className="text-gold flex-shrink-0" />
                      {supplier.email}
                    </a>
                  )}
                  {supplier.phone && (
                    <div className="flex items-center gap-3 text-sm text-muted">
                      <Phone size={14} className="text-gold flex-shrink-0" />
                      {supplier.phone}
                    </div>
                  )}
                  {supplier.website && (
                    <a href={supplier.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-muted hover:text-espresso transition-colors">
                      <Globe size={14} className="text-gold flex-shrink-0" />
                      Website
                    </a>
                  )}
                  <div className="flex items-center gap-3 text-sm text-muted">
                    <MapPin size={14} className="text-gold flex-shrink-0" />
                    {supplier.city}, {supplier.country}
                  </div>
                </div>
              </div>

              {/* Certifications */}
              <div className="card-luxury p-5">
                <h3 className="font-medium text-espresso mb-4">Certifications</h3>
                <div className="flex flex-wrap gap-2">
                  {supplier.certifications.map((cert) => (
                    <span key={cert} className="badge badge-green text-xs">{cert}</span>
                  ))}
                </div>
              </div>

              {/* Rating breakdown */}
              <div className="card-luxury p-5">
                <h3 className="font-medium text-espresso mb-4">Performance</h3>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl font-semibold text-espresso">{supplier.rating?.toFixed(1)}</span>
                  <div>
                    <div className="flex gap-0.5 mb-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} size={14} className={cn(
                          (supplier.rating || 0) >= star ? 'text-gold fill-gold' : 'text-black/10 fill-black/5'
                        )} />
                      ))}
                    </div>
                    <p className="text-[10px] text-muted">Overall rating</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {['Quality', 'Delivery', 'Communication', 'Pricing'].map((cat, i) => (
                    <div key={cat}>
                      <div className="flex justify-between text-[10px] text-muted mb-1">
                        <span>{cat}</span>
                        <span>{(4.5 + i * 0.1).toFixed(1)}</span>
                      </div>
                      <div className="h-1 bg-black/5 rounded-full overflow-hidden">
                        <div className="h-full bg-gold rounded-full" style={{ width: `${(4.5 + i * 0.1) / 5 * 100}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
