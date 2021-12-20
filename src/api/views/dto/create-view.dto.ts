import { Type } from "class-transformer";

export class CreateViewDto {
  @Type(() => Date)
  createdAt: string;
}
