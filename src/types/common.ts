// 数据库类型
type CharsetType = 'utf8mb4';
// 数据库配置
interface EnvConfigTypes {
  type: string;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  synchronize: boolean;
  logging: boolean;
  charset: CharsetType;
  cache: boolean;
  autoLoadEntities: boolean;
}
// 数据库环境的配置
export interface EnvConfig {
  dev: EnvConfigTypes;
  prod: EnvConfigTypes;
}

// 分页接口
export interface ListPageType {
  pageNo: string;
  pageSize: string;
}

// 基础接口
export interface FindIdType {
  id: bigint;
}
// 接口返回
export interface ResponseTypes {
  path: string;
  statusCode: number;
  data: string | Array<any> | any;
  msg: string;
  success: boolean;
  timestamp: string;
  clientIp: string;
}
