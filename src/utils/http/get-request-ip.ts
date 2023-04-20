import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import * as requestIp from 'request-ip';

// 获取客户端ip
export const IpAddress = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    if (req.clientIp) return req.clientIp;
    return requestIp.getClientIp(req);
  },
);
