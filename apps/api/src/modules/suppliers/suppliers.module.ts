import { Module } from '@nestjs/common'
import { SuppliersService } from './suppliers.service'
import { SuppliersResolver } from './suppliers.resolver'
import { PrismaService } from '../../prisma/prisma.service'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get('JWT_SECRET', 'dev-secret'),
      }),
    }),
  ],
  providers: [SuppliersService, SuppliersResolver, PrismaService],
  exports: [SuppliersService],
})
export class SuppliersModule {}
