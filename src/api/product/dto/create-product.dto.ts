import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsNumber,
  IsIn
} from "class-validator";
import { CategoriesProduct } from "../enum-product.category";

export class CreateProductDto {
  @IsNotEmpty({ message: "Tên sản phẩm không được để trống" })
  @IsString()
  title: string;

  titleCategory: string;

  @IsNotEmpty({ message: "Loại sản phẩm không được để trống" })
  @IsString()
  @IsIn([
    CategoriesProduct.ROOF_FOLDING,
    CategoriesProduct.EAVES,
    CategoriesProduct.OUTHOUSE,
    CategoriesProduct.OTHER
  ], { message: "Loại mái xếp phải là 1 trong 4 loại: [Mái xếp, Mái hiên, Mái che hoặc Khác]" })
  category: CategoriesProduct;

  @IsNotEmpty({ message: "Hình ảnh không được để trống" })
  images: string[];

  @IsNotEmpty({ message: "Giá thành không được để trống" })
  @IsNumber()
  price: number;

  @IsNotEmpty({ message: "Thời gian bảo hành không được để trống" })
  @IsNumber()
  guarantee: number;

  sold: number;

  @IsBoolean()
  isHotDeal: boolean;

  description: string;

  specifications: string;

  actualImages: string;

  views: number;
}
