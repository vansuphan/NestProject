import { EntityRepository, Repository } from "typeorm";
import { Social } from "./social.entity";

@EntityRepository(Social)
export class SocialsRepository extends Repository<Social> {
}
