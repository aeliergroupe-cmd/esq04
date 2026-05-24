import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { CreateSupplierInput } from './dto/create-supplier.input'

@Injectable()
export class SuppliersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(orgId: string, filters?: { type?: string; tier?: string; country?: string; search?: string }) {
    return this.prisma.supplier.findMany({
      where: {
        orgId,
        isActive: true,
        ...(filters?.type && { type: filters.type as any }),
        ...(filters?.tier && { tier: filters.tier as any }),
        ...(filters?.country && { country: filters.country }),
        ...(filters?.search && {
          OR: [
            { name: { contains: filters.search, mode: 'insensitive' } },
            { country: { contains: filters.search, mode: 'insensitive' } },
            { city: { contains: filters.search, mode: 'insensitive' } },
          ],
        }),
      },
      orderBy: [{ tier: 'asc' }, { rating: 'desc' }],
    })
  }

  async findOne(id: string, orgId: string) {
    return this.prisma.supplier.findFirst({ where: { id, orgId } })
  }

  async create(orgId: string, input: CreateSupplierInput) {
    return this.prisma.supplier.create({
      data: { ...input, orgId },
    })
  }

  async update(id: string, orgId: string, data: Partial<CreateSupplierInput>) {
    return this.prisma.supplier.update({
      where: { id },
      data,
    })
  }

  async remove(id: string, orgId: string) {
    return this.prisma.supplier.update({
      where: { id },
      data: { isActive: false },
    })
  }
}
