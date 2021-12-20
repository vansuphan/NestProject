import { IsIn, IsNotEmpty, IsString } from 'class-validator';
import { CategoriesProduct } from '../../product/enum-product.category';

export class CreateCategoryDto {
  @IsNotEmpty({ message: 'Tiêu đề không được để trống' })
  @IsString()
  title: string;

  @IsIn(
    [
      CategoriesProduct.ROOF_FOLDING,
      CategoriesProduct.EAVES,
      CategoriesProduct.OUTHOUSE,
      CategoriesProduct.OTHER,
    ],
    {
      message:
        'Loại mái xếp phải là 1 trong 4 loại: [Mái xếp, Mái hiên, Mái che hoặc Khác]',
    },
  )
  category: CategoriesProduct;

  @IsNotEmpty({ message: 'Mô tả không được để trống' })
  @IsString()
  description: string;

  @IsNotEmpty({ message: 'Hình ảnh không được để trống' })
  @IsString()
  image: string;
}
