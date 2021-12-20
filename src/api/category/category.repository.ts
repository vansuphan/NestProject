import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/category.dto';

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {
  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    const category = new Category(
      createCategoryDto.title,
      createCategoryDto.category,
      createCategoryDto.description,
      createCategoryDto.image,
    );
    try {
      await category.save();
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Category đã tồn tại');
      } else {
        console.log(error);
        throw new InternalServerErrorException();
      }
    }
    return category;
  }
}
