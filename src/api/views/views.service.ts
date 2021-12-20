import { HttpException, Injectable } from '@nestjs/common';

import { Views } from './views.entity';
import { BaseService } from '../../core/crud-base/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateViewDto } from './dto/create-view.dto';
import { ViewsInterface } from './interfaces/views.interface';

@Injectable()
export class ViewsService extends BaseService<Views> {
  constructor(
    @InjectRepository(Views) repository: Repository<Views>) {
    super(repository);
  }

  async create(body: CreateViewDto): Promise<Views> {
    body.createdAt = new Date().toLocaleDateString('vi-VN', {
      timeZone: 'Asia/Ho_Chi_Minh',
    });

    console.log(body.createdAt);
    return await super.create(body);
  }

  async count(): Promise<ViewsInterface> {
    try {
      const total = await this.repository.count();
      const dayTime = new Date().toLocaleDateString('vi-VN', {
        timeZone: 'Asia/Ho_Chi_Minh',
      });
      console.log(dayTime);
      const today = await this.repository.count({
        where: { createdAt: dayTime },
      });
      return { total, today };
    } catch (e) {
      console.log(e);
      throw new HttpException(e, e.status || 500);
    }
  }
}
