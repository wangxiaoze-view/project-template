import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';

@Entity({ name: 'auth_db' })
export class AuthEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ comment: '主键ID' })
  id: bigint;

  @Column({ comment: '权限code' })
  code: string;

  @Column({ comment: '权限name' })
  name: string;

  @Column({ comment: '操作人姓名' })
  username: string;

  @Column({ comment: '操作人Id' })
  userId: string;

  @Column({ comment: '版本', default: 0 })
  version: number;

  @Column({ comment: '菜单ID' })
  menuId: string;

  @CreateDateColumn({
    comment: '创建时间',
  })
  createdTime: Date;

  @UpdateDateColumn({
    comment: '更新时间',
  })
  updateTime: Date;

  @Column({ comment: 'Ip地址' })
  ip: string;
}
