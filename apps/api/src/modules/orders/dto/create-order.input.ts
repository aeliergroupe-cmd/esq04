import { InputType, Field, Float } from '@nestjs/graphql'
import { IsString, IsOptional, IsArray, IsNumber, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'
import GraphQLJSON from 'graphql-type-json'

@InputType()
export class OrderItemInput {
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

  @Field(() => GraphQLJSON, { nullable: true })
  @IsOptional()
  specs?: object
}

@InputType()
export class CreateOrderInput {
  @Field()
  @IsString()
  supplierId: string

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  contactId?: string

  @Field({ defaultValue: 'CONFIRMED' })
  @IsString()
  status: string

  @Field({ defaultValue: 'USD' })
  @IsString()
  currency: string

  @Field({ nullable: true })
  @IsOptional()
  deliveryDate?: Date

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  incoterm?: string

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  notes?: string

  @Field(() => [OrderItemInput], { defaultValue: [] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemInput)
  items: OrderItemInput[]
}
