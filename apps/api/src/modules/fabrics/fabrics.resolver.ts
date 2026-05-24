import { Resolver, Query, Args, Context, ObjectType, Field, ID, Float, Int } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { FabricsService } from './fabrics.service'
import { GqlAuthGuard } from '../../auth/gql-auth.guard'

@ObjectType()
class Fabric {
  @Field(() => ID) id: string
  @Field() sku: string
  @Field() name: string
  @Field({ nullable: true }) description?: string
  @Field(() => Float) pricePerMeter: number
  @Field() currency: string
  @Field(() => Float, { nullable: true }) moqMeters?: number
  @Field(() => Int, { nullable: true }) leadTimeDays?: number
  @Field({ defaultValue: true }) isActive: boolean
  @Field() supplierId: string
  @Field() orgId: string
  @Field() createdAt: Date
}

@Resolver(() => Fabric)
export class FabricsResolver {
  constructor(private readonly service: FabricsService) {}

  @Query(() => [Fabric])
  @UseGuards(GqlAuthGuard)
  fabrics(
    @Context() ctx: any,
    @Args('supplierId', { nullable: true }) supplierId?: string,
    @Args('search', { nullable: true }) search?: string,
    @Args('inStock', { nullable: true }) inStock?: boolean,
  ) {
    return this.service.findAll(ctx.req.user.orgId, { supplierId, search, inStock })
  }

  @Query(() => Fabric, { nullable: true })
  @UseGuards(GqlAuthGuard)
  fabric(@Args('id') id: string, @Context() ctx: any) {
    return this.service.findOne(id, ctx.req.user.orgId)
  }
}
