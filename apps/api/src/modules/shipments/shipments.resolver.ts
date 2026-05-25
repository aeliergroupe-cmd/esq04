import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { Shipment } from './models/shipment.model'
import { CreateShipmentInput } from './dto/create-shipment.input'
import { ShipmentsService } from './shipments.service'
import { GqlAuthGuard } from '../../auth/gql-auth.guard'

@Resolver(() => Shipment)
export class ShipmentsResolver {
  constructor(private readonly service: ShipmentsService) {}

  @Query(() => [Shipment])
  @UseGuards(GqlAuthGuard)
  shipments(
    @Context() ctx: any,
    @Args('status', { nullable: true }) status?: string,
    @Args('orderId', { nullable: true }) orderId?: string,
  ) {
    return this.service.findAll(ctx.req.user.orgId, { status, orderId })
  }

  @Query(() => Shipment, { nullable: true })
  @UseGuards(GqlAuthGuard)
  shipment(@Args('id') id: string, @Context() ctx: any) {
    return this.service.findOne(id, ctx.req.user.orgId)
  }

  @Mutation(() => Shipment)
  @UseGuards(GqlAuthGuard)
  createShipment(@Args('input') input: CreateShipmentInput, @Context() ctx: any) {
    return this.service.create(ctx.req.user.orgId, input)
  }

  @Mutation(() => Shipment)
  @UseGuards(GqlAuthGuard)
  updateShipmentStatus(
    @Args('id') id: string,
    @Args('status') status: string,
    @Context() ctx: any,
  ) {
    return this.service.updateStatus(id, ctx.req.user.orgId, status)
  }
}
