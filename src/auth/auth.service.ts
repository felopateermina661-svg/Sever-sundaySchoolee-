import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service.js';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existingUser = await this.usersService.findByEmail(dto.email);
    if (existingUser) {
      throw new ConflictException('الإيميل ده مسجل قبل كده');
    }

    // بنشفر الباسورد قبل ما نحفظه - رقم 10 هو "قوة" التشفير
    const passwordHash = await bcrypt.hash(dto.password, 10);

    const user = await this.usersService.create({
      fullName: dto.fullName,
      email: dto.email,
      passwordHash,
    });

    return this.generateToken(user.id, user.email, user.fullName);
  }

  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException('الإيميل أو الباسورد غلط');
    }

    // بنقارن الباسورد اللي بعته اليوزر بالمشفر المحفوظ
    const isPasswordValid = await bcrypt.compare(
      dto.password,
      user.passwordHash,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('الإيميل أو الباسورد غلط');
    }

    return this.generateToken(user.id, user.email, user.fullName);
  }

  private generateToken(userId: number, email: string, fullName: string) {
    const payload = { sub: userId, email };
    return {
      access_token: this.jwtService.sign(payload),
      user: { id: userId, email, fullName },
    };
  }
}
