import { IsNotEmpty, Length, IsAlphanumeric } from 'class-validator';

export class CheckUserNamePass {
  @Length(4, 12, { message: '用户名4-12位' })
  @IsNotEmpty({
    message: '用户名不能为空',
  })
  @IsAlphanumeric('en-GB', {
    message: '用户名只能数字或者英文字母',
  })
  username: string;

  @Length(6, 12, { message: '密码6-12位' })
  @IsNotEmpty({
    message: '密码不能为空',
  })
  password: string;
}

export class CreateUserDto extends CheckUserNamePass {
  // 客户端ip
  ip?: string;
}
