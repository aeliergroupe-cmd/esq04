import { Resolver, Query, Context, Args } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { DashboardMetrics, PipelineStageMetric, SupplierCountryStat } from './models/analytics.model'
import { AnalyticsFilterInput } from './dto/analytics-filter.input'
import { AnalyticsService } from './analytics.service'
import { GqlAuthGuard } from '../../auth/gql-auth.guard'

@Resolver()
export class AnalyticsResolver {
  constructor(private readonly service: AnalyticsService) {}

  @Query(() => DashboardMetrics)
  @UseGuards(GqlAuthGuard)
  dashboardMetrics(@Context() ctx: any) {
    return this.service.getDashboardMetrics(ctx.req.user.orgId)
  }

  @Query(() => [PipelineStageMetric])
  @UseGuards(GqlAuthGuard)
  pipelineByStage(@Context() ctx: any) {
    return this.service.getPipelineByStage(ctx.req.user.orgId)
  }

  @Query(() => [SupplierCountryStat])
  @UseGuards(GqlAuthGuard)
  suppliersByCountry(@Context() ctx: any) {
    return this.service.getSuppliersByCountry(ctx.req.user.orgId)
  }
}
