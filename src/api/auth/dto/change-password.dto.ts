import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class ChangePasswordDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @IsNotEmpty({
    message: 'Password is require!',
  })
  oldPassword: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @IsNotEmpty({
    message: 'Password is require',
  })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password is not security',
  })
  newPassword: string;
}
