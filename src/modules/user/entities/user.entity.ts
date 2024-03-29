import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from 'src/modules/common/database/BaseEntity';

@Entity()
export class User extends BaseEntity {
  @Property()
  name: string;
}
