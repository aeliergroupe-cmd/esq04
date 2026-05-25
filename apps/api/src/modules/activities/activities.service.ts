import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'

@Injectable()
export class ActivitiesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(orgId: string, filters?: { limit?: number; entityId?: string }) {
    return this.prisma.activity.findMany({
      where: {
        orgId,
        ...(filters?.entityId && { entityId: filters.entityId }),
      },
      include: { user: { select: { name: true, avatar: true } } },
      orderBy: { createdAt: 'desc' },
      take: filters?.limit ?? 20,
    })
  }

  async create(orgId: string, userId: string, data: any) {
    return this.prisma.activity.create({
      data: { ...data, orgId, userId },
    })
  }
}
