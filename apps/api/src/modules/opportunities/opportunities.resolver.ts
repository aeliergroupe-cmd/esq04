import { Resolver, Query, Mutation, Args, Context, ObjectType, Field, Int, Float } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { Opportunity } from './models/opportunity.model'
import { CreateOpportunityInput } from './dto/create-opportunity.input'
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

  @Query(() => Opportunity, { nullable: true })
  @UseGuards(GqlAuthGuard)
  opportunity(@Args('id') id: string, @Context() ctx: any) {
    return this.service.findOne(id, ctx.req.user.orgId)
  }

  @Query(() => [PipelineStage])
  @UseGuards(GqlAuthGuard)
  pipelineSummary(@Context() ctx: any) {
    return this.service.getPipelineSummary(ctx.req.user.orgId)
  }

  @Mutation(() => Opportunity)
  @UseGuards(GqlAuthGuard)
  createOpportunity(
    @Args('input') input: CreateOpportunityInput,
    @Context() ctx: any,
  ) {
    return this.service.create(ctx.req.user.orgId, input)
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
