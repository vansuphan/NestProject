import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateSocialDto } from './dto/create-social.dto';
import { Social } from './social.entity';
import { SocialsService } from './socials.service';
import { SocialsPipe } from './pipes/socials.pipe';

@Controller('socials')
export class SocialsController {
  constructor(private socialService: SocialsService) {}

  @UseGuards(AuthGuard())
  @Post()
  @UsePipes(new SocialsPipe(), ValidationPipe)
  async createSocial(
    @Body() createSocialDto: CreateSocialDto,
  ): Promise<Social> {
    return await this.socialService.createSocial(createSocialDto);
  }

  @Get()
  getSocials(): Promise<Social[]> {
    return this.socialService.getSocials();
  }

  @Get('/:id')
  getProductById(@Param('id', ParseIntPipe) id: number): Promise<Social> {
    return this.socialService.getSocialByName(id);
  }

  @UseGuards(AuthGuard())
  @Patch('/:id')
  async updateSocial(
    @Param('id', ParseIntPipe) id: number,
    @Body(new SocialsPipe(), ValidationPipe)
    social: {
      name?: string;
      link?: string;
      isShow?: boolean;
    },
  ): Promise<Social> {
    return await this.socialService.updateSocial(
      id,
      social?.name,
      social?.link,
      social?.isShow,
    );
  }
}
