import { IsNotEmpty } from 'class-validator';
import { Column } from 'typeorm';

export class CreateAuthDto {
  @IsNotEmpty({
    message: '权限code不能为空',
  })
  @Column({ comment: '权限code' })
  code: string;

  @IsNotEmpty({
    message: '权限name不能为空',
  })
  @Column({ comment: '权限name' })
  name: string;

  @IsNotEmpty({
    message: '菜单ID不能为空',
  })
  @Column({ comment: '菜单ID' })
  menuId: string;

  @Column({ comment: 'Ip地址' })
  ip: string;

  @Column({ comment: '操作人姓名' })
  username: string;

  @Column({ comment: '操作人Id' })
  userId: string;
}
