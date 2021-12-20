import { Portfolio } from '../portfolio.entity';

export class PaginatedPortfolioResultDto {
  data: Portfolio[];
  page: number;
  limit: number;
  totalCount: number;
  isLastPage: boolean;
}
