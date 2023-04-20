import { SetMetadata } from '@nestjs/common';
import { AppGurdEnum } from 'src/enum/app';

export const NotToken = () => SetMetadata(AppGurdEnum.NOT_TOKEN, true);
