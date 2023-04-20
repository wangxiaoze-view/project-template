import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ExtractJwt } from 'passport-jwt';
import { Util } from '../../utils/util';
import defaultConfig from '../../config/config.defaule';
import { UsersEntity } from '../users/users.entity';

const { jwtOptions } = defaultConfig;
interface LogsType {
  request: any;
  entity: any;
  logParams: any;
}

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  static setLogs(options: LogsType) {
    const { request, entity, logParams = {} } = options;
    if (!request || !entity) return;

    const getToken = ExtractJwt.fromAuthHeaderAsBearerToken()(request);

    if (getToken) {
      Util.verifyToken(getToken).then((data) => {
        const { username = '', userId = '' } = data;
        entity.save({
          ...logParams,
          username,
          userId,
        });
      });
    }
  }

  // 获取登录的token
  static async getToken(user: UsersEntity) {
    const payload = { username: user.username, userId: user.id };
    return new JwtService().sign(payload, {
      secret: jwtOptions.secret,
      privateKey: jwtOptions.privateKey,
      expiresIn: jwtOptions.expiresIn,
    });
  }

  // 解密登录的token
  static async verifyToken(token: string) {
    return new JwtService().verify(token, {
      secret: jwtOptions.secret,
      publicKey: jwtOptions.privateKey,
    });
  }
}
