import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'

@Injectable()
export class QuotesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(orgId: string, status?: string) {
    return this.prisma.quote.findMany({
      where: { orgId, ...(status && { status: status as any }) },
      include: { items: true, supplier: { select: { name: true, country: true } } },
      orderBy: { createdAt: 'desc' },
    })
  }

  async findOne(id: string, orgId: string) {
    return this.prisma.quote.findFirst({
      where: { id, orgId },
      include: { items: true, supplier: true },
    })
  }

  async create(orgId: string, data: any) {
    const { items, ...quoteData } = data
    const referenceNo = `RFQ-${new Date().getFullYear()}-${String(Date.now()).slice(-4)}`
    return this.prisma.quote.create({
      data: {
        ...quoteData,
        orgId,
        referenceNo,
        status: 'DRAFT',
        items: { create: items ?? [] },
      },
      include: { items: true },
    })
  }

  async updateStatus(id: string, orgId: string, status: string) {
    return this.prisma.quote.update({
      where: { id },
      data: { status: status as any },
      include: { items: true },
    })
  }
}
