import { CorePaginateResult } from '../interfaces/pagination';
import { PaginatorOptions } from './interface/pagination.interface';

export interface IBaseService<T> {
  create(body: any): Promise<T>;

  findOne(id: number): Promise<T>;

  findAll(
    paginateOpts?: PaginatorOptions,
    query?: object,
  ): Promise<CorePaginateResult<T>>;

  update(id: number, updates: any): Promise<T>;

  delete(id: number);
}
