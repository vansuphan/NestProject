import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { CreateSocialDto } from "./dto/create-social.dto";
import { Social } from "./social.entity";
import { SocialsRepository } from "./socials.repository";

@Injectable()
export class SocialsService {
  constructor(private socialRepository: SocialsRepository) {
  }

  async createSocial(createSocialDto: CreateSocialDto): Promise<Social> {
    const social = new Social(createSocialDto.name, createSocialDto.link);
    try {
      await social.save();
    } catch (error) {
      if (error.code === "23505") {
        throw new ConflictException("Mạng xã hội này đã tồn tại");
      } else {
        throw new InternalServerErrorException();
      }
    }
    return social;
  }

  async getSocials(): Promise<Social[]> {
    return await this.socialRepository.createQueryBuilder("social").getMany();
  }

  async getSocialByName(id: number): Promise<Social> {
    const found = await this.socialRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Không tìm thấy MXH này`);
    }

    return found;
  }

  async getSocialById(id: number): Promise<Social> {
    const found = await this.socialRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Không tìm thấy MXH này`);
    }

    return found;
  }

  async updateSocial(id: number, name?: string, link?: string, isShow?: boolean): Promise<Social> {
    const social = await this.getSocialById(id);

    if (name) {
      social.name = name;
    }
    if (isShow != null) {
      social.isShow = isShow;
    }
    if (link) {
      social.link = link;
    }

    try {
      await social.save();
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException({ message: err });
    }
    return social;
  }
}
