import { IsIn, IsNotEmpty, IsString } from 'class-validator';
import { CategoriesProduct } from '../../product/enum-product.category';

export class CreateCategoryDto {
  @IsNotEmpty({ message: 'Title is require' })
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
      message: 'Wrong',
    },
  )
  category: CategoriesProduct;

  @IsNotEmpty({ message: 'Description is require' })
  @IsString()
  description: string;

  @IsNotEmpty({ message: 'Image is require' })
  @IsString()
  image: string;
}
