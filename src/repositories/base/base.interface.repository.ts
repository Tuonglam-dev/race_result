import { FindAllResponse } from 'src/types/common.type';

export interface BaseRepositoryInterface<T> {
  create(dto: T): Promise<T>;
  update(_id: string, dto: Partial<T>): Promise<T>;
  delete(_id: string): Promise<boolean>;
  findById(_id: string, projection?: string): Promise<T>;
  findOneByCondition(condition?: object, projection?: string): Promise<T>;
  findAll(condition: object, options?: object): Promise<FindAllResponse<T>>;
}
