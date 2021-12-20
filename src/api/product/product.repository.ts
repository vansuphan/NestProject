import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository, EntityRepository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { GetProductsFilterDto } from './dto/get-products.dto';
import { Product } from './product.entity';
import { isConstructor } from '@nestjs/common/utils/shared.utils';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  async getProducts(filterData: GetProductsFilterDto): Promise<Product[]> {
    const { search } = filterData;
    const query = this.createQueryBuilder('product');

    if (search) {
      query.andWhere('(product.title LIKE :search)', { search: `%${search}%` });
    }

    const products = await query.getMany();
    return products;
  }
}
