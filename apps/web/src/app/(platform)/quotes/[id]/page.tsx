import { Header } from '@/components/layout/Header'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { formatCurrency, formatDate, COUNTRY_FLAGS } from '@/lib/utils'
import { ArrowLeft, FileText, CheckCircle, XCircle, Send, Clock, AlertCircle, Calendar, Package } from 'lucide-react'

const MOCK_QUOTES = [
  {
    id: 'quo_01',
    referenceNo: 'RFQ-2025-0089',
    title: 'FW25 Suiting Fabrics — Lot 1',
    supplierName: 'Vitale Barberis Canonico',
    supplierCountry: 'Italy',
    supplierEmail: 'orders@vitalebarberiscanonico.it',
    status: 'RECEIVED',
    totalValue: 156000,
    currency: 'EUR',
    validUntil: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    notes: 'Please review attached swatch samples before confirming. Lead time starts from deposit receipt.',
    items: [
      { id: 'qi_01', description: 'Superfine Merino 180s — Charcoal Melange', quantity: 500, unit: 'meters', unitPrice: 82, totalPrice: 41000 },
      { id: 'qi_02', description: 'Cashmere-Wool Blend 16.5µ — Navy', quantity: 350, unit: 'meters', unitPrice: 145, totalPrice: 50750 },
      { id: 'qi_03', description: 'Worsted Twill — Midnight Blue', quantity: 280, unit: 'meters', unitPrice: 98, totalPrice: 27440 },
      { id: 'qi_04', description: 'Herringbone Flannel — Burgundy', quantity: 220, unit: 'meters', unitPrice: 167, totalPrice: 36740 },
    ],
  },
  {
    id: 'quo_02',
    referenceNo: 'RFQ-2025-0085',
    title: 'Como Silk Jacquard SS25',
    supplierName: 'Milan Collection Srl',
    supplierCountry: 'Italy',
    supplierEmail: 'export@milancollection.it',
    status: 'ACCEPTED',
    totalValue: 87000,
    currency: 'EUR',
    validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    notes: 'Order confirmed. Awaiting purchase order issuance.',
    items: [
      { id: 'qi_05', description: 'Silk Jacquard Floral — Ivory', quantity: 300, unit: 'meters', unitPrice: 185, totalPrice: 55500 },
      { id: 'qi_06', description: 'Silk Crepe de Chine — Champagne', quantity: 150, unit: 'meters', unitPrice: 145, totalPrice: 21750 },
      { id: 'qi_07', description: 'Silk Organza — Ecru', quantity: 60, unit: 'meters', unitPrice: 162.5, totalPrice: 9750 },
    ],
  },
  {
    id: 'quo_03',
    referenceNo: 'RFQ-2025-0078',
    title: 'Baby Alpaca Resort Collection',
    supplierName: 'Incatops SA',
    supplierCountry: 'Peru',
    supplierEmail: 'export@incatops.com.pe',
    status: 'SENT',
    totalValue: undefined,
    currency: 'USD',
    validUntil: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    notes: 'Awaiting supplier pricing. Requested urgently for SS26 development.',
    items: [
      { id: 'qi_08', description: 'Royal Baby Alpaca Jersey 12GG — Natural White', quantity: 400, unit: 'meters', unitPrice: undefined, totalPrice: undefined },
      { id: 'qi_09', description: 'Baby Alpaca-Silk Blend — Camel', quantity: 250, unit: 'meters', unitPrice: undefined, totalPrice: undefined },
    ],
  },
  {
    id: 'quo_04',
    referenceNo: 'RFQ-2025-0071',
    title: 'Yorkshire Worsted Tweed FW25',
    supplierName: 'GB Textiles Ltd',
    supplierCountry: 'UK',
    supplierEmail: 'sales@gbtextiles.co.uk',
    status: 'DRAFT',
    totalValue: undefined,
    currency: 'GBP',
    validUntil: undefined,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    notes: 'Draft in progress. Pending fabric selection confirmation from design team.',
    items: [
      { id: 'qi_10', description: 'Yorkshire Worsted Tweed — Classic Check', quantity: 200, unit: 'meters', unitPrice: undefined, totalPrice: undefined },
      { id: 'qi_11', description: 'Shetland Tweed — Herringbone Grey', quantity: 150, unit: 'meters', unitPrice: undefined, totalPrice: undefined },
    ],
  },
  {
    id: 'quo_05',
    referenceNo: 'RFQ-2025-0060',
    title: 'Egyptian Cotton Shirting Core Program',
    supplierName: 'Albaz Fabric House',
    supplierCountry: 'Turkey',
    supplierEmail: 'b2b@albazfabric.com',
    status: 'EXPIRED',
    totalValue: 18000,
    currency: 'USD',
    validUntil: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
    notes: 'Quote expired. Consider re-quoting for SS26 program.',
    items: [
      { id: 'qi_12', description: 'Egyptian Giza 87 Poplin 140s — White', quantity: 600, unit: 'meters', unitPrice: 18, totalPrice: 10800 },
      { id: 'qi_13', description: 'Egyptian Cotton Oxford — Light Blue', quantity: 400, unit: 'meters', unitPrice: 18, totalPrice: 7200 },
    ],
  },
]

const STATUS_CONFIG: Record<string, { label: string; icon: React.ElementType; badge: string; color: string }> = {
  DRAFT: { label: 'Draft', icon: FileText, badge: 'badge-slate', color: '#94A3B8' },
  SENT: { label: 'Sent', icon: Send, badge: 'badge-blue', color: '#3B82F6' },
  RECEIVED: { label: 'Received', icon: Clock, badge: 'badge-amber', color: '#F59E0B' },
  ACCEPTED: { label: 'Accepted', icon: CheckCircle, badge: 'badge-green', color: '#22C55E' },
  REJECTED: { label: 'Rejected', icon: XCircle, badge: 'badge-red', color: '#EF4444' },
  EXPIRED: { label: 'Expired', icon: AlertCircle, badge: 'badge-slate', color: '#9CA3AF' },
}

export default function QuoteDetailPage({ params }: { params: { id: string } }) {
  const quote = MOCK_QUOTES.find((q) => q.id === params.id)
  if (!quote) notFound()

  const config = STATUS_CONFIG[quote.status] ?? STATUS_CONFIG['DRAFT']
  const Icon = config.icon
  const flag = COUNTRY_FLAGS[quote.supplierCountry] ?? '🌐'

  return (
    <div className="flex flex-col h-full">
      <Header title={quote.referenceNo} subtitle={quote.title} />
      <div className="flex-1 overflow-y-auto">
        <div className="platform-container py-6">
          <Link
            href="/quotes"
            className="flex items-center gap-2 text-sm text-muted hover:text-espresso mb-6 transition-colors"
          >
            <ArrowLeft size={14} />
            Back to quotes
          </Link>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Main column */}
            <div className="xl:col-span-2 space-y-6">
              {/* Header card */}
              <div className="card-luxury p-6">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${config.color}18` }}
                    >
                      <Icon size={22} style={{ color: config.color }} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-xs text-muted">{quote.referenceNo}</span>
                        <span className={`badge text-[10px] ${config.badge}`}>{config.label}</span>
                      </div>
                      <h1 className="font-editorial text-2xl text-espresso">{quote.title}</h1>
                      <p className="text-sm text-muted mt-1">
                        {flag} {quote.supplierName}
                      </p>
                    </div>
                  </div>
                  {quote.totalValue && (
                    <div className="text-right flex-shrink-0">
                      <p className="text-2xl font-semibold text-espresso">
                        {formatCurrency(quote.totalValue, quote.currency)}
                      </p>
                      <p className="text-xs text-muted">{quote.currency} · {quote.items.length} line items</p>
                    </div>
                  )}
                </div>

                {quote.notes && (
                  <div className="bg-ivory rounded-xl p-4 border border-black/[0.05]">
                    <p className="text-sm text-muted leading-relaxed">{quote.notes}</p>
                  </div>
                )}
              </div>

              {/* Line items */}
              <div className="card-luxury overflow-hidden">
                <div className="px-6 py-4 border-b border-black/[0.06]">
                  <h2 className="font-semibold text-espresso text-sm">Line Items</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-ivory/60">
                      <tr>
                        <th className="text-left text-[11px] font-medium text-muted px-6 py-3">Description</th>
                        <th className="text-right text-[11px] font-medium text-muted px-4 py-3">Qty</th>
                        <th className="text-right text-[11px] font-medium text-muted px-4 py-3">Unit</th>
                        <th className="text-right text-[11px] font-medium text-muted px-4 py-3">Unit Price</th>
                        <th className="text-right text-[11px] font-medium text-muted px-6 py-3">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-black/[0.04]">
                      {quote.items.map((item) => (
                        <tr key={item.id} className="hover:bg-ivory/30 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-start gap-2">
                              <Package size={13} className="text-muted mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-espresso">{item.description}</span>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-right text-sm text-espresso">
                            {item.quantity.toLocaleString()}
                          </td>
                          <td className="px-4 py-4 text-right text-xs text-muted">{item.unit}</td>
                          <td className="px-4 py-4 text-right text-sm text-espresso">
                            {item.unitPrice
                              ? formatCurrency(item.unitPrice, quote.currency)
                              : <span className="text-muted">TBD</span>}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <span className="text-sm font-medium text-espresso">
                              {item.totalPrice
                                ? formatCurrency(item.totalPrice, quote.currency, true)
                                : <span className="text-muted">—</span>}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    {quote.totalValue && (
                      <tfoot className="border-t border-black/[0.08] bg-ivory/40">
                        <tr>
                          <td colSpan={4} className="px-6 py-4 text-sm font-semibold text-espresso text-right">
                            Total
                          </td>
                          <td className="px-6 py-4 text-right text-sm font-bold text-espresso">
                            {formatCurrency(quote.totalValue, quote.currency)}
                          </td>
                        </tr>
                      </tfoot>
                    )}
                  </table>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Supplier */}
              <div className="card-luxury p-5">
                <h3 className="font-semibold text-espresso text-sm mb-4">Supplier</h3>
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{flag}</span>
                    <div>
                      <p className="text-sm font-medium text-espresso">{quote.supplierName}</p>
                      <p className="text-xs text-muted">{quote.supplierCountry}</p>
                    </div>
                  </div>
                  <a
                    href={`mailto:${quote.supplierEmail}`}
                    className="block text-xs text-gold hover:underline truncate"
                  >
                    {quote.supplierEmail}
                  </a>
                </div>
              </div>

              {/* Dates */}
              <div className="card-luxury p-5">
                <h3 className="font-semibold text-espresso text-sm mb-4">Dates</h3>
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-muted flex items-center gap-1.5">
                      <Calendar size={11} /> Created
                    </span>
                    <span className="text-espresso font-medium">{formatDate(quote.createdAt, 'MMM d, yyyy')}</span>
                  </div>
                  {quote.validUntil && (
                    <div className="flex justify-between items-center">
                      <span className="text-muted flex items-center gap-1.5">
                        <Calendar size={11} /> Valid Until
                      </span>
                      <span className="text-espresso font-medium">{formatDate(quote.validUntil, 'MMM d, yyyy')}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="card-luxury p-5 space-y-2">
                <h3 className="font-semibold text-espresso text-sm mb-4">Actions</h3>
                {quote.status === 'RECEIVED' && (
                  <>
                    <button className="btn-primary w-full text-xs py-2.5">
                      <CheckCircle size={13} />
                      Accept Quote
                    </button>
                    <button className="btn-secondary w-full text-xs py-2.5">
                      <XCircle size={13} />
                      Reject Quote
                    </button>
                  </>
                )}
                {quote.status === 'DRAFT' && (
                  <button className="btn-primary w-full text-xs py-2.5">
                    <Send size={13} />
                    Send RFQ
                  </button>
                )}
                {quote.status === 'ACCEPTED' && (
                  <button className="btn-primary w-full text-xs py-2.5">
                    Convert to Order
                  </button>
                )}
                {quote.status === 'EXPIRED' && (
                  <button className="btn-secondary w-full text-xs py-2.5">
                    Re-quote
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
