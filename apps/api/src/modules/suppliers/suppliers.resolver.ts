import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { Supplier } from './models/supplier.model'
import { CreateSupplierInput } from './dto/create-supplier.input'
import { SuppliersService } from './suppliers.service'
import { GqlAuthGuard } from '../../auth/gql-auth.guard'

@Resolver(() => Supplier)
export class SuppliersResolver {
  constructor(private readonly suppliersService: SuppliersService) {}

  @Query(() => [Supplier], { description: 'List all suppliers for the current organization' })
  @UseGuards(GqlAuthGuard)
  suppliers(
    @Context() ctx: any,
    @Args('type', { nullable: true }) type?: string,
    @Args('tier', { nullable: true }) tier?: string,
    @Args('country', { nullable: true }) country?: string,
    @Args('search', { nullable: true }) search?: string,
  ) {
    return this.suppliersService.findAll(ctx.req.user.orgId, { type, tier, country, search })
  }

  @Query(() => Supplier, { nullable: true })
  @UseGuards(GqlAuthGuard)
  supplier(@Args('id') id: string, @Context() ctx: any) {
    return this.suppliersService.findOne(id, ctx.req.user.orgId)
  }

  @Mutation(() => Supplier)
  @UseGuards(GqlAuthGuard)
  createSupplier(@Args('input') input: CreateSupplierInput, @Context() ctx: any) {
    return this.suppliersService.create(ctx.req.user.orgId, input)
  }
}
