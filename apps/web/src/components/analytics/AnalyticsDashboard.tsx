'use client'

import { motion } from 'framer-motion'
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
} from 'recharts'
import { mockOpportunities, mockSuppliers } from '@/lib/mock-data'
import { formatCurrency } from '@/lib/utils'

const PIPELINE_TREND = [
  { month: 'Jan', value: 2.8 },
  { month: 'Feb', value: 3.1 },
  { month: 'Mar', value: 2.9 },
  { month: 'Apr', value: 3.4 },
  { month: 'May', value: 3.8 },
  { month: 'Jun', value: 3.6 },
  { month: 'Jul', value: 4.1 },
  { month: 'Aug', value: 4.4 },
  { month: 'Sep', value: 4.82 },
]

const SUPPLIER_PERFORMANCE = mockSuppliers.slice(0, 6).map((s) => ({
  name: s.name.split(' ').slice(0, 2).join(' '),
  rating: s.rating || 0,
  orders: Math.floor(Math.random() * 12) + 2,
}))

const REGION_DATA = [
  { name: 'Europe', value: 58, color: '#B68A5A' },
  { name: 'Asia', value: 28, color: '#D4A96A' },
  { name: 'Americas', value: 10, color: '#9A7340' },
  { name: 'Other', value: 4, color: '#E8D5C0' },
]

const STAGE_CONVERSION = [
  { stage: 'Discovery', count: 24 },
  { stage: 'Sampling', count: 18 },
  { stage: 'Quotation', count: 14 },
  { stage: 'Negotiation', count: 10 },
  { stage: 'Production', count: 8 },
  { stage: 'Completed', count: 6 },
]

const totalPipeline = mockOpportunities
  .filter((o) => o.stage !== 'LOST')
  .reduce((sum, o) => sum + o.value, 0)

export function AnalyticsDashboard() {
  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Pipeline', value: formatCurrency(totalPipeline, 'USD', true), change: '+24%' },
          { label: 'Win Rate', value: '68%', change: '+4pp' },
          { label: 'Avg Deal Size', value: '$128K', change: '+12%' },
          { label: 'Avg Close Time', value: '47 days', change: '-8 days' },
        ].map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.07 }}
            className="stat-card"
          >
            <p className="text-2xl font-semibold text-espresso">{kpi.value}</p>
            <p className="text-xs text-muted">{kpi.label}</p>
            <p className="text-xs text-emerald-600 font-medium mt-1">{kpi.change} vs last quarter</p>
          </motion.div>
        ))}
      </div>

      {/* Charts row 1 */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Pipeline trend */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="card-luxury p-6"
        >
          <h3 className="font-medium text-espresso mb-1">Pipeline Value Trend</h3>
          <p className="text-xs text-muted mb-5">Total active pipeline (USD millions)</p>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={PIPELINE_TREND}>
              <defs>
                <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#B68A5A" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#B68A5A" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.04)" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#6E6258' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#6E6258' }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}M`} />
              <Tooltip
                formatter={(value: number) => [`$${value}M`, 'Pipeline']}
                contentStyle={{ background: '#fff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 12, fontSize: 12 }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#B68A5A"
                strokeWidth={2}
                fill="url(#goldGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Stage conversion */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="card-luxury p-6"
        >
          <h3 className="font-medium text-espresso mb-1">Pipeline Conversion Funnel</h3>
          <p className="text-xs text-muted mb-5">Deals per stage</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={STAGE_CONVERSION} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.04)" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: '#6E6258' }} axisLine={false} tickLine={false} />
              <YAxis dataKey="stage" type="category" tick={{ fontSize: 11, fill: '#6E6258' }} axisLine={false} tickLine={false} width={80} />
              <Tooltip
                contentStyle={{ background: '#fff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 12, fontSize: 12 }}
              />
              <Bar dataKey="count" fill="#B68A5A" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Charts row 2 */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Sourcing by region */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="card-luxury p-6"
        >
          <h3 className="font-medium text-espresso mb-1">Sourcing by Region</h3>
          <p className="text-xs text-muted mb-5">% of total volume</p>
          <div className="flex items-center gap-6">
            <ResponsiveContainer width={160} height={160}>
              <PieChart>
                <Pie
                  data={REGION_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={70}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {REGION_DATA.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-2">
              {REGION_DATA.map((region) => (
                <div key={region.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: region.color }} />
                    <span className="text-muted">{region.name}</span>
                  </div>
                  <span className="font-medium text-espresso">{region.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Supplier performance */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="card-luxury p-6"
        >
          <h3 className="font-medium text-espresso mb-1">Top Supplier Performance</h3>
          <p className="text-xs text-muted mb-5">Rating vs order volume</p>
          <div className="space-y-3">
            {SUPPLIER_PERFORMANCE.map((s, idx) => (
              <div key={s.name} className="flex items-center gap-3">
                <span className="text-[10px] text-muted w-4 text-right">{idx + 1}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-espresso truncate">{s.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-muted">{s.orders} orders</span>
                      <span className="text-xs font-semibold text-gold">{s.rating.toFixed(1)}</span>
                    </div>
                  </div>
                  <div className="h-1 bg-black/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gold-gradient rounded-full"
                      style={{ width: `${(s.rating / 5) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
