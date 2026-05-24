import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'

@Injectable()
export class ActivitiesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(orgId: string, limit = 20) {
    return this.prisma.activity.findMany({
      where: { orgId },
      include: { user: { select: { name: true, avatar: true } } },
      orderBy: { createdAt: 'desc' },
      take: limit,
    })
  }

  async create(orgId: string, userId: string, data: any) {
    return this.prisma.activity.create({
      data: { ...data, orgId, userId },
    })
  }
}
