import { Column, Entity, Unique } from "typeorm";
import { PortfolioEnum } from "./portfolio.enum";
import { CustomBaseEntity } from "../../core/crud-base/base.entity";

@Entity()
@Unique(["id"])
export class Portfolio extends CustomBaseEntity {
  @Column()
  title: string;

  @Column()
  status: PortfolioEnum;

  @Column("text", { array: true })
  images: string[];

  @Column()
  description: string;

  @Column()
  content: string;

  @Column()
  link: string;
}
