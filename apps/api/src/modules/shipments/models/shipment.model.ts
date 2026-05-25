import { ObjectType, Field, ID, Float, Int } from '@nestjs/graphql'
import GraphQLJSON from 'graphql-type-json'

@ObjectType()
export class Shipment {
  @Field(() => ID)
  id: string

  @Field({ nullable: true })
  orderId?: string

  @Field({ nullable: true })
  carrier?: string

  @Field({ nullable: true })
  trackingNumber?: string

  @Field()
  status: string

  @Field({ nullable: true })
  originCountry?: string

  @Field({ nullable: true })
  destCountry?: string

  @Field({ nullable: true })
  originPort?: string

  @Field({ nullable: true })
  destPort?: string

  @Field({ nullable: true })
  etd?: Date

  @Field({ nullable: true })
  eta?: Date

  @Field({ nullable: true })
  atd?: Date

  @Field({ nullable: true })
  ata?: Date

  @Field({ nullable: true })
  incoterm?: string

  @Field(() => Float, { nullable: true })
  grossWeightKg?: number

  @Field(() => Float, { nullable: true })
  cbm?: number

  @Field(() => [String])
  containers: string[]

  @Field(() => GraphQLJSON, { nullable: true })
  documents?: object[]

  @Field(() => GraphQLJSON, { nullable: true })
  events?: object[]

  @Field()
  orgId: string

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date
}
