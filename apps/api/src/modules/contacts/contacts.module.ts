import { Module } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ContactsService } from './contacts.service'
import { ContactsResolver } from './contacts.resolver'

@Module({
  imports: [JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (c: ConfigService) => ({ secret: c.get('JWT_SECRET', 'dev-secret') }),
  })],
  providers: [ContactsService, ContactsResolver, PrismaService],
  exports: [ContactsService],
})
export class ContactsModule {}
