import { BaseEntity } from 'src/shared/base/base.entity';
import { BaseRepositoryInterface } from './base.interface.repository';
import { FindAllResponse } from 'src/types/common.type';
import { FilterQuery, Model, QueryOptions } from 'mongoose';

export abstract class BaseRepository<T extends BaseEntity>
  implements BaseRepositoryInterface<T>
{
  protected constructor(private readonly model: Model<T>) {
    this.model = model;
  }
  async create(dto: T): Promise<T> {
    const createRecord = await this.model.create(dto);
    return createRecord.save();
  }
  async update(_id: string, dto: Partial<T>): Promise<T> {
    return this.model.findOneAndUpdate({ id: _id, is_deleted: false }, dto, {
      new: true,
    });
  }
  async delete(_id: string): Promise<boolean> {
    const deleteRecord = await this.model.findById(_id);
    if (!deleteRecord) {
      return false;
    }
    return !!(await this.model
      .findOneAndUpdate({ id: _id, is_deleted: false }, { is_deleted: true })
      .exec());
  }
  async findById(_id: string, projection?: string): Promise<T> {
    const record = await this.model.findById(_id);
    return record?.is_deleted ? null : record;
  }
  async findOneByCondition(
    condition?: object,
    projection?: string,
  ): Promise<T> {
    return await this.model
      .findOne({
        ...condition,
        is_deleted: false,
      })
      .exec();
  }
  async findAll(
    condition: FilterQuery<T>,
    options?: QueryOptions<T>,
  ): Promise<FindAllResponse<T>> {
    const [count, items] = await Promise.all([
      this.model.count({ ...condition, is_deleted: false }),
      this.model.find(
        { ...condition, is_deleted: false },
        options?.projection,
        options,
      ),
    ]);
    return { count, items };
  }
}
