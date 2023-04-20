import { IsNotEmpty } from 'class-validator';
import { Column } from 'typeorm';

export class CreateMenuDto {
  @IsNotEmpty({
    message: '父节点不能为空',
  })
  @Column({ comment: '父节点ID' })
  parentId: string;

  @IsNotEmpty({
    message: '排序不能为空',
  })
  @Column({ comment: '排序' })
  sort: number;

  @IsNotEmpty({
    message: '组件路径不能为空',
  })
  @Column({ comment: '组件路径' })
  path: string;

  @IsNotEmpty({
    message: '组件名不能为空',
  })
  @Column({ comment: '组件name' })
  componentName: string;

  @Column({ comment: '菜单icon' })
  icon: string;

  @IsNotEmpty({
    message: '菜单名不能为空',
  })
  @Column({ comment: '菜单名字' })
  name: string;

  @Column({ comment: 'Ip地址' })
  ip: string;

  @Column({ comment: '操作人姓名' })
  username: string;

  @Column({ comment: '操作人Id' })
  userId: string;
}
