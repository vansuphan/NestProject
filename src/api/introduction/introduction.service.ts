import { Injectable } from '@nestjs/common';
import { BaseService } from '../../core/crud-base/base.service';
import { Introduction } from './introduction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateIntroductionDto } from './dto/create-introduction.dto';
import { PaginatorOptions } from '../../core/crud-base/interface/pagination.interface';
import { CorePaginateResult } from '../../../interfaces/pagination';

@Injectable()
export class IntroductionService extends BaseService<Introduction> {
  constructor(
    @InjectRepository(Introduction) repository: Repository<Introduction>,
  ) {
    super(repository);
  }

  async create(body: CreateIntroductionDto): Promise<Introduction> {
    return super.create(body);
  }

  async findOne(id: number): Promise<Introduction> {
    return super.findOne(id);
  }

  async findAll(
    paginateOpts?: PaginatorOptions,
    // eslint-disable-next-line @typescript-eslint/ban-types
    query?: object,
  ): Promise<CorePaginateResult<Introduction>> {
    return super.findAll(paginateOpts, query);
  }

  async update(id: number, updates: any): Promise<Introduction> {
    return super.update(id, updates);
  }

  async delete(id: number): Promise<void> {
    return super.delete(id);
  }
}
