import { InputType, Field, Float, Int } from '@nestjs/graphql'
import { IsString, IsOptional, IsArray, IsNumber, IsBoolean, IsEmail, IsUrl } from 'class-validator'

@InputType()
export class CreateSupplierInput {
  @Field()
  @IsString()
  name: string

  @Field()
  @IsString()
  country: string

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  city?: string

  @Field()
  @IsString()
  type: string

  @Field({ defaultValue: 'TIER2' })
  @IsString()
  tier: string

  @Field(() => [String], { defaultValue: [] })
  @IsArray()
  specialties: string[]

  @Field(() => [String], { defaultValue: [] })
  @IsArray()
  certifications: string[]

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  moqMeters?: number

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  leadTimeDays?: number

  @Field({ nullable: true })
  @IsOptional()
  @IsEmail()
  email?: string

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string
}
