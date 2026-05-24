import { Header } from '@/components/layout/Header'
import { ShipmentList } from '@/components/shipments/ShipmentList'
import { Metadata } from 'next'

export const metadata: Metadata = { title: 'Shipments' }

export default function ShipmentsPage() {
  return (
    <div className="flex flex-col h-full">
      <Header
        title="Shipments"
        subtitle="Track all your logistics from origin port to final delivery."
      />
      <div className="flex-1 overflow-y-auto">
        <div className="platform-container py-6">
          <ShipmentList />
        </div>
      </div>
    </div>
  )
}
