import { Resolver, Query, Context, ObjectType, Field, Int, Float } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { AnalyticsService } from './analytics.service'
import { GqlAuthGuard } from '../../auth/gql-auth.guard'

@ObjectType()
class DashboardMetrics {
  @Field(() => Float)
  pipelineValue: number

  @Field(() => Int)
  activeDeals: number

  @Field(() => Int)
  openOrders: number

  @Field(() => Int)
  shipmentsInTransit: number
}

@Resolver()
export class AnalyticsResolver {
  constructor(private readonly service: AnalyticsService) {}

  @Query(() => DashboardMetrics)
  @UseGuards(GqlAuthGuard)
  dashboardMetrics(@Context() ctx: any) {
    return this.service.getDashboardMetrics(ctx.req.user.orgId)
  }
}
