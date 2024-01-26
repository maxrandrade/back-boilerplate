import { ObjectType, Field } from '@nestjs/graphql';
import { BaseType } from 'src/modules/common/graphql/BaseType';

@ObjectType()
export class UserType extends BaseType {
  @Field()
  name: string;
}
