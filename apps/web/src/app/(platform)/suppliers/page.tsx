import { Header } from '@/components/layout/Header'
import { SupplierGrid } from '@/components/suppliers/SupplierGrid'
import { Metadata } from 'next'

export const metadata: Metadata = { title: 'Suppliers' }

export default function SuppliersPage() {
  return (
    <div className="flex flex-col h-full">
      <Header
        title="Supplier Directory"
        subtitle="Browse and manage your global network of mills, factories, and traders."
      />
      <div className="flex-1 overflow-y-auto">
        <div className="platform-container py-6">
          <SupplierGrid />
        </div>
      </div>
    </div>
  )
}
