import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { CategoryRepository } from './category.repository';
import { CreateCategoryDto } from './dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryRepository)
    private categoryRepository: CategoryRepository,
  ) {}

  createCategory(createCategory: CreateCategoryDto): Promise<Category> {
    return this.categoryRepository.createCategory(createCategory);
  }

  async getCategories(): Promise<Category[]> {
    return await this.categoryRepository
      .createQueryBuilder('category')
      .getMany();
  }

  async getCategory(category: string): Promise<Category> {
    return await this.categoryRepository
      .createQueryBuilder('category')
      .andWhere('(category.category LIKE :search)', {
        search: `%${category}%`,
      })
      .getOne();
  }

  async getCategoryById(id: number): Promise<Category> {
    const found = await this.categoryRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Không tìm thấy mục này`);
    }

    return found;
  }

  async updateCategory(
    id: number,
    title?: string,
    description?: string,
    image?: string,
  ): Promise<Category> {
    const category = await this.getCategoryById(id);
    if (title) {
      category.title = title;
    }

    if (description) {
      category.description = description;
    }

    if (image) {
      category.image = image;
    }

    try {
      await category.save();
    } catch (error) {
      throw new InternalServerErrorException();
    }
    return category;
  }
}
