import { Product } from '../product.entity';

export class PaginatedProductResultDto {
  data: Product[];
  page: number;
  limit: number;
  totalCount: number;
  isLastPage: boolean;
}
