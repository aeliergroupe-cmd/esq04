import { ObjectType, Field, ID, Float, Int } from '@nestjs/graphql'

@ObjectType()
export class Supplier {
  @Field(() => ID)
  id: string

  @Field()
  name: string

  @Field()
  country: string

  @Field({ nullable: true })
  city?: string

  @Field({ nullable: true })
  region?: string

  @Field()
  type: string

  @Field()
  tier: string

  @Field(() => [String])
  specialties: string[]

  @Field(() => [String])
  certifications: string[]

  @Field(() => Float, { nullable: true })
  moqMeters?: number

  @Field(() => Int, { nullable: true })
  leadTimeDays?: number

  @Field(() => Float, { nullable: true })
  priceRangeMin?: number

  @Field(() => Float, { nullable: true })
  priceRangeMax?: number

  @Field({ defaultValue: 'USD' })
  currency: string

  @Field(() => Float, { nullable: true })
  rating?: number

  @Field({ defaultValue: false })
  isVerified: boolean

  @Field({ defaultValue: true })
  isActive: boolean

  @Field({ nullable: true })
  website?: string

  @Field({ nullable: true })
  email?: string

  @Field({ nullable: true })
  phone?: string

  @Field({ nullable: true })
  profileImage?: string

  @Field({ nullable: true })
  description?: string

  @Field()
  orgId: string

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date
}
