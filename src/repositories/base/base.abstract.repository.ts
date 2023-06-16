import { BaseEntity } from "src/shared/base/base.entity";
import { BaseRepositoryInterface } from "./base.interface.repository";
import { FindAllResponse } from "src/types/common.type";
import { Model } from "mongoose";

export abstract class BaseRepository<T extends BaseEntity> implements BaseRepositoryInterface<T> {
  constructor(private readonly model: Model<T>) {
    this.model = model
  }
  async create(dto: T): Promise<T> {
    const createRecord = await this.model.create(dto)
    return createRecord.save();
  }
  async update(_id: string, dto: Partial<T>): Promise<T> {
    return await this.model.findOneAndUpdate(
      { id: _id, is_deleted: false },
      dto,
      { new: true }
    )
  }
  async delete(_id: string): Promise<boolean> {
    const deleteRecord = await this.model.findById(_id);
    if (!deleteRecord) {
      return false;
    }
    return !!(await this.model
      .findOneAndUpdate(
        { id: _id, is_deleted: false },
        { is_deleted: true },
      ).exec())
  }
  findById(_id: string, projection?: string): Promise<T> {
    throw new Error("Method not implemented.");
  }
  findOneByCondition(condition?: object, projection?: string): Promise<T> {
    throw new Error("Method not implemented.");
  }
  findAll(condition: object, options?: object): Promise<FindAllResponse<T>> {
    throw new Error("Method not implemented.");
  }

}