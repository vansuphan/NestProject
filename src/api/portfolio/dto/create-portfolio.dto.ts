import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { PortfolioEnum } from '../portfolio.enum';

export class CreatePortfolioDto {
  @IsNotEmpty({ message: 'Name is require' })
  @IsString()
  title: string;

  // @IsNotEmpty({ message: "Trạng thái không được để trống" })
  @IsOptional()
  @IsEnum(PortfolioEnum)
  status: PortfolioEnum;

  @IsNotEmpty({ message: 'Description is require' })
  @IsString()
  description: string;

  @IsNotEmpty({ message: 'Image is require' })
  @IsArray()
  images: string[];

  @IsNotEmpty({ message: 'Content is require' })
  @IsString()
  content: string;

  @IsNotEmpty({ message: 'Link is require' })
  @IsString()
  link: string;
}
