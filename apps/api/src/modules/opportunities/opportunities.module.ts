import { Module } from '@nestjs/common'
import { OpportunitiesService } from './opportunities.service'
import { OpportunitiesResolver } from './opportunities.resolver'
import { PrismaService } from '../../prisma/prisma.service'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
  imports: [JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (c: ConfigService) => ({ secret: c.get('JWT_SECRET', 'dev-secret') }),
  })],
  providers: [OpportunitiesService, OpportunitiesResolver, PrismaService],
  exports: [OpportunitiesService],
})
export class OpportunitiesModule {}
