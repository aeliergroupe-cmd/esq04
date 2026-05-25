import { Resolver, Query, Mutation, Args, Context, Int } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { Activity } from './models/activity.model'
import { CreateActivityInput } from './dto/create-activity.input'
import { ActivitiesService } from './activities.service'
import { GqlAuthGuard } from '../../auth/gql-auth.guard'

@Resolver(() => Activity)
export class ActivitiesResolver {
  constructor(private readonly service: ActivitiesService) {}

  @Query(() => [Activity])
  @UseGuards(GqlAuthGuard)
  activityFeed(
    @Context() ctx: any,
    @Args('limit', { nullable: true, type: () => Int }) limit?: number,
    @Args('entityId', { nullable: true }) entityId?: string,
  ) {
    return this.service.findAll(ctx.req.user.orgId, { limit, entityId })
  }

  @Mutation(() => Activity)
  @UseGuards(GqlAuthGuard)
  createActivity(@Args('input') input: CreateActivityInput, @Context() ctx: any) {
    return this.service.create(ctx.req.user.orgId, ctx.req.user.userId, input)
  }
}
