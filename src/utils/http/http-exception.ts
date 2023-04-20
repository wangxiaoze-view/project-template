import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import * as requestIp from 'request-ip';
import { LogoTypes } from 'src/enum/app';
import { AppService } from 'src/modules/app/app.service';
import { CreateLogsDto } from 'src/modules/logs/dto/create.logs.dto';
import { LogsEntity } from 'src/modules/logs/logs.entity';
import { ResponseTypes } from 'src/types/common';
import { Util } from '../util';

@Catch(HttpException)

// 错误异常拦截
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const request = ctx.getRequest();
    const response = ctx.getResponse();
    const clientIp = requestIp.getClientIp(request);

    const htpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let message =
      exception.message ||
      exception.message['message'] ||
      exception.message['error'] ||
      null;

    message = message == 'Unauthorized' ? '鉴权失败' : message;

    const errorResponse: ResponseTypes = {
      path: request.url,
      statusCode: htpStatus,
      data: message,
      msg: '请求失败',
      success: false,
      timestamp: new Date().toISOString(),
      clientIp,
    };

    this.logger.error(
      ` \n\n「错误信息」: ${new Date().toISOString()} \n「请求方式」: ${
        request.method
      } \n「请求地址」: ${
        request.url
      } \n「请求参数」: \n「params」: ${JSON.stringify(
        request.params,
      )} \n「query」: ${JSON.stringify(
        request.query,
      )} \n「body」: ${JSON.stringify(request.body)}`,
      JSON.stringify(errorResponse) + '\n\n',
      'HttpExceptionFilter',
    );

    let content = '';
    const method = request.method.toLocaleLowerCase();
    if (['get', 'put'].includes(method)) {
      content = JSON.stringify(request.query);
    } else {
      content = JSON.stringify(request.body);
    }

    const { statusCode, status, statusZh } = Util.getEnumStatus(
      'ERROR',
      LogoTypes,
    );
    AppService.setLogs({
      request,
      entity: LogsEntity,
      logParams: {
        content: `请求方式：${method}\n请求参数：${content}\n错误日志：${message}`,
        url: request._parsedUrl.href,
        type: Number(status),
        typeCode: statusCode,
        typeZh: statusZh,
        ip: clientIp,
      } as CreateLogsDto,
    });

    response.status(201).send(errorResponse);
  }
}
