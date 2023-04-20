export enum LogoTypes {
  NORMAL = 0,
  NORMAL_CODE = 'normal',
  NORMAL_ZH = '正常',

  ERROR = 1,
  ERROR_CODE = 'error',
  ERROR_ZH = '错误',
}

export enum UserStatus {
  NORMAL = 0,
  NORMAL_CODE = 'normal',
  NORMAL_ZH = '正常',

  FREEZE = 1,
  FREEZE_CODE = 'freeze',
  FREEZE_ZH = '冻结',

  STOP = 2,
  STOP_ZH = '停用',
  STOP_CODE = 'stop',

  DELETE = -1,
  DELETE_CODE = 'delete',
  DELETE_ZH = '删除',
}

// 全局管道
export enum AppGurdEnum {
  // 不需要token
  NOT_TOKEN = 'NotToken',
}
