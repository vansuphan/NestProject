import { Module } from "@nestjs/common";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";
import { ProductRepository } from "./product.repository";
import { AuthModule } from "../auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryService } from "../category/category.service";
import { CategoryModule } from "../category/category.module";

@Module({
  controllers: [ProductController],
  imports: [TypeOrmModule.forFeature([ProductRepository]), AuthModule, CategoryModule],
  providers: [ProductService]
})
export class ProductModule {
}
