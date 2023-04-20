import { UsersService } from './users.service';
import { Controller, Get, Post, Req, Body, Put } from '@nestjs/common';
import { CheckUserNamePass, CreateUserDto } from './dto/create.user.dto';
import { FindIdType } from '../../types/common';
import { IpAddress } from '../../utils/http/get-request-ip';
import { PutUserStatusType } from './types';
import { Util } from '../../utils/util';
import { UserStatus } from 'src/enum/app';
import { NotToken } from 'src/guard/notToken/index.decorator';
import { throwHttpException } from 'src/utils/http/response.interceptor';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * @description 根据用户id获取用户
   * @param req{ query: FindIdType }
   */
  @Get('getUserById')
  async getUserById(@Req() req: { query: FindIdType }) {
    const { id = '' } = req.query;
    !id && throwHttpException('ID不能为空');
    return await this.usersService.getUserById(req.query.id);
  }

  /**
   * @description 创建用户
   * @param ip
   * @param user{CreateUserDto}
   */
  @Post('createUser')
  async createUser(@IpAddress() ip: string, @Body() user: CreateUserDto) {
    const { username } = user;
    const isUser = await this.usersService.getUserByName(username);
    isUser && throwHttpException('用户已存在');
    user.ip = ip;
    return await this.usersService.createUser(user);
  }

  /**
   * @description 根据条件查询分页
   * @param req
   */
  @Get('getUsers')
  async getUsers(@Req() req) {
    const { pageNo = '1', pageSize = '10', status = '' } = req.query;

    let options: any = {};
    if (status != '') {
      options = {
        status: Number(status),
      };
    }

    return await this.usersService.getUsers(pageNo, pageSize, options);
  }

  /**
   * @description 更新用户状态
   * @param req
   */
  @Put('putUserStatus')
  async putUserStatus(@Req() req: { query: PutUserStatusType }) {
    const { id = '', code = '' } = req.query;
    const codeUp = code.toUpperCase();

    !id && throwHttpException('ID不能为空');
    !Util.isNaN(UserStatus[codeUp]) && throwHttpException('code不存在');

    const { status, statusCode, statusZh } = Util.getEnumStatus(
      codeUp,
      UserStatus,
    );

    if (status == '') return null;
    return await this.usersService.putUserStatus(
      BigInt(id),
      Number(status),
      statusCode,
      statusZh,
    );
  }

  /**
   * @description 用户登录
   * @param loginUser {CheckUserNamePass}
   */
  @NotToken()
  @Post('login')
  async login(@Body() loginUser: CheckUserNamePass) {
    const { username = '', password = '' } = loginUser;
    !Util.trim(username) && throwHttpException('请输入用户名');
    !Util.trim(password) && throwHttpException('请输入密码');
    const isUser = await this.usersService.getUserByName(username);
    !isUser && throwHttpException('用户不存在');
    console.log(isUser.password, password);
    isUser.password !== password && throwHttpException('密码不正确');
    const token = await Util.getToken(isUser);
    return { token };
  }
}
