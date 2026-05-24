import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { ConfigService } from '@nestjs/config'
import { AuthService } from './auth.service'
import { AuthResolver } from './auth.resolver'
import { JwtStrategy } from './jwt.strategy'
import { PrismaService } from '../prisma/prisma.service'

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET', 'dev-secret'),
        signOptions: { expiresIn: config.get<string>('JWT_EXPIRES_IN', '7d') },
      }),
    }),
  ],
  providers: [AuthService, AuthResolver, JwtStrategy, PrismaService],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
