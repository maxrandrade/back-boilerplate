import {
  CountOptions,
  EntityClass,
  EntityData,
  FilterQuery,
  FindOneOptions,
  FindOptions,
  RequiredEntityData,
} from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';

abstract class ResourceModel {
  public id: string;
}

@Injectable()
export abstract class BaseService<T extends ResourceModel> {
  protected abstract readonly Entity: EntityClass<T>;

  constructor(protected readonly em: EntityManager) {}

  public count(
    where?: FilterQuery<T>,
    options?: CountOptions<T>,
  ): Promise<number> {
    return this.repo.count(where, options);
  }

  public async find(
    where?: FilterQuery<T>,
    options?: FindOptions<T, any>,
  ): Promise<T[]> {
    return await this.repo.find(where, options);
  }

  async update(id: string, input: EntityData<T>): Promise<T> {
    const entity = await this.findOneByIdOrFail(id);

    const updated = this.repo.assign(entity, input as any);
    await this.em.persistAndFlush(updated);
    return updated as T;
  }

  public async delete(id: string): Promise<T> {
    const entity = await this.findOneById(id);
    await this.em.removeAndFlush(entity);
    return entity;
  }

  public async deleteMany(ids: string[]): Promise<T[]> {
    const entities = await this.find({
      id: {
        $in: ids,
      },
    } as any);
    await this.em.removeAndFlush(entities);
    return entities;
  }

  public async create(data: RequiredEntityData<T>) {
    const entity = this.repo.create(data);
    await this.em.persistAndFlush(entity);
    return entity;
  }

  public async createMany(createInputs: Array<RequiredEntityData<T>>) {
    const entities = createInputs.map((input) => this.repo.create(input));
    await this.em.persistAndFlush(entities);
    return entities;
  }

  public async findAll(options: FindOptions<T> = {}) {
    const entities = await this.repo.findAll(options as any);
    return entities;
  }

  public async findOneById<P extends string = never>(
    id: string,
    options?: FindOneOptions<T, P>,
  ) {
    return this.repo.findOne({ id } as any, options);
  }

  public async findOneByIdOrFail(id: string) {
    return this.repo.findOneOrFail({ id } as any);
  }

  protected get repo() {
    return this.em.getRepository<T>(this.Entity);
  }
}
