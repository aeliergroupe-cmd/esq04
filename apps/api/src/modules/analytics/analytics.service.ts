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

    return {
      pipelineValue: pipelineResult._sum.value || 0,
      activeDeals,
      openOrders,
      shipmentsInTransit,
    }
  }

  async getSupplierStats(orgId: string) {
    return this.prisma.supplier.groupBy({
      by: ['country'],
      where: { orgId, isActive: true },
      _count: { id: true },
      orderBy: { _count: { id: 'desc' } },
    })
  }
}
