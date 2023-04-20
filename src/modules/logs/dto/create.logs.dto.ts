import { IsNotEmpty } from 'class-validator';
import { LogoTypes } from 'src/enum/app';
import { Util } from 'src/utils/util';
import { Column } from 'typeorm';

const { status, statusCode, statusZh } = Util.getEnumStatus(
  'NORMAL',
  LogoTypes,
);

export class CreateLogsDto {
  @IsNotEmpty({
    message: '日志不能为空',
  })
  @Column({ comment: '错误日志' })
  content: string;

  @IsNotEmpty({
    message: '请求地址不能为空',
  })
  @Column({ comment: '请求地址' })
  url: string;

  @Column({ comment: '操作人姓名' })
  username: string;

  @Column({ comment: '操作人Id' })
  userId: string;

  @Column({
    comment: '日志类型; 正常：0(normal) 异常：1(error)',
    default: status,
  })
  type: number;

  @Column({
    comment: '日志类型; 正常：0(normal) 异常：1(error)',
    default: statusCode,
  })
  typeCode: string;

  @Column({
    comment: '日志类型; 正常：0(normal) 异常：1(error)',
    default: statusZh,
  })
  typeZh: string;

  @Column({ comment: 'Ip地址' })
  ip: string;
}
