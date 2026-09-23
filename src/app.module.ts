import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ChildrenModule } from './children/children.module.js';
import { AuthModule } from './auth/auth.module.js';
import { ServantsModule } from './servants/servants.module.js';
import { ClassesModule } from './classes/classes.module.js';
import { AttendanceModule } from './attendance/attendance.module.js';
import { DashboardModule } from './dashboard/dashboard.module.js';
import { UsersModule } from './users/users.module.js';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { NewsModule } from './news/news.module.js';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    ThrottlerModule.forRoot([
      {
        name: 'default',
        ttl: 60000,
        limit: 20,
      },
    ]),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: config.get('DB_PORT'),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_DATABASE'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),

    ChildrenModule,
    AuthModule,
    ServantsModule,
    ClassesModule,
    AttendanceModule,
    DashboardModule,
    UsersModule,
    NewsModule,
  ],

  controllers: [AppController],

  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
