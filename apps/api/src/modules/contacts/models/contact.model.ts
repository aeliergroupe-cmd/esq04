import { ObjectType, Field, ID } from '@nestjs/graphql'

@ObjectType()
export class Contact {
  @Field(() => ID)
  id: string

  @Field()
  name: string

  @Field({ nullable: true })
  email?: string

  @Field({ nullable: true })
  phone?: string

  @Field({ nullable: true })
  title?: string

  @Field({ nullable: true })
  company?: string

  @Field({ nullable: true })
  country?: string

  @Field({ nullable: true })
  city?: string

  @Field()
  stage: string

  @Field(() => [String])
  tags: string[]

  @Field({ nullable: true })
  notes?: string

  @Field({ nullable: true })
  avatar?: string

  @Field({ nullable: true })
  lastContactedAt?: Date

  @Field({ nullable: true })
  supplierId?: string

  @Field()
  orgId: string

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date
}
