import { ObjectType, Field, ID, Float, Int } from '@nestjs/graphql'
import GraphQLJSON from 'graphql-type-json'

@ObjectType()
export class DashboardMetrics {
  @Field(() => Float)
  pipelineValue: number

  @Field(() => Int)
  activeDeals: number

  @Field(() => Int)
  openRFQs: number

  @Field(() => Int)
  shipmentsInTransit: number

  @Field(() => Float, { nullable: true })
  avgDealValue?: number
}

@ObjectType()
export class PipelineStageMetric {
  @Field()
  stage: string

  @Field(() => Int)
  count: number

  @Field(() => Float)
  totalValue: number
}

@ObjectType()
export class SupplierCountryStat {
  @Field()
  country: string

  @Field(() => Int)
  supplierCount: number
}

@ObjectType()
export class AnalyticsSnapshot {
  @Field(() => ID)
  id: string

  @Field()
  orgId: string

  @Field()
  date: Date

  @Field(() => Float)
  pipelineValue: number

  @Field(() => Int)
  dealsWon: number

  @Field(() => Int)
  dealsLost: number

  @Field(() => Float)
  avgDealValue: number

  @Field(() => GraphQLJSON, { nullable: true })
  topCategories?: object[]

  @Field()
  createdAt: Date
}
