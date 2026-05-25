import { ObjectType, Field, ID, Float, Int } from '@nestjs/graphql'
import GraphQLJSON from 'graphql-type-json'

@ObjectType()
export class Fabric {
  @Field(() => ID)
  id: string

  @Field()
  supplierId: string

  @Field()
  sku: string

  @Field()
  name: string

  @Field({ nullable: true })
  description?: string

  @Field(() => GraphQLJSON, { nullable: true })
  composition?: object[]

  @Field(() => Float, { nullable: true })
  weightGsm?: number

  @Field(() => Float, { nullable: true })
  widthCm?: number

  @Field({ nullable: true })
  weaveType?: string

  @Field({ nullable: true })
  finish?: string

  @Field(() => [String])
  seasonality: string[]

  @Field(() => [String])
  colors: string[]

  @Field(() => Float, { nullable: true })
  pricePerMeter?: number

  @Field({ defaultValue: 'EUR' })
  currency: string

  @Field(() => Float, { nullable: true })
  moqMeters?: number

  @Field(() => Int, { nullable: true })
  leadTimeDays?: number

  @Field(() => Float, { nullable: true })
  stockMeters?: number

  @Field({ defaultValue: true })
  isActive: boolean

  @Field(() => [String])
  certifications: string[]

  @Field(() => [String])
  images: string[]

  @Field(() => Float, { nullable: true })
  sustainabilityScore?: number

  @Field()
  orgId: string

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date
}
