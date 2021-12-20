import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { SocialsController } from './socials.controller';
import { SocialsRepository } from './socials.repository';
import { SocialsService } from './socials.service';

@Module({
  imports: [TypeOrmModule.forFeature([SocialsRepository]), AuthModule],
  controllers: [SocialsController],
  providers: [SocialsService],
})
export class SocialsModule {}
