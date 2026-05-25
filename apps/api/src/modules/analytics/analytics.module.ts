import { Module } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AnalyticsService } from './analytics.service'
import { AnalyticsResolver } from './analytics.resolver'

@Module({
  imports: [JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (c: ConfigService) => ({ secret: c.get('JWT_SECRET', 'dev-secret') }),
  })],
  providers: [AnalyticsService, AnalyticsResolver, PrismaService],
  exports: [AnalyticsService],
})
export class AnalyticsModule {}
