import { BaseEntity } from '../../shared/base/base.entity';
import { BaseRepositoryInterface } from '../../repositories/base/base.interface.repository';
import { FindAllResponse } from '../../types/common.type';
import { BaseServiceInterface } from './base.interface.service';

export abstract class BaseServiceAbstract<T extends BaseEntity>
  implements BaseServiceInterface<T>
{
  constructor(private readonly repository: BaseServiceInterface<T>) {}
  async create(createDto: T | any): Promise<T> {
    return await this.repository.create(createDto);
  }

  async findAll(
    filter?: object,
    options?: object,
  ): Promise<FindAllResponse<T>> {
    return this.repository.findAll(filter, options);
  }

  async findById(id: string): Promise<T> {
    return await this.repository.findById(id);
  }

  async findOneByCondition(
    condition?: object,
    projection?: string,
  ): Promise<T> {
    return await this.repository.findOneByCondition(condition, projection);
  }

  async remove(id: string): Promise<boolean> {
    return await this.repository.remove(id);
  }

  async update(id: string, updateDto: Partial<T>): Promise<T> {
    return await this.repository.update(id, updateDto);
  }
}
