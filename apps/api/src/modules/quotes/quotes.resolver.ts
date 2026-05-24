import { Resolver, Query, Args, Context, ObjectType, Field, ID, Float } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { QuotesService } from './quotes.service'
import { GqlAuthGuard } from '../../auth/gql-auth.guard'

@ObjectType()
class Quote {
  @Field(() => ID) id: string
  @Field() referenceNo: string
  @Field({ nullable: true }) title?: string
  @Field() status: string
  @Field(() => Float, { nullable: true }) totalValue?: number
  @Field() currency: string
  @Field({ nullable: true }) validUntil?: Date
  @Field({ nullable: true }) supplierId?: string
  @Field() orgId: string
  @Field() createdAt: Date
}

@Resolver(() => Quote)
export class QuotesResolver {
  constructor(private readonly service: QuotesService) {}

  @Query(() => [Quote])
  @UseGuards(GqlAuthGuard)
  quotes(@Context() ctx: any, @Args('status', { nullable: true }) status?: string) {
    return this.service.findAll(ctx.req.user.orgId, status)
  }
}
