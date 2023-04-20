import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { Util } from 'src/utils/util';

@Injectable()
export class TaskService {
  // * * * * * *：每一秒

  // 45 * * * * *：每分钟，在45秒

  // * 10 * * * *：每小时一次，十分钟开始

  // 0 */30 9-17 * * *：上午九时至下午五时，每三十分钟一次

  // 0 30 11 * * 1-5：星期一至星期五上午11:30
  @Cron('0 30 11 * * 1-5')
  handleCron() {
    Util.logger('该方法将在45秒标记处每分钟运行一次');
  }
}
