import { Logger } from '@nestjs/common';
import { AppService } from 'src/modules/app/app.service';
import { UsersEntity } from '../modules/users/users.entity';

export class Util {
  static isNaN(val: number) {
    return isNaN(val);
  }

  static trim(str: string) {
    return str.trim().replace(/\s|\r|\n|\t/, '');
  }

  // 获取登录token
  static async getToken(user: UsersEntity) {
    return AppService.getToken(user);
  }

  // 解密token
  static async verifyToken(token: string) {
    return AppService.verifyToken(token);
  }

  // 获取枚举状态
  static getEnumStatus(type: string, enumClass) {
    type = type.toUpperCase();
    return {
      status: enumClass[type],
      statusCode: enumClass[`${type}_CODE`] || '',
      statusZh: enumClass[`${type}_ZH`] || '',
    };
  }

  static logger(message: string, context = 'nest_api_logger', type = 'debug') {
    message && new Logger(context)[type](message);
  }
}
