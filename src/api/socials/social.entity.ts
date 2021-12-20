import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['name'])
export class Social extends BaseEntity {
  constructor(name: string, link: string, isShow?: boolean) {
    super();
    this.name = name;
    this.link = link;
    this.isShow = isShow;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: false, type: 'boolean' })
  isShow: boolean;

  @Column()
  link: string;
}
