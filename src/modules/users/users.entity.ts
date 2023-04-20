import { UserStatus } from 'src/enum/app';
import { Util } from 'src/utils/util';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

const { status, statusCode, statusZh } = Util.getEnumStatus(
  'NORMAL',
  UserStatus,
);
@Entity({ name: 'user_db' })
export class UsersEntity {
  @PrimaryGeneratedColumn('increment', {
    comment: '主键id',
    type: 'bigint',
  })
  id: bigint;

  @Column({ comment: '姓名', default: null })
  name: string;

  @Column({ comment: '手机号', default: null })
  phone: number;

  @Column({ comment: '电子邮箱', default: null })
  email: string;

  @Column({ comment: '头像', default: null })
  photo: string;

  @Column({ comment: '住址', default: null })
  address: string;

  @Column({ comment: '个人备注', default: null })
  remark: string;

  @Column({ comment: '用户名' })
  username: string;

  @Column({ comment: '密码' })
  password: string;

  @Column({
    comment:
      '用户状态 0: 正常(normal) 1: 冻结(freeze) 2: 停用(stop) -1: 删除(delete)',
    default: status,
  })
  status: number;

  @Column({
    comment:
      '用户状态中文, 0: 正常(normal) 1: 冻结(freeze) 2: 停用(stop) -1: 删除(delete)',
    default: statusZh,
  })
  statusZh: string;

  @Column({
    comment:
      '用户状态code 0: 正常(normal) 1: 冻结(freeze) 2: 停用(stop) -1: 删除(delete)',
    default: statusCode,
  })
  statusCode: string;

  @Column({ comment: '版本', default: 0 })
  version: number;

  @CreateDateColumn({
    comment: '创建时间',
  })
  createdTime: Date;

  @UpdateDateColumn({
    comment: '更新时间',
  })
  updateTime: Date;

  @Column({ comment: 'Ip地址', default: '' })
  ip: string;
}
