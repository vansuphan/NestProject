import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "../auth/auth.module";
import { CategoryController } from "./category.controller";
import { CategoryRepository } from "./category.repository";
import { CategoryService } from "./category.service";

@Module({
  imports: [TypeOrmModule.forFeature([CategoryRepository]), AuthModule],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService]
})
export class CategoryModule {
}
