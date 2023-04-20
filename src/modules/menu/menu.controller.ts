import { Body, Controller, Post, Get, Request } from '@nestjs/common';
import { ExtractJwt } from 'passport-jwt';
import { IpAddress } from 'src/utils/http/get-request-ip';
import { throwHttpException } from 'src/utils/http/response.interceptor';
import { Util } from 'src/utils/util';
import { CreateMenuDto } from './dto/create.menu.dto';
import { MenuService } from './menu.service';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post('createMenu')
  async createMenu(
    @IpAddress() ip: string,
    @Request() request,
    @Body() menu: CreateMenuDto,
  ) {
    const isUser = await this.menuService.getMenuName(Util.trim(menu.name));
    isUser && throwHttpException('菜单已存在');

    const getToken = ExtractJwt.fromAuthHeaderAsBearerToken()(request);
    const { username, userId } = await Util.verifyToken(getToken);
    menu.ip = ip;
    menu.username = username;
    menu.userId = userId;

    return await this.menuService.createUser(menu);
  }

  @Get('/getMenu')
  async getMenu() {
    return await this.menuService.getMenu();
  }
}
