import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { Quote } from './models/quote.model'
import { CreateQuoteInput } from './dto/create-quote.input'
import { QuotesService } from './quotes.service'
import { GqlAuthGuard } from '../../auth/gql-auth.guard'

@Resolver(() => Quote)
export class QuotesResolver {
  constructor(private readonly service: QuotesService) {}

  @Query(() => [Quote])
  @UseGuards(GqlAuthGuard)
  quotes(
    @Context() ctx: any,
    @Args('status', { nullable: true }) status?: string,
  ) {
    return this.service.findAll(ctx.req.user.orgId, status)
  }

  @Query(() => Quote, { nullable: true })
  @UseGuards(GqlAuthGuard)
  quote(@Args('id') id: string, @Context() ctx: any) {
    return this.service.findOne(id, ctx.req.user.orgId)
  }

  @Mutation(() => Quote)
  @UseGuards(GqlAuthGuard)
  createQuote(@Args('input') input: CreateQuoteInput, @Context() ctx: any) {
    return this.service.create(ctx.req.user.orgId, input)
  }

  @Mutation(() => Quote)
  @UseGuards(GqlAuthGuard)
  updateQuoteStatus(
    @Args('id') id: string,
    @Args('status') status: string,
    @Context() ctx: any,
  ) {
    return this.service.updateStatus(id, ctx.req.user.orgId, status)
  }
}
