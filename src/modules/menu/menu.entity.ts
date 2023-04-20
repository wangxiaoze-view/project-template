import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';

@Entity({ name: 'menu_db' })
export class MenuEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ comment: '主键ID' })
  id: bigint;

  @Column({ comment: '父节点ID' })
  parentId: string;

  @Column({ comment: '排序' })
  sort: number;

  @Column({ comment: '菜单地址' })
  url: string;

  @Column({ comment: '组件路径' })
  path: string;

  @Column({ comment: '组件name' })
  componentName: string;

  @Column({ comment: '菜单icon' })
  icon: string;

  @Column({ comment: '菜单名字' })
  name: string;

  @Column({ comment: '外部地址' })
  iframe: string;

  @Column({ comment: '备注' })
  remark: string;

  @Column({ comment: '创建人ID' })
  userId: string;

  @Column({ comment: '创建人名字' })
  userName: string;

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
