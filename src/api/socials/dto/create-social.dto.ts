import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateSocialDto {
  @IsNotEmpty({ message: 'Tên mạng xã hội không được để trống' })
  @IsString({ message: 'Tên mạng xã hội phải là chuỗi' })
  name: string;

  @IsNotEmpty({ message: 'Liên kết mạng xã hội không được để trống' })
  @IsString({ message: 'liên kết phải là chuỗi' })
  link: string;

  @IsBoolean({ message: 'isShow phải là kiểu boolean' })
  isShow: boolean;
}
