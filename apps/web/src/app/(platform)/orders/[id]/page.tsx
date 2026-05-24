import { Header } from '@/components/layout/Header'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { mockOrders } from '@/lib/mock-data'
import { formatCurrency, formatDate, COUNTRY_FLAGS } from '@/lib/utils'
import { ArrowLeft, CheckCircle, Circle } from 'lucide-react'

const ORDER_STAGES = [
  { id: 'DRAFT', label: 'Draft' },
  { id: 'CONFIRMED', label: 'Confirmed' },
  { id: 'SAMPLING', label: 'Sampling' },
  { id: 'PRODUCTION', label: 'Production' },
  { id: 'QC', label: 'Quality Check' },
  { id: 'PACKING', label: 'Packing' },
  { id: 'SHIPPED', label: 'Shipped' },
  { id: 'DELIVERED', label: 'Delivered' },
]

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const order = mockOrders.find((o) => o.id === params.id)
  if (!order) notFound()

  const currentStageIdx = ORDER_STAGES.findIndex((s) => s.id === order.status)
  const flag = COUNTRY_FLAGS[order.supplierCountry] || '🌐'

  return (
    <div className="flex flex-col h-full">
      <Header title={order.orderNo} subtitle={order.title} />
      <div className="flex-1 overflow-y-auto">
        <div className="platform-container py-6">
          <Link href="/orders" className="flex items-center gap-2 text-sm text-muted hover:text-espresso mb-6 transition-colors">
            <ArrowLeft size={14} />
            Back to orders
          </Link>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Main */}
            <div className="xl:col-span-2 space-y-6">
              {/* Timeline */}
              <div className="card-luxury p-6">
                <h2 className="font-medium text-espresso mb-6">Production Timeline</h2>
                <div className="relative">
                  <div className="absolute left-4 top-4 bottom-4 w-px bg-black/[0.06]" />
                  <div className="space-y-6">
                    {ORDER_STAGES.map((stage, idx) => {
                      const isCompleted = idx < currentStageIdx
                      const isActive = idx === currentStageIdx
                      const isPending = idx > currentStageIdx
                      return (
                        <div key={stage.id} className="flex items-start gap-5 relative">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${
                            isCompleted ? 'bg-emerald-500' : isActive ? 'bg-gold' : 'bg-ivory border-2 border-black/10'
                          }`}>
                            {isCompleted ? (
                              <CheckCircle size={16} className="text-white" />
                            ) : isActive ? (
                              <div className="w-3 h-3 rounded-full bg-white" />
                            ) : (
                              <Circle size={12} className="text-muted/30" />
                            )}
                          </div>
                          <div className={`pt-1 ${isPending ? 'opacity-40' : ''}`}>
                            <p className={`text-sm font-medium ${isActive ? 'text-gold' : isCompleted ? 'text-espresso' : 'text-muted'}`}>
                              {stage.label}
                            </p>
                            {isActive && (
                              <p className="text-xs text-muted mt-0.5">In progress</p>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Line items */}
              <div className="card-luxury p-6">
                <h2 className="font-medium text-espresso mb-4">Order Items</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-black/[0.06]">
                        {['Description', 'Qty', 'Unit Price', 'Total'].map((h) => (
                          <th key={h} className="pb-3 text-left text-xs text-muted font-medium">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-black/[0.04]">
                      {order.items.map((item, i) => (
                        <tr key={i}>
                          <td className="py-3 text-espresso">{item.description}</td>
                          <td className="py-3 text-muted">{item.quantity}m</td>
                          <td className="py-3 text-muted">{formatCurrency(item.unitPrice, order.currency)}/m</td>
                          <td className="py-3 font-medium text-espresso">{formatCurrency(item.totalPrice, order.currency, true)}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="border-t border-black/[0.06]">
                        <td colSpan={3} className="pt-3 text-sm font-medium text-espresso text-right pr-4">Total</td>
                        <td className="pt-3 font-semibold text-espresso">{formatCurrency(order.totalValue, order.currency, true)}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              <div className="card-luxury p-5">
                <h3 className="font-medium text-espresso mb-4">Order Details</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Order No.', value: order.orderNo },
                    { label: 'Supplier', value: `${flag} ${order.supplierName}` },
                    { label: 'Status', value: order.status },
                    { label: 'Incoterm', value: order.incoterm },
                    { label: 'Created', value: formatDate(order.createdAt) },
                    { label: 'Expected Delivery', value: order.deliveryDate ? formatDate(order.deliveryDate) : '—' },
                    { label: 'PO Reference', value: order.poReference || '—' },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between text-sm">
                      <span className="text-muted">{label}</span>
                      <span className="font-medium text-espresso text-right max-w-[55%] truncate">{value}</span>
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
