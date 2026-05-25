import { InputType, Field, Float } from '@nestjs/graphql'
import { IsString, IsOptional, IsArray, IsNumber } from 'class-validator'

@InputType()
export class CreateShipmentInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  orderId?: string

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  carrier?: string

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  trackingNumber?: string

  @Field({ defaultValue: 'BOOKING' })
  @IsString()
  status: string

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  originCountry?: string

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  destCountry?: string

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  originPort?: string

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  destPort?: string

  @Field({ nullable: true })
  @IsOptional()
  etd?: Date

  @Field({ nullable: true })
  @IsOptional()
  eta?: Date

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  incoterm?: string

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  grossWeightKg?: number

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  cbm?: number

  @Field(() => [String], { defaultValue: [] })
  @IsArray()
  containers: string[]
}
