import { IsNotEmpty } from 'class-validator';
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { CategoriesProduct } from '../product/enum-product.category';

@Entity()
@Unique(['id', 'title'])
export class Category extends BaseEntity {
  constructor(
    title: string,
    category: CategoriesProduct,
    description: string,
    image: string,
  ) {
    super();
    this.title = title;
    this.category = category;
    this.description = description;
    this.image = image;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty({ message: 'Tiêu đề không được để trống' })
  @Column()
  title: string;

  @Column()
  category: CategoriesProduct;

  @IsNotEmpty({ message: 'Mô tả không được để trống' })
  @Column()
  description: string;

  @IsNotEmpty({ message: 'Hình ảnh không được để trống' })
  @Column()
  image: string;
}
