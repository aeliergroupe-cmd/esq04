import { Header } from '@/components/layout/Header'
import { KPICards } from '@/components/dashboard/KPICards'
import { PipelineSummary } from '@/components/dashboard/PipelineSummary'
import { RecentOpportunities } from '@/components/dashboard/RecentOpportunities'
import { ActivityFeed } from '@/components/dashboard/ActivityFeed'
import { ShipmentWidget } from '@/components/dashboard/ShipmentWidget'
import { QuickActions } from '@/components/dashboard/QuickActions'
import { Metadata } from 'next'

export const metadata: Metadata = { title: 'Dashboard' }

export default function DashboardPage() {
  return (
    <div className="flex flex-col h-full">
      <Header
        title="Dashboard"
        subtitle="Good morning, Marco — here's what's happening today."
      />
      <div className="flex-1 overflow-y-auto">
        <div className="platform-container py-6 space-y-6">
          {/* KPI row */}
          <KPICards />

          {/* Main grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Pipeline + Opportunities (2 cols) */}
            <div className="xl:col-span-2 space-y-6">
              <PipelineSummary />
              <RecentOpportunities />
            </div>

            {/* Right column */}
            <div className="space-y-6">
              <QuickActions />
              <ShipmentWidget />
              <ActivityFeed />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
