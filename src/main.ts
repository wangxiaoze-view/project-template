import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { green, red } from 'colors';
import defaultConfig from './config/config.defaule';
import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './utils/http/http-exception';
import { ResponseInterceptor } from './utils/http/response.interceptor';
import rateLimit from 'express-rate-limit';

const { port, hostName } = defaultConfig;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 跨域
  app.enableCors({
    origin: '*',
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  // 设置前缀
  app.setGlobalPrefix('/api/v1');
  //
  // 全局注册拦截响应器
  app.useGlobalInterceptors(new ResponseInterceptor());

  // 全局注册异常过滤器
  app.useGlobalFilters(new HttpExceptionFilter(new Logger()));

  // 全局注册验证管道
  app.useGlobalPipes(new ValidationPipe());

  // 限制15分钟最大请求叔800
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 800,
    }),
  );

  // 监听服务
  await app.listen(port, hostName);
}
bootstrap()
  .then(() => {
    console.log('\n');
    console.log(green('------------------------------------------------'));
    console.log(green(`NEST_API 启动成功!  http://${hostName}:${port}`));
    console.log(green('------------------------------------------------'));
    console.log('\n');
  })
  .catch((err) => {
    console.log('\n');
    console.log(green('------------------------------------------------'));
    console.log(red(`NEST_API 启动失败! `));
    console.log(red(`[ERROR]: ${err}`));
    console.log(green('------------------------------------------------'));
    console.log('\n');
  });
