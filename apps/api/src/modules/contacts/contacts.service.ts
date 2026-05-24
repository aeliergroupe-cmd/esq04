import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'

@Injectable()
export class ContactsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(orgId: string, stage?: string) {
    return this.prisma.contact.findMany({
      where: { orgId, ...(stage && { stage: stage as any }) },
      orderBy: { lastContactedAt: 'desc' },
    })
  }

  async findOne(id: string, orgId: string) {
    return this.prisma.contact.findFirst({ where: { id, orgId } })
  }

  async create(orgId: string, data: any) {
    return this.prisma.contact.create({ data: { ...data, orgId } })
  }
}
