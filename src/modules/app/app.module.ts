import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import defaultConfig from '../../config/config.defaule';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { LogsModule } from '../logs/logs.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../auth/jwt.stratagy';
import { MenuModule } from '../menu/menu.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskService } from './task.service';
import { JwtAuthGuard } from 'src/guard/notToken/index.guard';
const { sqlConfig, jwtOptions } = defaultConfig;

// 开发环境
export const IS_DEV = process.env.WZ_ENV !== 'prod';
@Module({
  imports: [
    // 模块
    AuthModule,
    UsersModule,
    LogsModule,
    MenuModule,

    // 定时任务
    ScheduleModule.forRoot(),
    //  TypeOrm模块
    TypeOrmModule.forRoot(sqlConfig),

    // 环境配置
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', IS_DEV ? '.env.dev' : '.env.prod'],
    }),

    // jwt 鉴权
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtOptions.secret,
      signOptions: { expiresIn: jwtOptions.expiresIn },
    }),
  ],

  controllers: [AppController],
  exports: [AppService],
  providers: [
    AppService,
    TaskService,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
