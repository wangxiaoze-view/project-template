import { IS_DEV } from '../modules/app/app.module';
import { EnvConfig } from '../types/common';

export default (): EnvConfig => ({
  dev: {
    type: 'mysql',
    // 主机
    host: '127.0.0.1',
    // 端口
    port: 3306,
    // 数据库用户名
    username: 'admin',
    // 数据库密码
    password: '123456',
    // 数据库
    database: 'test_admin',
    // 自动建表 注意：线上部署的时候不要使用，有可能导致数据丢失
    synchronize: true,
    // 打印日志
    logging: !IS_DEV,
    // 字符集
    charset: 'utf8mb4',
    // 是否开启缓存
    cache: true,
    // 实体路径
    autoLoadEntities: true,
  },
  prod: {
    type: 'mysql',
    // 主机
    host: '127.0.0.1',
    // 端口
    port: 3306,
    // 数据库用户名
    username: 'admin',
    // 数据库密码
    password: '123456',
    // 数据库
    database: 'system_admin',
    // 自动建表 注意：线上部署的时候不要使用，有可能导致数据丢失
    synchronize: true,
    // 打印日志
    logging: false,
    // 字符集
    charset: 'utf8mb4',
    // 是否开启缓存
    cache: false,
    // 实体路径
    autoLoadEntities: true,
  },
});
