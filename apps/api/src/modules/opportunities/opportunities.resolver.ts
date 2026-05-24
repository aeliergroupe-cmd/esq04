import { Resolver, Query, Mutation, Args, Context, ObjectType, Field, Int, Float } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { Opportunity } from './models/opportunity.model'
import { OpportunitiesService } from './opportunities.service'
import { GqlAuthGuard } from '../../auth/gql-auth.guard'

@ObjectType()
class PipelineStage {
  @Field()
  stage: string

  @Field(() => Int)
  count: number

  @Field(() => Float)
  totalValue: number
}

@Resolver(() => Opportunity)
export class OpportunitiesResolver {
  constructor(private readonly service: OpportunitiesService) {}

  @Query(() => [Opportunity])
  @UseGuards(GqlAuthGuard)
  opportunities(
    @Context() ctx: any,
    @Args('stage', { nullable: true }) stage?: string,
  ) {
    return this.service.findAll(ctx.req.user.orgId, stage)
  }

  @Query(() => [PipelineStage])
  @UseGuards(GqlAuthGuard)
  pipelineSummary(@Context() ctx: any) {
    return this.service.getPipelineSummary(ctx.req.user.orgId)
  }

  @Mutation(() => Opportunity)
  @UseGuards(GqlAuthGuard)
  moveOpportunityStage(
    @Args('id') id: string,
    @Args('stage') stage: string,
    @Context() ctx: any,
  ) {
    return this.service.updateStage(id, ctx.req.user.orgId, stage)
  }
}
