import { InternalServerErrorException } from '@nestjs/common';
import { PaginationDto } from 'src/core/dto/pagination.dto';
import { EntityRepository, Repository } from 'typeorm';
import { PaginatedPhotosResultDto } from './dto/paginated-photo.dto';
import { Photo } from './photo.entity';

@EntityRepository(Photo)
export class PhotoRepository extends Repository<Photo> {
  async createPhoto(photos: Photo[]): Promise<Photo[]> {
    try {
      photos.map(async (e) => await e.save());
    } catch (err) {
      throw new InternalServerErrorException(
        'Upload ảnh lỗi. Vui lòng thử lại',
      );
    }
    return photos;
  }
}
