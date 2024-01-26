import { Query, Resolver } from '@nestjs/graphql';
import { UserType } from './types/user.type';

@Resolver(() => UserType)
export class UserResolver {
  @Query(() => String)
  async teste() {
    return 'hello';
  }
}
