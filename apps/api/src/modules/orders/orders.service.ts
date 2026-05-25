import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(orgId: string, status?: string) {
    return this.prisma.order.findMany({
      where: { orgId, ...(status && { status: status as any }) },
      include: { items: true, supplier: { select: { name: true, country: true } } },
      orderBy: { createdAt: 'desc' },
    })
  }

  async findOne(id: string, orgId: string) {
    return this.prisma.order.findFirst({
      where: { id, orgId },
      include: { items: true, supplier: true, shipments: true },
    })
  }

  async create(orgId: string, data: any) {
    const { items, ...orderData } = data
    const year = new Date().getFullYear()
    const seq = String(Date.now()).slice(-4)
    const orderNo = `NOB-${year}-${seq}`
    return this.prisma.order.create({
      data: {
        ...orderData,
        orgId,
        orderNo,
        items: { create: items ?? [] },
      },
      include: { items: true },
    })
  }

  async updateStatus(id: string, orgId: string, status: string) {
    return this.prisma.order.update({
      where: { id },
      data: { status: status as any },
      include: { items: true },
    })
  }
}
