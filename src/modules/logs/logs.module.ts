import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogsEntity } from './logs.entity';
import { LogsService } from './logs.service';
import { LogsController } from './logs.controller';
@Module({
  imports: [TypeOrmModule.forFeature([LogsEntity])],
  providers: [LogsService],
  controllers: [LogsController],
  // exports: [ErrorService],
})
export class LogsModule {}
