import { Module } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { QuotesService } from './quotes.service'
import { QuotesResolver } from './quotes.resolver'

@Module({
  imports: [JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (c: ConfigService) => ({ secret: c.get('JWT_SECRET', 'dev-secret') }),
  })],
  providers: [QuotesService, QuotesResolver, PrismaService],
  exports: [QuotesService],
})
export class QuotesModule {}
