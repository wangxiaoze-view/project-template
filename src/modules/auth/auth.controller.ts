import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Req,
  Request,
} from '@nestjs/common';
import { ExtractJwt } from 'passport-jwt';
import { IpAddress } from 'src/utils/http/get-request-ip';
import { throwHttpException } from 'src/utils/http/response.interceptor';
import { Util } from 'src/utils/util';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create.auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('createAuth')
  async createAuth(
    @IpAddress() ip: string,
    @Request() request,
    @Body() auth: CreateAuthDto,
  ) {
    const getToken = ExtractJwt.fromAuthHeaderAsBearerToken()(request);
    const { username, userId } = await Util.verifyToken(getToken);
    auth.ip = ip;
    auth.username = username;
    auth.userId = userId;
    return await this.authService.createAuth(auth);
  }

  @Get('getAuth')
  async getAuth(@Req() req) {
    const { pageNo = '1', pageSize = '10' } = req.query;
    return await this.authService.getAuth(pageNo, pageSize);
  }

  @Get('getAuthAll')
  async getAuthAll() {
    return await this.authService.getAuthAll();
  }

  @Delete('deleteAuth')
  async deleteAuth(@Body() params: { ids: string[] }) {
    const { ids = [] } = params;
    ids.length == 0 && throwHttpException('ID不能为空');
    return await this.authService.deleteAuth(ids);
  }
}
