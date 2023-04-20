import {
  Controller,
  Post,
  Body,
  Request,
  Get,
  Req,
  Delete,
} from '@nestjs/common';
import { LogsService } from './logs.service';
import { IpAddress } from '../../utils/http/get-request-ip';
import { CreateLogsDto } from './dto/create.logs.dto';
import { ExtractJwt } from 'passport-jwt';
import { Util } from '../../utils/util';
import { LogoTypes } from 'src/enum/app';
import { throwHttpException } from 'src/utils/http/response.interceptor';

@Controller('log')
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  /**
   * @description 添加日志
   * @param ip {string}
   * @param request
   * @param error {CreateLogsDto}
   */
  @Post('createLog')
  async createLog(
    @IpAddress() ip: string,
    @Request() request,
    @Body() error: CreateLogsDto,
  ) {
    error.ip = ip;
    error.type = LogoTypes.ERROR;
    error.typeCode = LogoTypes.ERROR_CODE;
    error.typeZh = LogoTypes.ERROR_ZH;
    const getToken = ExtractJwt.fromAuthHeaderAsBearerToken()(request);
    const { username, userId } = await Util.verifyToken(getToken);
    return await this.logsService.createLog({
      ...error,
      username,
      userId,
    });
  }

  /**
   * @description 获取日志
   * @param req
   */
  @Get('getLogs')
  async getLogs(@Req() req) {
    const { pageNo = '1', pageSize = '10', type = '' } = req.query;

    let options: any = {};
    if (type != '') {
      options = {
        type: Number(type),
      };
    }
    return await this.logsService.getLogs(pageNo, pageSize, options);
  }

  /**
   * @description 删除日志
   * @param body
   */
  @Delete('deleteLogs')
  async deleteLogs(@Body() body: { ids: string[] }) {
    const { ids = [] } = body;
    ids.length == 0 && throwHttpException('ID不能为空');
    return await this.logsService.deleteLogs(ids);
  }
}
