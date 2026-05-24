import { Resolver, Query, Args, Context, ObjectType, Field, ID, Int } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { ActivitiesService } from './activities.service'
import { GqlAuthGuard } from '../../auth/gql-auth.guard'

@ObjectType()
class Activity {
  @Field(() => ID) id: string
  @Field() type: string
  @Field() content: string
  @Field({ nullable: true }) entityType?: string
  @Field({ nullable: true }) entityId?: string
  @Field() userId: string
  @Field() orgId: string
  @Field() createdAt: Date
}

@Resolver(() => Activity)
export class ActivitiesResolver {
  constructor(private readonly service: ActivitiesService) {}

  @Query(() => [Activity])
  @UseGuards(GqlAuthGuard)
  activityFeed(
    @Context() ctx: any,
    @Args('limit', { nullable: true, type: () => Int }) limit?: number,
  ) {
    return this.service.findAll(ctx.req.user.orgId, limit)
  }
}
