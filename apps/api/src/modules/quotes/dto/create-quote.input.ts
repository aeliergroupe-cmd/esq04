import { InputType, Field, Float } from '@nestjs/graphql'
import { IsString, IsOptional, IsArray, IsNumber, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'

@InputType()
export class QuoteItemInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  fabricId?: string

  @Field()
  @IsString()
  description: string

  @Field(() => Float)
  @IsNumber()
  quantity: number

  @Field({ defaultValue: 'meters' })
  @IsString()
  unit: string

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  unitPrice?: number
}

@InputType()
export class CreateQuoteInput {
  @Field()
  @IsString()
  supplierId: string

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  contactId?: string

  @Field({ defaultValue: 'USD' })
  @IsString()
  currency: string

  @Field({ nullable: true })
  @IsOptional()
  validUntil?: Date

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  notes?: string

  @Field(() => [QuoteItemInput], { defaultValue: [] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuoteItemInput)
  items: QuoteItemInput[]
}
