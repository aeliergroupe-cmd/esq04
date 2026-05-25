import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcryptjs'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async register(email: string, password: string, name: string, orgName: string) {
    const existing = await this.prisma.user.findUnique({ where: { email } })
    if (existing) throw new ConflictException('Email already registered')

    const slug = orgName.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')
    const org = await this.prisma.organization.create({
      data: { name: orgName, slug: `${slug}-${Date.now()}` },
    })

    const passwordHash = await bcrypt.hash(password, 12)
    const user = await this.prisma.user.create({
      data: { email, passwordHash, name, role: 'ADMIN', orgId: org.id },
    })

    return this.signToken(user.id, user.email, user.orgId)
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } })
    if (!user) throw new UnauthorizedException('Invalid credentials')

    const valid = await bcrypt.compare(password, user.passwordHash)
    if (!valid) throw new UnauthorizedException('Invalid credentials')

    await this.prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    })

    return this.signToken(user.id, user.email, user.orgId)
  }

  private signToken(userId: string, email: string, orgId: string) {
    const payload = { sub: userId, email, orgId }
    return {
      accessToken: this.jwt.sign(payload),
      userId,
    }
  }
}
