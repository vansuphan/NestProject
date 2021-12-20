import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Category } from './category.entity';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/category.dto';

@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @UseGuards(AuthGuard())
  @Post()
  createCategory(
    @Body(ValidationPipe) createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return this.categoryService.createCategory(createCategoryDto);
  }

  @Get()
  getCategories(): Promise<Category[]> {
    return this.categoryService.getCategories();
  }

  @Get('/:id')
  getCategoryById(@Param('id', ParseIntPipe) id: number): Promise<Category> {
    return this.categoryService.getCategoryById(id);
  }

  @UseGuards(AuthGuard())
  @Patch('/:id')
  updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe)
    category: {
      title?: string;
      description?: string;
      image?: string;
    },
  ): Promise<Category> {
    return this.categoryService.updateCategory(
      id,
      category.title,
      category.description,
      category.image,
    );
  }
}
