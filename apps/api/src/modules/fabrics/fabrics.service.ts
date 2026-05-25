import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'

@Injectable()
export class FabricsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(orgId: string, filters?: { supplierId?: string; search?: string; inStock?: boolean }) {
    return this.prisma.fabric.findMany({
      where: {
        orgId,
        isActive: true,
        ...(filters?.supplierId && { supplierId: filters.supplierId }),
        ...(filters?.inStock && { stockMeters: { gt: 0 } }),
        ...(filters?.search && {
          OR: [
            { name: { contains: filters.search, mode: 'insensitive' } },
            { sku: { contains: filters.search, mode: 'insensitive' } },
          ],
        }),
      },
      include: { supplier: { select: { name: true, country: true } } },
      orderBy: { createdAt: 'desc' },
    })
  }

  async findOne(id: string, orgId: string) {
    return this.prisma.fabric.findFirst({
      where: { id, orgId },
      include: { supplier: true },
    })
  }

  async create(orgId: string, data: any) {
    return this.prisma.fabric.create({ data: { ...data, orgId } })
  }
}
