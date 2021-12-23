import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BaseController } from '../../core/crud-base/base.controller';
import { Introduction } from './introduction.entity';
import { IntroductionService } from './introduction.service';
import { CorePaginateResult } from '../../../interfaces/pagination';
import { CreateIntroductionDto } from './dto/create-introduction.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('introduction')
export class IntroductionController extends BaseController<Introduction> {
  constructor(private readonly service: IntroductionService) {
    super(service);
  }

  @UseGuards(AuthGuard())
  @Post()
  async create(@Body() body: CreateIntroductionDto): Promise<Introduction> {
    return super.create(body);
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<Introduction> {
    return super.findById(id);
  }

  @Get()
  async findAll(
    @Param('page') page: number,
    @Param('limit') limit: number,
  ): Promise<CorePaginateResult<Introduction>> {
    return super.findAll(page, limit);
  }

  @UseGuards(AuthGuard())
  @Patch(':id')
  async update(
    @Body() updates: any,
    @Param('id') id: number,
  ): Promise<Introduction> {
    return super.update(updates, id);
  }

  @UseGuards(AuthGuard())
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return super.delete(id);
  }
}
