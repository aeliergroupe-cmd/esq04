import { InputType, Field, Float, Int } from '@nestjs/graphql'
import { IsString, IsOptional, IsNumber, IsArray } from 'class-validator'

@InputType()
export class CreateOpportunityInput {
  @Field()
  @IsString()
  title: string

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  value?: number

  @Field({ defaultValue: 'USD' })
  @IsString()
  currency: string

  @Field({ defaultValue: 'DISCOVERY' })
  @IsString()
  stage: string

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  probability?: number

  @Field({ nullable: true })
  @IsOptional()
  expectedCloseDate?: Date

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  contactId?: string

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  supplierId?: string

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  notes?: string

  @Field(() => [String], { defaultValue: [] })
  @IsArray()
  tags: string[]
}
