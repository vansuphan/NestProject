import { Module } from "@nestjs/common";
import { ViewsService } from "./views.service";
import { ViewsController } from "./views.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Views } from "./views.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Views])],
  controllers: [ViewsController],
  providers: [ViewsService],
  exports: [ViewsService]
})
export class ViewsModule {
}
