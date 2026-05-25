import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { Fabric } from './models/fabric.model'
import { CreateFabricInput } from './dto/create-fabric.input'
import { FabricsService } from './fabrics.service'
import { GqlAuthGuard } from '../../auth/gql-auth.guard'

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

  @Mutation(() => Fabric)
  @UseGuards(GqlAuthGuard)
  createFabric(@Args('input') input: CreateFabricInput, @Context() ctx: any) {
    return this.service.create(ctx.req.user.orgId, input)
  }
}
