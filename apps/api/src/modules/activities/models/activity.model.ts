import { ObjectType, Field, ID } from '@nestjs/graphql'

@ObjectType()
export class Activity {
  @Field(() => ID)
  id: string

  @Field()
  userId: string

  @Field()
  type: string

  @Field()
  entityType: string

  @Field()
  entityId: string

  @Field({ nullable: true })
  content?: string

  @Field({ nullable: true })
  dueDate?: Date

  @Field({ nullable: true })
  completedAt?: Date

  @Field({ nullable: true })
  actorName?: string

  @Field({ nullable: true })
  actorAvatar?: string

  @Field()
  orgId: string

  @Field()
  createdAt: Date
}
