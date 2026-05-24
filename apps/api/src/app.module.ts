import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { join } from 'path'
import { PrismaService } from './prisma/prisma.service'
import { AuthModule } from './auth/auth.module'
import { SuppliersModule } from './modules/suppliers/suppliers.module'
import { FabricsModule } from './modules/fabrics/fabrics.module'
import { ContactsModule } from './modules/contacts/contacts.module'
import { OpportunitiesModule } from './modules/opportunities/opportunities.module'
import { QuotesModule } from './modules/quotes/quotes.module'
import { OrdersModule } from './modules/orders/orders.module'
import { ShipmentsModule } from './modules/shipments/shipments.module'
import { ActivitiesModule } from './modules/activities/activities.module'
import { AnalyticsModule } from './modules/analytics/analytics.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: process.env.NODE_ENV !== 'production',
      introspection: process.env.NODE_ENV !== 'production',
      context: ({ req }) => ({ req }),
    }),

    AuthModule,
    SuppliersModule,
    FabricsModule,
    ContactsModule,
    OpportunitiesModule,
    QuotesModule,
    OrdersModule,
    ShipmentsModule,
    ActivitiesModule,
    AnalyticsModule,
  ],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
