import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'

@Injectable()
export class AnalyticsService {
  constructor(private readonly prisma: PrismaService) {}

  async getDashboardMetrics(orgId: string) {
    const [pipelineResult, activeDeals, openOrders, shipmentsInTransit] = await Promise.all([
      this.prisma.opportunity.aggregate({
        where: { orgId, stage: { notIn: ['LOST', 'COMPLETED'] } },
        _sum: { value: true },
        _count: true,
      }),
      this.prisma.opportunity.count({
        where: { orgId, stage: { notIn: ['LOST', 'COMPLETED'] } },
      }),
      this.prisma.order.count({
        where: { orgId, status: { notIn: ['DELIVERED', 'CANCELLED'] } },
      }),
      this.prisma.shipment.count({
        where: { orgId, status: { in: ['TRANSIT', 'CUSTOMS'] } },
      }),
    ])

    const avgDealValue =
      activeDeals > 0 ? (pipelineResult._sum.value ?? 0) / activeDeals : 0

    return {
      pipelineValue: pipelineResult._sum.value ?? 0,
      activeDeals,
      openRFQs: await this.prisma.quote.count({
        where: { orgId, status: { in: ['DRAFT', 'SENT', 'RECEIVED'] } },
      }),
      shipmentsInTransit,
      avgDealValue,
    }
  }

  async getPipelineByStage(orgId: string) {
    const stages = ['DISCOVERY', 'SAMPLING', 'QUOTATION', 'NEGOTIATION', 'PRODUCTION', 'SHIPMENT', 'COMPLETED']
    const results = await Promise.all(
      stages.map(async (stage) => {
        const agg = await this.prisma.opportunity.aggregate({
          where: { orgId, stage: stage as any },
          _count: true,
          _sum: { value: true },
        })
        return {
          stage,
          count: agg._count,
          totalValue: agg._sum.value ?? 0,
        }
      })
    )
    return results
  }

  async getSuppliersByCountry(orgId: string) {
    const grouped = await this.prisma.supplier.groupBy({
      by: ['country'],
      where: { orgId, isActive: true },
      _count: { id: true },
      orderBy: { _count: { id: 'desc' } },
    })
    return grouped.map((g) => ({
      country: g.country,
      supplierCount: g._count.id,
    }))
  }
}
