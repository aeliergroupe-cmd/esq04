import { Module } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ShipmentsService } from './shipments.service'
import { ShipmentsResolver } from './shipments.resolver'

@Module({
  imports: [JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (c: ConfigService) => ({ secret: c.get('JWT_SECRET', 'dev-secret') }),
  })],
  providers: [ShipmentsService, ShipmentsResolver, PrismaService],
  exports: [ShipmentsService],
})
export class ShipmentsModule {}
