import { Controller, Delete, Get, Param, Post, Query, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FilesInterceptor } from '@nestjs/platform-express/multer';
import * as path from 'path';
import { fileConfig } from '../../config/file.config';
import { PaginationDto } from './../../core/dto/pagination.dto';
import { PaginatedPhotosResultDto } from './dto/paginated-photo.dto';
import { Photo } from './photo.entity';
import { PhotoService } from './photo.service';

@Controller('photos')
export class PhotoController {
  constructor(private photoService: PhotoService) {}

  // @UseGuards(AuthGuard())
  @Post()
  @UseInterceptors(FilesInterceptor('images', 10, fileConfig))
  async uploadImage(@UploadedFiles() images) {
    console.log(images.map((e: { path: string }) => path.join(e.path)));
    return await this.photoService.waterMark(
      images.map((e: { path: string }) => path.join(e.path)),
    );
  }

  @Get()
  getPhotos(
    @Query() paginationDto: PaginationDto,
  ): Promise<PaginatedPhotosResultDto> {
    paginationDto.page = Number(paginationDto.page);
    paginationDto.limit = Number(paginationDto.limit);

    return this.photoService.getPhotos({
      ...paginationDto,
      limit: paginationDto.limit,
    });
  }

  @Get('/:id')
  async getPhotoById(@Param('id') id: string): Promise<Photo> {
    return this.photoService.getPhotoById(id);
  }

  @UseGuards(AuthGuard())
  @Delete('/:id')
  async deletePhoto(@Param('id') id: string): Promise<void> {
    return this.photoService.deletePhoto(id);
  }
}
