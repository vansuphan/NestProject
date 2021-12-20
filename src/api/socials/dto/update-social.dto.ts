import { IsBoolean, IsOptional, IsString } from "class-validator";

export class UpdateSocialDto {
  @IsOptional()
  @IsString({ message: "Tên mạng xã hội phải là chuỗi" })
  name: string;

  @IsOptional()
  @IsString({ message: "liên kết phải là chuỗi" })
  link?: string;

  @IsOptional()
  @IsBoolean({ message: "isShow phải là kiểu boolean" })
  isShow?: boolean;
}
