import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'

@Injectable()
export class ShipmentsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(orgId: string, status?: string) {
    return this.prisma.shipment.findMany({
      where: { orgId, ...(status && { status: status as any }) },
      orderBy: { createdAt: 'desc' },
    })
  }

  async findOne(id: string, orgId: string) {
    return this.prisma.shipment.findFirst({ where: { id, orgId } })
  }

  async updateStatus(id: string, orgId: string, status: string) {
    return this.prisma.shipment.update({ where: { id }, data: { status: status as any } })
  }
}
