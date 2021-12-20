import { BaseEntity, Column, Entity, PrimaryColumn, Unique } from 'typeorm';

@Entity()
export class Photo extends BaseEntity {
  constructor(id: string, publicId: string, url: string, thumbnail: string) {
    super();
    this.id = id;
    this.publicId = publicId;
    this.url = url;
    this.thumbnail = thumbnail;
  }

  @PrimaryColumn({ name: 'asset_id' })
  id: string;

  @Column({ name: 'public_id' })
  publicId: string;

  @Column()
  url: string;

  @Column()
  thumbnail: string;
}
