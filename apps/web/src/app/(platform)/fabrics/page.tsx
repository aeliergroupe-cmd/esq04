import { Header } from '@/components/layout/Header'
import { FabricGrid } from '@/components/fabrics/FabricGrid'
import { Metadata } from 'next'

export const metadata: Metadata = { title: 'Fabric Catalog' }

export default function FabricsPage() {
  return (
    <div className="flex flex-col h-full">
      <Header
        title="Fabric Catalog"
        subtitle="Discover and source from thousands of premium fabrics worldwide."
      />
      <div className="flex-1 overflow-y-auto">
        <div className="platform-container py-6">
          <FabricGrid />
        </div>
      </div>
    </div>
  )
}
