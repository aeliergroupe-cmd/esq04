import { Module } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { FabricsService } from './fabrics.service'
import { FabricsResolver } from './fabrics.resolver'

@Module({
  imports: [JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (c: ConfigService) => ({ secret: c.get('JWT_SECRET', 'dev-secret') }),
  })],
  providers: [FabricsService, FabricsResolver, PrismaService],
  exports: [FabricsService],
})
export class FabricsModule {}
