import { ObjectType, Field, ID, Float } from '@nestjs/graphql'
import GraphQLJSON from 'graphql-type-json'

@ObjectType()
export class OrderItem {
  @Field(() => ID)
  id: string

  @Field()
  orderId: string

  @Field({ nullable: true })
  fabricId?: string

  @Field()
  description: string

  @Field(() => Float)
  quantity: number

  @Field()
  unit: string

  @Field(() => Float, { nullable: true })
  unitPrice?: number

  @Field(() => Float, { nullable: true })
  totalPrice?: number

  @Field(() => GraphQLJSON, { nullable: true })
  specs?: object
}

@ObjectType()
export class Order {
  @Field(() => ID)
  id: string

  @Field()
  orderNo: string

  @Field()
  supplierId: string

  @Field({ nullable: true })
  contactId?: string

  @Field()
  status: string

  @Field(() => Float, { nullable: true })
  totalValue?: number

  @Field({ defaultValue: 'USD' })
  currency: string

  @Field({ nullable: true })
  deliveryDate?: Date

  @Field({ nullable: true })
  incoterm?: string

  @Field(() => [OrderItem])
  items: OrderItem[]

  @Field({ nullable: true })
  notes?: string

  @Field()
  orgId: string

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date
}
