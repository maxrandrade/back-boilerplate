import { ObjectType, Field } from '@nestjs/graphql';
import { Nullable } from '../interfaces';

@ObjectType({
  isAbstract: true,
})
export class BaseType {
  @Field()
  id: string;

  @Field()
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt: Nullable<Date>;
}
