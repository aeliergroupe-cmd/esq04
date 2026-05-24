import { Header } from '@/components/layout/Header'
import { KanbanBoard } from '@/components/crm/KanbanBoard'
import { Metadata } from 'next'

export const metadata: Metadata = { title: 'CRM Pipeline' }

export default function CRMPage() {
  return (
    <div className="flex flex-col h-full">
      <Header
        title="CRM Pipeline"
        subtitle="Track every sourcing opportunity from discovery to delivery."
      />
      <div className="flex-1 overflow-hidden">
        <KanbanBoard />
      </div>
    </div>
  )
}
