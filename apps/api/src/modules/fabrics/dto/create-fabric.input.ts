import { InputType, Field, Float, Int } from '@nestjs/graphql'
import { IsString, IsOptional, IsArray, IsNumber, IsBoolean } from 'class-validator'
import GraphQLJSON from 'graphql-type-json'

@InputType()
export class CreateFabricInput {
  @Field()
  @IsString()
  supplierId: string

  @Field()
  @IsString()
  sku: string

  @Field()
  @IsString()
  name: string

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string

  @Field(() => GraphQLJSON, { nullable: true })
  @IsOptional()
  composition?: object[]

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  weightGsm?: number

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  widthCm?: number

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  weaveType?: string

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  finish?: string

  @Field(() => [String], { defaultValue: [] })
  @IsArray()
  seasonality: string[]

  @Field(() => [String], { defaultValue: [] })
  @IsArray()
  colors: string[]

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  pricePerMeter?: number

  @Field({ defaultValue: 'EUR' })
  @IsString()
  currency: string

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  moqMeters?: number

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  leadTimeDays?: number

  @Field(() => [String], { defaultValue: [] })
  @IsArray()
  certifications: string[]
}
