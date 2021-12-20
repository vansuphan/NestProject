import {
  BadRequestException, ConflictException,
  Injectable, InternalServerErrorException,
  NotFoundException
} from "@nestjs/common";
import { ProductRepository } from "./product.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateProductDto } from "./dto/create-product.dto";
import { Product } from "./product.entity";
import { PaginatedProductResultDto } from "./dto/paginated-product.dto";
import { PaginationDto } from "../../core/dto/pagination.dto";
import { CategoriesProduct } from "./enum-product.category";
import { CategoryService } from "../category/category.service";

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductRepository)
    private readonly productRepository: ProductRepository,
    private readonly categoryService: CategoryService
  ) {
  }

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const product = new Product();
    product.title = createProductDto.title;
    product.titleCategory = createProductDto.titleCategory;
    product.category = createProductDto.category;
    product.images = createProductDto.images;
    product.price = createProductDto.price;
    product.guarantee = createProductDto.guarantee;
    product.sold = createProductDto.sold;
    product.isHotDeal = createProductDto.isHotDeal;
    product.description = createProductDto.description;
    product.actualImages = createProductDto.actualImages;
    product.specifications = createProductDto.specifications;
    product.views = createProductDto.views;


    try {
      await product.save();
      console.log(product);
    } catch (error) {
      if (error.code === "23505") {
        throw new ConflictException("Sản phẩm đã tồn tại");
      } else {
        throw new InternalServerErrorException({ message: error });
      }
    }

    return product;
  }

  async getProducts(
    paginationDto: PaginationDto
  ): Promise<PaginatedProductResultDto> {
    let products: Product[];
    let totalCount: number;
    let isLastPage: boolean;
    if (!paginationDto) {
      products = await this.productRepository
        .createQueryBuilder("product")
        .getMany();
    } else {
      const skippedItems = (paginationDto.page - 1) * paginationDto.limit;

      if (paginationDto.category) {
        totalCount = await this.productRepository
          .createQueryBuilder("product")
          .andWhere("(product.category LIKE :category)", {
            category: `%${paginationDto.category}%`
          }).getCount();
        isLastPage =
          paginationDto.page * paginationDto.limit >= totalCount;
        products = await this.productRepository
          .createQueryBuilder("product")
          .andWhere("(product.category LIKE :category)", {
            category: `%${paginationDto.category}%`
          })
          .orderBy("category", "DESC")
          .offset(skippedItems)
          .limit(paginationDto.limit)
          .getMany();
      } else if (paginationDto.search) {
        totalCount = await this.productRepository
          .createQueryBuilder("product")
          .andWhere("(product.title LIKE :search)", {
            search: `%${paginationDto.search}%`
          }).getCount();
        isLastPage =
          paginationDto.page * paginationDto.limit >= totalCount;
        products = await this.productRepository
          .createQueryBuilder("product")
          .andWhere("(product.title LIKE :search)", {
            search: `%${paginationDto.search}%`
          })
          .orderBy("title", "DESC")
          .offset(skippedItems)
          .limit(paginationDto.limit)
          .getMany();
      } else {
        totalCount = await this.productRepository.count();
        isLastPage =
          paginationDto.page * paginationDto.limit >= totalCount;
        products = await this.productRepository
          .createQueryBuilder()
          .orderBy("title", "DESC")
          .offset(skippedItems)
          .limit(paginationDto.limit)
          .getMany();
      }
    }

    return {
      totalCount,
      page: paginationDto.page,
      limit: paginationDto.limit,
      isLastPage,
      data: products
    };
  }

  async getProductById(id: number): Promise<Product> {
    const found = await this.productRepository.findOne(id);

    const titleCategory = await this.categoryService.getCategory(found.category);
    console.log(titleCategory)
    found.titleCategory = titleCategory.title;
    if (!found) {
      throw new NotFoundException(`Không tìm thấy sản phẩm này`);
    }

    return found;
  }

  async updateProduct(
    id: number,
    title?: string,
    images?: string[],
    category?: CategoriesProduct,
    price?: number,
    guarantee?: number,
    sold?: number,
    isHotDeal?: boolean,
    description?: string,
    specifications?: string,
    actualImages?: string,
    views?: number
  ): Promise<Product> {
    const getProduct = await this.getProductById(id);

    if (title) {
      getProduct.title = title;
    }
    if (images) {
      getProduct.images = images;
    }
    if (category) {
      getProduct.category = category;
    }
    if (price) {
      getProduct.price = price;
    }
    if (guarantee) {
      getProduct.guarantee = guarantee;
    }
    if (isHotDeal !== null) {
      getProduct.isHotDeal = isHotDeal;
    }
    if (sold) {
      getProduct.sold = sold;
    }
    if (description) {
      getProduct.description = description;
    }
    if (specifications) {
      getProduct.specifications = specifications;
    }
    if (actualImages) {
      getProduct.actualImages = actualImages;
    }
    if (views) {
      getProduct.views = views;
    }
    try {
      await getProduct.save();
    } catch (error) {
      throw new BadRequestException({ message: error.message });
    }

    return getProduct;
  }

  // async sortProducts(id: number): Promise<boolean> {
  //   try {
  //     const product = await this.getProductById(id);
  //     await this.deleteProduct(id);
  //     await this.createProduct(product);
  //   } catch (err) {
  //     throw err;
  //   }
  //   return true;
  // }

  async deleteProduct(id: number): Promise<void> {
    const result = await this.productRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Không tìm thấy sản phẩm này`);
    }
  }
}
