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

  @Column('double', { default: 0 })
  price: number;

  @Column('double', { default: 0 })
  guarantee: number;

  @Column('double', { default: 0 })
  sold: number;

  @Column({ name: 'is_hot_deal', default: false, type: 'boolean' })
  isHotDeal: boolean;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  specifications: string;

  @Column({ name: 'actual_images', nullable: true })
  actualImages: string;

  @Column('double', { default: 0 })
  views: number;
}
