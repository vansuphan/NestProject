import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  signIn(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ id: number; accessToken: string }> {
    return this.authService.signIn(authCredentialsDto);
  }

  @UseGuards(AuthGuard())
  @Patch('/change-password/:id')
  changePassword(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) changePasswordDto: ChangePasswordDto,
  ): Promise<{ statusCode: number; message: string }> {
    return this.authService.changePassword(id, changePasswordDto);
  }
}
