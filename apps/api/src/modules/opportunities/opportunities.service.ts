import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'

@Injectable()
export class OpportunitiesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(orgId: string, stage?: string) {
    return this.prisma.opportunity.findMany({
      where: { orgId, ...(stage && { stage: stage as any }) },
      orderBy: { createdAt: 'desc' },
    })
  }

  async findOne(id: string, orgId: string) {
    return this.prisma.opportunity.findFirst({ where: { id, orgId } })
  }

  async create(orgId: string, data: any) {
    return this.prisma.opportunity.create({ data: { ...data, orgId } })
  }

  async updateStage(id: string, orgId: string, stage: string) {
    return this.prisma.opportunity.update({
      where: { id },
      data: { stage: stage as any },
    })
  }

  async getPipelineSummary(orgId: string) {
    const opps = await this.prisma.opportunity.findMany({ where: { orgId } })
    const stages = ['DISCOVERY', 'SAMPLING', 'QUOTATION', 'NEGOTIATION', 'PRODUCTION', 'SHIPMENT', 'COMPLETED', 'LOST']
    return stages.map((stage) => {
      const stageOpps = opps.filter((o) => o.stage === stage)
      return {
        stage,
        count: stageOpps.length,
        totalValue: stageOpps.reduce((sum, o) => sum + (o.value || 0), 0),
      }
    })
  }
}
