import { Body, Controller, Get, Param, Post, Query, ValidationPipe } from "@nestjs/common";

import { ViewsService } from "./views.service";
import { BaseController } from "../../core/crud-base/base.controller";
import { Views } from "./views.entity";
import { CreateViewDto } from "./dto/create-view.dto";
import { ViewsInterface } from "./interfaces/views.interface";

@Controller("views")
export class ViewsController extends BaseController<Views> {
  constructor(private readonly service: ViewsService) {
    super(service);
  }

  @Post()
  async create(@Body() body: CreateViewDto): Promise<Views> {
    return super.create(body);
  }

  @Get()
  async count(): Promise<ViewsInterface> {
    return await this.service.count();
  }
}
