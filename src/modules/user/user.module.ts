import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './graphql/user.resolver';

@Module({
  imports: [],
  controllers: [],
  providers: [UserService, UserResolver],
})
export class UserModule {}
