import { Injectable } from "@nestjs/common";
import { Portfolio } from "./portfolio.entity";
import { BaseService } from "../../core/crud-base/base.service";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PaginatorOptions } from "../../core/crud-base/interface/pagination.interface";
import { CorePaginateResult } from "../../core/interfaces/pagination";
import { UpdatePortfolioDto } from "./dto/update-portfolio.dto";

@Injectable()
export class PortfolioService extends BaseService<Portfolio> {
  constructor(
    @InjectRepository(Portfolio) repository: Repository<Portfolio>) {
    super(repository);
  }

  async create(body: any): Promise<Portfolio> {
    return super.create(body);
  }

  async findOne(id: number): Promise<Portfolio> {
    return super.findOne(id);
  }

  async findAll(paginateOpts?: PaginatorOptions, query?: object): Promise<CorePaginateResult<Portfolio>> {
    return super.findAll(paginateOpts, query);
  }

  async update(id: number, updates: UpdatePortfolioDto): Promise<Portfolio> {
    return super.update(id, updates);
  }

  async delete(id: number): Promise<void> {
    return super.delete(id);
  }
}
