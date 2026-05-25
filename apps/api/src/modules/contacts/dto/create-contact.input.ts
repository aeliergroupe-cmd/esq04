import { InputType, Field } from '@nestjs/graphql'
import { IsString, IsOptional, IsArray, IsEmail } from 'class-validator'

@InputType()
export class CreateContactInput {
  @Field()
  @IsString()
  name: string

  @Field({ nullable: true })
  @IsOptional()
  @IsEmail()
  email?: string

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  phone?: string

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  title?: string

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  company?: string

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  country?: string

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  city?: string

  @Field({ defaultValue: 'LEAD' })
  @IsString()
  stage: string

  @Field(() => [String], { defaultValue: [] })
  @IsArray()
  tags: string[]

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  notes?: string

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  supplierId?: string
}
