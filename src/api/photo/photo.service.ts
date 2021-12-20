import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as Jimp from 'jimp';
const cloudinary = require('cloudinary').v2;
import * as path from 'path';
import { Photo } from './photo.entity';
import { PhotoRepository } from './photo.repository';
import { PaginatedPhotosResultDto } from './dto/paginated-photo.dto';
import { PaginationDto } from 'src/core/dto/pagination.dto';

@Injectable()
export class PhotoService {
  constructor(
    @InjectRepository(PhotoRepository)
    private photoRepository: PhotoRepository,
  ) {
    cloudinary.config({
      cloud_name: 'dz5dbkozd',
      api_key: '344356364867953',
      api_secret: 'T7WPph5THmshsT2-NEAujACIPpM',
    });
  }
  async waterMark(imagesPath: string[]) {
    let logo = await Jimp.read('static/logo.png');
    logo = logo.resize(500, 500);

    var photos = new Array<Photo>();
    for (let i = 0; i < imagesPath.length; i++) {
      const imageName = `uploads/${Date.now()}_${i}_htp.jpg`;
      const image = await Jimp.read(imagesPath[i]);
      // const image = await Jimp.read();
      const xMargin = image.bitmap.width / 4;
      const yMargin = image.bitmap.height / 4;
      image.composite(logo, xMargin, yMargin, {
        mode: Jimp.BLEND_MULTIPLY,
        opacityDest: 1,
        opacitySource: 1,
      });
      await image.writeAsync(imageName);
      // if (fs.existsSync(path.join(imagePath))) {
      //   fs.rmSync(path.join(imagePath));
      // }

      const resultUpload = await this.uploadImageCloud(imageName);

      const photo = new Photo(
        resultUpload['asset_id'],
        resultUpload['public_id'],
        resultUpload['url'],
        resultUpload['eager'][0]['url'],
      );
      photos.push(photo);
    }
    return await this.photoRepository.createPhoto(photos);
  }

  async uploadImageCloud(pathPhoto): Promise<Jimp> {
    return await cloudinary.uploader.upload(
      path.join(pathPhoto),
      {
        eager: { width: 300, height: 200 },
      },
      function (error, result) {
        if (error) {
          console.error(error);
          throw new BadRequestException(error);
        }
        return result;
      },
    );
  }

  async getPhotos(
    paginationDto: PaginationDto,
  ): Promise<PaginatedPhotosResultDto> {
    const skippedItems = (paginationDto.page - 1) * paginationDto.limit;
    const totalCount = await this.photoRepository.count();
    var isLastPage =
      paginationDto.page * paginationDto.limit >= totalCount ? true : false;

    const photos = await this.photoRepository
      .createQueryBuilder()
      .orderBy('asset_id', 'DESC')
      .offset(skippedItems)
      .limit(paginationDto.limit)
      .getMany();

    return {
      totalCount,
      page: paginationDto.page,
      limit: paginationDto.limit,
      isLastPage,
      data: photos,
    };
  }

  async getPhotoById(id: string): Promise<Photo> {
    const found = await this.photoRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Not Found`);
    }

    return found;
  }

  async deletePhoto(id: string): Promise<void> {
    const photo = await this.getPhotoById(id);

    const result = await this.photoRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Not Found`);
    }

    cloudinary.api.delete_resources(photo.publicId);
  }
}

