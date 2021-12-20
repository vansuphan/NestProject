import { IsArray, IsEnum, IsOptional, IsString } from "class-validator";
import { PortfolioEnum } from "../portfolio.enum";

export class UpdatePortfolioDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsEnum(PortfolioEnum)
  status: PortfolioEnum;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsArray()
  images: string[];

  @IsOptional()
  @IsString()
  content: string;

  @IsOptional()
  @IsString()
  link: string;
}
