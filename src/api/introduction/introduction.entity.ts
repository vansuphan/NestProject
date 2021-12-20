import { Column, Entity } from 'typeorm';
import { CustomBaseEntity } from '../../core/crud-base/base.entity';

@Entity()
export class Introduction extends CustomBaseEntity {
  @Column()
  content: string;
}
