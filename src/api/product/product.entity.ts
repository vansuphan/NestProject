import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { CategoriesProduct } from './enum-product.category';

@Entity()
@Unique(['title'])
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  titleCategory: string;

  @Column()
  category: CategoriesProduct;

  @Column('text', { array: true })
  images: string[];

  @Column()
  price: number;

  @Column()
  guarantee: number;

  @Column({ nullable: true })
  sold: number;

  @Column({ name: 'is_hot_deal', default: false, type: 'boolean' })
  isHotDeal: boolean;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  specifications: string;

  @Column({ name: 'actual_images', nullable: true })
  actualImages: string;

  @Column({ nullable: true })
  views: number;
}
