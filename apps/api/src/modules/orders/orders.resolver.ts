import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { Order } from './models/order.model'
import { CreateOrderInput } from './dto/create-order.input'
import { OrdersService } from './orders.service'
import { GqlAuthGuard } from '../../auth/gql-auth.guard'

@Resolver(() => Order)
export class OrdersResolver {
  constructor(private readonly service: OrdersService) {}

  @Query(() => [Order])
  @UseGuards(GqlAuthGuard)
  orders(
    @Context() ctx: any,
    @Args('status', { nullable: true }) status?: string,
  ) {
    return this.service.findAll(ctx.req.user.orgId, status)
  }

  @Query(() => Order, { nullable: true })
  @UseGuards(GqlAuthGuard)
  order(@Args('id') id: string, @Context() ctx: any) {
    return this.service.findOne(id, ctx.req.user.orgId)
  }

  @Mutation(() => Order)
  @UseGuards(GqlAuthGuard)
  createOrder(@Args('input') input: CreateOrderInput, @Context() ctx: any) {
    return this.service.create(ctx.req.user.orgId, input)
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
