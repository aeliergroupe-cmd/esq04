import { Header } from '@/components/layout/Header'
import { QuoteList } from '@/components/quotes/QuoteList'
import { Metadata } from 'next'

export const metadata: Metadata = { title: 'Quotes & RFQs' }

export default function QuotesPage() {
  return (
    <div className="flex flex-col h-full">
      <Header
        title="Quotes & RFQs"
        subtitle="Manage requests for quotation and compare supplier offers."
      />
      <div className="flex-1 overflow-y-auto">
        <div className="platform-container py-6">
          <QuoteList />
        </div>
      </div>
    </div>
  )
}
