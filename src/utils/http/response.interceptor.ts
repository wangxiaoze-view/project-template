import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, map, Observable, of, timeout } from 'rxjs';
import * as requestIp from 'request-ip';
import { LogsEntity } from 'src/modules/logs/logs.entity';
import { AppService } from 'src/modules/app/app.service';
import { LogoTypes } from 'src/enum/app';
import { Util } from '../util';
import { CreateLogsDto } from 'src/modules/logs/dto/create.logs.dto';
import { ResponseTypes } from 'src/types/common';

const getEnumStatus = (type = 'NORMAL') => {
  return Util.getEnumStatus(type, LogoTypes);
};
// 请求拦截
export class ResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> | Promise<Observable<any>> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();

    ctx.getResponse().status(200);

    const clientIp = requestIp.getClientIp(request);

    let content = '';
    const method = request.method.toLocaleLowerCase();
    if (['get', 'put'].includes(method)) {
      content = JSON.stringify(request.query);
    } else {
      content = JSON.stringify(request.body);
    }

    return next.handle().pipe(
      map((data) => {
        const { status, statusCode, statusZh } = getEnumStatus();
        AppService.setLogs({
          request,
          entity: LogsEntity,
          logParams: {
            content: `请求方式：${method}\n请求参数：${content}\n`,
            url: request._parsedUrl.href,
            type: status,
            typeCode: statusCode,
            typeZh: statusZh,
            ip: clientIp,
          } as CreateLogsDto,
        });

        return {
          path: request.url,
          statusCode: 0,
          data: data || null,
          msg: '请求成功',
          success: true,
          timestamp: new Date().toISOString(),
          clientIp,
        } as ResponseTypes;
      }),
      timeout(10000),
      catchError((err) => {
        let errMsg = err.message;

        if (err.response && Array.isArray(err.response.message)) {
          errMsg = err.response.message[0];
        }
        const { status, statusCode, statusZh } = getEnumStatus('ERROR');
        // 获取token 解密， 添加错误日志
        AppService.setLogs({
          request,
          entity: LogsEntity,
          logParams: {
            content: `请求方式：${method}\n请求参数：${content}\n错误日志：${errMsg}`,
            url: request._parsedUrl.href,
            type: status,
            typeCode: statusCode,
            typeZh: statusZh,
            ip: clientIp,
          } as CreateLogsDto,
        });

        return of({
          path: request.url,
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          data: errMsg,
          msg: '请求失败',
          success: false,
          timestamp: new Date().toISOString(),
          clientIp,
        } as ResponseTypes);
      }),
    );
  }
}

// 抛出报错
export const throwHttpException = (message = 'Error BAD_REQUEST') => {
  throw new HttpException(
    {
      message,
    },
    HttpStatus.BAD_REQUEST,
  );
};
