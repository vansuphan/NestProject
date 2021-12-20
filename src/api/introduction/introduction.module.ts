import { Module } from '@nestjs/common';
import { IntroductionController } from './introduction.controller';
import { IntroductionService } from './introduction.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Introduction } from './introduction.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Introduction]), AuthModule],
  controllers: [IntroductionController],
  providers: [IntroductionService],
})
export class IntroductionModule {}
