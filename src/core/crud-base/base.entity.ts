import { BaseEntity, PrimaryGeneratedColumn } from "typeorm";

export class CustomBaseEntity extends BaseEntity{
  @PrimaryGeneratedColumn()
  public id: number;
}
