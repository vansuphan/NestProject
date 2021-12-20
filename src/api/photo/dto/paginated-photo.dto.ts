import { Photo } from '../photo.entity';

export class PaginatedPhotosResultDto {
  data: Photo[];
  page: number;
  limit: number;
  totalCount: number;
  isLastPage: boolean;
}
