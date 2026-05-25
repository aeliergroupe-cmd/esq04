import { InputType, Field } from '@nestjs/graphql'
import { IsOptional, IsString } from 'class-validator'

@InputType()
export class AnalyticsFilterInput {
  @Field({ nullable: true })
  @IsOptional()
  from?: Date

  @Field({ nullable: true })
  @IsOptional()
  to?: Date

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  supplierId?: string

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  country?: string
}
