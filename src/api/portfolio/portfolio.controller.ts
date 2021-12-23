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
import { PortfolioService } from './portfolio.service';
import { BaseController } from '../../core/crud-base/base.controller';
import { Portfolio } from './portfolio.entity';
import { CorePaginateResult } from '../../../interfaces/pagination';
import { AuthGuard } from '@nestjs/passport';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';

@Controller('portfolios')
export class PortfolioController extends BaseController<Portfolio> {
  constructor(private readonly service: PortfolioService) {
    super(service);
  }

  @UseGuards(AuthGuard())
  @Post()
  async create(@Body() body: CreatePortfolioDto): Promise<Portfolio> {
    return super.create(body);
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<Portfolio> {
    return super.findById(id);
  }

  @Get()
  async findAll(
    @Param('page') page: number,
    @Param('limit') limit: number,
  ): Promise<CorePaginateResult<Portfolio>> {
    return super.findAll(page, limit);
  }

  @UseGuards(AuthGuard())
  @Patch(':id')
  async update(
    @Body() updates: UpdatePortfolioDto,
    @Param('id') id: number,
  ): Promise<Portfolio> {
    return super.update(updates, id);
  }

  @UseGuards(AuthGuard())
  @Delete('/:id')
  async delete(id: number): Promise<void> {
    return super.delete(id);
  }
}
