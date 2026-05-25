import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { Contact } from './models/contact.model'
import { CreateContactInput } from './dto/create-contact.input'
import { ContactsService } from './contacts.service'
import { GqlAuthGuard } from '../../auth/gql-auth.guard'

@Resolver(() => Contact)
export class ContactsResolver {
  constructor(private readonly service: ContactsService) {}

  @Query(() => [Contact])
  @UseGuards(GqlAuthGuard)
  contacts(
    @Context() ctx: any,
    @Args('stage', { nullable: true }) stage?: string,
  ) {
    return this.service.findAll(ctx.req.user.orgId, stage)
  }

  @Query(() => Contact, { nullable: true })
  @UseGuards(GqlAuthGuard)
  contact(@Args('id') id: string, @Context() ctx: any) {
    return this.service.findOne(id, ctx.req.user.orgId)
  }

  @Mutation(() => Contact)
  @UseGuards(GqlAuthGuard)
  createContact(@Args('input') input: CreateContactInput, @Context() ctx: any) {
    return this.service.create(ctx.req.user.orgId, input)
  }
}
