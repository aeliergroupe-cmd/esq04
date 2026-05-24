import { Resolver, Query, Args, Context, ObjectType, Field, ID } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { ContactsService } from './contacts.service'
import { GqlAuthGuard } from '../../auth/gql-auth.guard'

@ObjectType()
class Contact {
  @Field(() => ID) id: string
  @Field() name: string
  @Field({ nullable: true }) email?: string
  @Field({ nullable: true }) phone?: string
  @Field({ nullable: true }) title?: string
  @Field({ nullable: true }) country?: string
  @Field() stage: string
  @Field(() => [String]) tags: string[]
  @Field() orgId: string
  @Field() createdAt: Date
}

@Resolver(() => Contact)
export class ContactsResolver {
  constructor(private readonly service: ContactsService) {}

  @Query(() => [Contact])
  @UseGuards(GqlAuthGuard)
  contacts(@Context() ctx: any, @Args('stage', { nullable: true }) stage?: string) {
    return this.service.findAll(ctx.req.user.orgId, stage)
  }
}
