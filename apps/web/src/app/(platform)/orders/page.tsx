import { Header } from '@/components/layout/Header'
import { OrderList } from '@/components/orders/OrderList'
import { Metadata } from 'next'

export const metadata: Metadata = { title: 'Orders' }

export default function OrdersPage() {
  return (
    <div className="flex flex-col h-full">
      <Header
        title="Orders"
        subtitle="Track production from sample to delivery across all suppliers."
      />
      <div className="flex-1 overflow-y-auto">
        <div className="platform-container py-6">
          <OrderList />
        </div>
      </div>
    </div>
  )
}
