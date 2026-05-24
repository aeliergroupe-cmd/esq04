import { Header } from '@/components/layout/Header'
import { AnalyticsDashboard } from '@/components/analytics/AnalyticsDashboard'
import { Metadata } from 'next'

export const metadata: Metadata = { title: 'Analytics' }

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col h-full">
      <Header
        title="Analytics"
        subtitle="Sourcing intelligence, pipeline performance, and supplier insights."
      />
      <div className="flex-1 overflow-y-auto">
        <div className="platform-container py-6">
          <AnalyticsDashboard />
        </div>
      </div>
    </div>
  )
}
