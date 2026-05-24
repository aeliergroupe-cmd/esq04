import { Resolver, Mutation, Args, ObjectType, Field } from '@nestjs/graphql'
import { AuthService } from './auth.service'

@ObjectType()
class AuthPayload {
  @Field()
  accessToken: string

  @Field()
  userId: string
}

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthPayload, { description: 'Register a new user and organization' })
  register(
    @Args('email') email: string,
    @Args('password') password: string,
    @Args('name') name: string,
    @Args('orgName') orgName: string,
  ) {
    return this.authService.register(email, password, name, orgName)
  }

  @Mutation(() => AuthPayload, { description: 'Login with email and password' })
  login(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    return this.authService.login(email, password)
  }
}
