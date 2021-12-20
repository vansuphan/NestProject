import { Body, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { CorePaginateResult } from "../interfaces/pagination";
import { PaginatorOptions } from "./interface/pagination.interface";
import { CustomBaseEntity } from "./base.entity";
import { IBaseService } from "./ibase.service";
import { AuthGuard } from "@nestjs/passport";

export class BaseController<T extends CustomBaseEntity> {
  constructor(private readonly IBaseService: IBaseService<T>) {
  }

  @Post()
  async create(@Body() body: any): Promise<T> {
    return await this.IBaseService.create(body);
  }

  @Get(":id")
  async findById(@Param("id") id: number): Promise<T> {
    return await this.IBaseService.findOne(id);
  }

  @Get()
  async findAll(
    @Query("page") page: number,
    @Query("limit") limit: number
  ): Promise<CorePaginateResult<T>> {
    let options: PaginatorOptions = {
      page,
      limit
    };
    if (!page || !limit) {
      options = {};
    }
    return await this.IBaseService.findAll(options);
  }

  @Patch(":id")
  async update(
    @Body() updates: any,
    @Param("id") id: number
  ): Promise<T> {
    return await this.IBaseService.update(id, updates);
  }

  @Delete(":id")
  async delete(@Param("id") id: number): Promise<void> {
    return await this.IBaseService.delete(id);
  }
}
