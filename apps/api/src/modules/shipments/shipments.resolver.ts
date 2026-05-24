import { Resolver, Query, Args, Context, ObjectType, Field, ID, Float } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { ShipmentsService } from './shipments.service'
import { GqlAuthGuard } from '../../auth/gql-auth.guard'

@ObjectType()
class Shipment {
  @Field(() => ID) id: string
  @Field() reference: string
  @Field({ nullable: true }) carrier?: string
  @Field({ nullable: true }) trackingNumber?: string
  @Field() status: string
  @Field({ nullable: true }) originCountry?: string
  @Field({ nullable: true }) destCountry?: string
  @Field({ nullable: true }) originPort?: string
  @Field({ nullable: true }) destPort?: string
  @Field({ nullable: true }) etd?: Date
  @Field({ nullable: true }) eta?: Date
  @Field({ nullable: true }) orderId?: string
  @Field() orgId: string
  @Field() createdAt: Date
}

@Resolver(() => Shipment)
export class ShipmentsResolver {
  constructor(private readonly service: ShipmentsService) {}

  @Query(() => [Shipment])
  @UseGuards(GqlAuthGuard)
  shipments(@Context() ctx: any, @Args('status', { nullable: true }) status?: string) {
    return this.service.findAll(ctx.req.user.orgId, status)
  }
}
