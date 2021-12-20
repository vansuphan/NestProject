import { HttpException, Injectable } from "@nestjs/common";
import { PaginatorOptions } from "./interface/pagination.interface";
import { CorePaginateResult } from "../interfaces/pagination";
import { Repository } from "typeorm";
import { CustomBaseEntity } from "./base.entity";
import { IBaseService } from "./ibase.service";

@Injectable()
export class BaseService<T extends CustomBaseEntity> implements IBaseService<T> {
  constructor(
    protected readonly repository: Repository<T>
  ) {
  }

  async create(body: any): Promise<T> {
    try {
      await this.repository.save(body);
      return body;
    } catch (e) {
      console.log(e);
      throw new HttpException(e, e.status || 500);
    }
  }

  async findOne(id: number): Promise<T> {
    try {
      const item = await this.repository.findOne(id);
      if (!item) {
        throw new HttpException("Not found", 404);
      }
      return item;
    } catch (e) {
      throw new HttpException(e, e.status || 500);
    }
  }

  async findAll(
    paginateOpts?: PaginatorOptions,
    query?: object
  ): Promise<CorePaginateResult<T>> {
    const total = await this.repository.count();
    try {
      if (paginateOpts && paginateOpts.limit && paginateOpts.page) {
        const skips = paginateOpts.limit * (paginateOpts.page - 1);
        paginateOpts.limit = +paginateOpts.limit;
        const [data, count] = await this.repository
          .findAndCount({
            skip: skips,
            take: paginateOpts.limit,
            where: query
          });
        return {
          total,
          statusCode: 201,
          isLastPage: paginateOpts.limit * paginateOpts.page > count,
          data: data
        };
      }
      const data = await this.repository.find();
      return { total, data };
    } catch (e) {
      throw new HttpException(e, e.status || 500);
    }
  }


  async update(id: number, updates: any): Promise<T> {
    try {
      await this.repository.update(id, updates);
      return await this.findOne(id);
    } catch (e) {
      throw new HttpException(e, e.status || 500);
    }
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  //Todo: lọc qua trường deleted để get item

  // async findOneBy(query: object): Promise<any> {
  //   try {
  //     const items = await this.repository
  //       .createQueryBuilder("product")
  //       .andWhere("(product.category LIKE :category)", {
  //         category: `%${paginationDto.category}%`
  //       })
  //       .orderBy("category", "DESC")
  //       .offset(skippedItems)
  //       .limit(paginationDto.limit)
  //       .getMany();
  //     if (!item) {
  //       throw new HttpException("Not found", 404);
  //     }
  //     return item;
  //   } catch (e) {
  //     throw new HttpException(e, e.status || 500);
  //   }
  // }

  //Todo: lọc qua trường deleted để get item

  // async findBy(
  //   query: object,
  //   paginateOpts?: PaginatorOptions,
  //   ...args: any[]
  // ): Promise<any> {
  //   try {
  //     if (paginateOpts && paginateOpts.limit && paginateOpts.page) {
  //       const skips = paginateOpts.limit * (paginateOpts.page - 1);
  //       return await this.model
  //         .find(query)
  //         .skip(skips)
  //         .limit(paginateOpts.limit)
  //         .exec();
  //     }
  //     return this.model.find().exec();
  //   } catch (e) {
  //     throw new HttpException(e, e.status || 500);
  //   }
  // }
}
