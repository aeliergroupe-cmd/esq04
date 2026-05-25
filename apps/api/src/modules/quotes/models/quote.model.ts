import { ObjectType, Field, ID, Float } from '@nestjs/graphql'

@ObjectType()
export class QuoteItem {
  @Field(() => ID)
  id: string

  @Field()
  quoteId: string

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
}

@ObjectType()
export class Quote {
  @Field(() => ID)
  id: string

  @Field()
  referenceNo: string

  @Field()
  supplierId: string

  @Field({ nullable: true })
  contactId?: string

  @Field()
  status: string

  @Field({ nullable: true })
  validUntil?: Date

  @Field(() => Float, { nullable: true })
  totalValue?: number

  @Field({ defaultValue: 'USD' })
  currency: string

  @Field({ nullable: true })
  notes?: string

  @Field(() => [QuoteItem])
  items: QuoteItem[]

  @Field()
  orgId: string

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date
}
