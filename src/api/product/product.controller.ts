import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './product.entity';
import { ProductService } from './product.service';
import { CreateProductPipe } from './pipes/create-product-validate.pipe';
import { PaginatedProductResultDto } from './dto/paginated-product.dto';
import { PaginationDto } from '../../core/dto/pagination.dto';
import { CategoriesProduct } from './enum-product.category';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @UseGuards(AuthGuard())
  @Post()
  @UsePipes(new CreateProductPipe(), ValidationPipe)
  async createProduct(
    @Body()
    createProductDto: CreateProductDto,
  ): Promise<Product> {
    return await this.productService.createProduct(createProductDto);
  }

  @Get()
  async getProducts(
    @Query(ValidationPipe) paginationDto: PaginationDto,
  ): Promise<PaginatedProductResultDto> {
    paginationDto.page = Number(paginationDto.page);
    paginationDto.limit = Number(paginationDto.limit);

    return await this.productService.getProducts({
      ...paginationDto,
      limit: paginationDto.limit,
    });
  }

  @Get('/:id')
  async getProductById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Product> {
    return await this.productService.getProductById(id);
  }

  @UseGuards(AuthGuard())
  @Patch('/:id')
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body(new CreateProductPipe(), ValidationPipe)
    product: {
      title?: string;
      category?: CategoriesProduct;
      images?: string[];
      price?: number;
      guarantee?: number;
      sold?: number;
      isHotDeal?: boolean;
      description?: string;
      specifications?: string;
      actualImages?: string;
      views?: number;
    },
  ): Promise<Product> {
    return await this.productService.updateProduct(
      id,
      product.title,
      product.images,
      product.category,
      product.price,
      product.guarantee,
      product.sold,
      product.isHotDeal,
      product.description,
      product.specifications,
      product.actualImages,
      product.views,
    );
  }
  //
  // @UseGuards(AuthGuard())
  // @Put("/:id")
  // sortProducts(@Param("id", ParseIntPipe) id: number) {
  //   return this.productService.sortProducts(id);
  // }

  @UseGuards(AuthGuard())
  @Delete('/:id')
  deleteProduct(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.productService.deleteProduct(id);
  }
}
