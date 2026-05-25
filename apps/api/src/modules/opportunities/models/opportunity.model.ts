import { ObjectType, Field, ID, Float, Int } from '@nestjs/graphql'

@ObjectType()
export class Opportunity {
  @Field(() => ID)
  id: string

  @Field()
  title: string

  @Field(() => Float, { nullable: true })
  value?: number

  @Field({ defaultValue: 'USD' })
  currency: string

  @Field()
  stage: string

  @Field(() => Int, { nullable: true })
  probability?: number

  @Field({ nullable: true })
  expectedCloseDate?: Date

  @Field({ nullable: true })
  contactId?: string

  @Field({ nullable: true })
  supplierId?: string

  @Field({ nullable: true })
  notes?: string

  @Field(() => [String])
  tags: string[]

  @Field()
  orgId: string

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date
}
