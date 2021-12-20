import { Column, Entity } from "typeorm";
import { CustomBaseEntity } from "../../core/crud-base/base.entity";

@Entity()
export class Views extends CustomBaseEntity {
  @Column()
  view: number;

  @Column()
  createdAt: string;
}
