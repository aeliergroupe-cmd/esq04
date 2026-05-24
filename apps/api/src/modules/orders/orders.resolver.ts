import { Resolver, Query, Mutation, Args, Context, ObjectType, Field, ID, Float } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { OrdersService } from './orders.service'
import { GqlAuthGuard } from '../../auth/gql-auth.guard'

@ObjectType()
class Order {
  @Field(() => ID) id: string
  @Field() orderNo: string
  @Field({ nullable: true }) title?: string
  @Field() status: string
  @Field(() => Float, { nullable: true }) totalValue?: number
  @Field() currency: string
  @Field() incoterm: string
  @Field({ nullable: true }) deliveryDate?: Date
  @Field({ nullable: true }) supplierId?: string
  @Field() orgId: string
  @Field() createdAt: Date
}

@Resolver(() => Order)
export class OrdersResolver {
  constructor(private readonly service: OrdersService) {}

  @Query(() => [Order])
  @UseGuards(GqlAuthGuard)
  orders(@Context() ctx: any, @Args('status', { nullable: true }) status?: string) {
    return this.service.findAll(ctx.req.user.orgId, status)
  }

  @Mutation(() => Order)
  @UseGuards(GqlAuthGuard)
  updateOrderStatus(
    @Args('id') id: string,
    @Args('status') status: string,
    @Context() ctx: any,
  ) {
    return this.service.updateStatus(id, ctx.req.user.orgId, status)
  }
}
