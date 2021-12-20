import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(30)
  @IsNotEmpty({
    message: 'Username is require',
  })
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(30)
  @IsNotEmpty({
    message: 'Password is require',
  })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password is not security',
  })
  password: string;
}
