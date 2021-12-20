import {
  HttpCode,
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserRepository } from './user.repository';
import { JwtPayload } from './jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { ChangePasswordDto } from './dto/change-password.dto';
import * as bcrypt from 'bcryptjs';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.signup(authCredentialsDto);
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ id: number; accessToken: string }> {
    const user = await this.userRepository.validateUserPassword(
      authCredentialsDto,
    );

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const username = user.username;
    const id = user.id;
    const payload: JwtPayload = { username };

    const accessToken = this.jwtService.sign(payload);

    return { id, accessToken };
  }

  async changePassword(
    id: number,
    changePasswordDto: ChangePasswordDto,
  ): Promise<{ statusCode: number; message: string }> {
    const found = await this.userRepository.findOne(id);
    const user = new User();
    if (!found) {
      throw new NotFoundException(`Không tìm thấy người dùng này`);
    }

    if (
      (await bcrypt.hash(changePasswordDto.oldPassword, found.salt)) !==
      found.password
    ) {
      throw new HttpException('Mật khẩu cũ không khớp', 404);
    }

    found.password = await bcrypt.hash(
      changePasswordDto.newPassword,
      found.salt,
    );

    try {
      await found.save();
    } catch (err) {
      throw new HttpException('Đổi mật khẩu thất bại, vui lòng thử lại', 500);
    }
    return { statusCode: 200, message: 'Đổi mật khẩu thành công' };
  }
}
