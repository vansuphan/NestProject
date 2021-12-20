import { IsNotEmpty, IsString } from "class-validator";

export class CreateIntroductionDto {
  @IsString()
  @IsNotEmpty()
  content: string;
}
