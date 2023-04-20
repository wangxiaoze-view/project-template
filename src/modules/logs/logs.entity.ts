import { LogoTypes } from 'src/enum/app';
import { Util } from 'src/utils/util';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';

const { status, statusCode, statusZh } = Util.getEnumStatus(
  'NORMAL',
  LogoTypes,
);

@Entity({ name: 'logs_db' })
export class LogsEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment', {
    comment: '主键id',
    type: 'bigint',
  })
  id: bigint;

  @Column({ comment: '错误日志' })
  content: string;

  @Column({ comment: '请求地址' })
  url: string;

  @Column({ comment: '操作人姓名' })
  username: string;

  @Column({ comment: '操作人Id' })
  userId: string;

  @Column({ comment: '版本', default: 0 })
  version: number;

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

  @CreateDateColumn({
    comment: '创建时间',
  })
  createdTime: Date;

  @UpdateDateColumn({
    comment: '更新时间',
  })
  updateTime: Date;

  @Column({ comment: 'Ip地址', default: null })
  ip: string;
}
