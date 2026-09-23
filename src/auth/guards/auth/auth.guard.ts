import { Injectable } from '@nestjs/common';
import { AuthGuard as PassportAuthGuard } from '@nestjs/passport';

// بيستخدم الـ 'jwt' strategy اللي عرفناها في jwt.strategy.ts
@Injectable()
export class AuthGuard extends PassportAuthGuard('jwt') {}
