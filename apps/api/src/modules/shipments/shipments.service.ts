import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'

@Injectable()
export class ShipmentsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(orgId: string, filters?: { status?: string; orderId?: string }) {
    return this.prisma.shipment.findMany({
      where: {
        orgId,
        ...(filters?.status && { status: filters.status as any }),
        ...(filters?.orderId && { orderId: filters.orderId }),
      },
      orderBy: { createdAt: 'desc' },
    })
  }

  async findOne(id: string, orgId: string) {
    return this.prisma.shipment.findFirst({ where: { id, orgId } })
  }

  async create(orgId: string, data: any) {
    return this.prisma.shipment.create({ data: { ...data, orgId } })
  }

  async updateStatus(id: string, orgId: string, status: string) {
    return this.prisma.shipment.update({
      where: { id },
      data: { status: status as any },
    })
  }
}
