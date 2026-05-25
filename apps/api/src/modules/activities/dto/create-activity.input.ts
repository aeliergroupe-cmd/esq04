import { InputType, Field } from '@nestjs/graphql'
import { IsString, IsOptional } from 'class-validator'

@InputType()
export class CreateActivityInput {
  @Field()
  @IsString()
  type: string

  @Field()
  @IsString()
  entityType: string

  @Field()
  @IsString()
  entityId: string

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  content?: string

  @Field({ nullable: true })
  @IsOptional()
  dueDate?: Date
}
