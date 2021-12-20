import { IsArray, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { PortfolioEnum } from "../portfolio.enum";

export class CreatePortfolioDto {
  @IsNotEmpty({ message: "Tên dự án không được để trống" })
  @IsString()
  title: string;

  // @IsNotEmpty({ message: "Trạng thái không được để trống" })
  @IsOptional()
  @IsEnum(PortfolioEnum)
  status: PortfolioEnum;

  @IsNotEmpty({ message: "Mô tả dự án không được để trống" })
  @IsString()
  description: string;

  @IsNotEmpty({ message: "Hình ảnh không được để trống" })
  @IsArray()
  images: string[];

  @IsNotEmpty({ message: "Nội dung dự án không được để trống" })
  @IsString()
  content: string;

  @IsNotEmpty({ message: "Link sản phẩm không được để trống" })
  @IsString()
  link: string;
}
