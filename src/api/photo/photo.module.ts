import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { PhotoController } from './photo.controller';
import { PhotoRepository } from './photo.repository';
import { PhotoService } from './photo.service';

@Module({
  imports: [TypeOrmModule.forFeature([PhotoRepository]), AuthModule],
  controllers: [PhotoController],
  providers: [PhotoService],
})
export class PhotoModule {}
