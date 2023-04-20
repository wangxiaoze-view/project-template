import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { LogsEntity } from './logs.entity';
import { CreateLogsDto } from './dto/create.logs.dto';
import { Repository } from 'typeorm';
import { SearchTypes } from './types';

@Injectable()
export class LogsService {
  constructor(
    @InjectRepository(LogsEntity)
    private logEntityRepository: Repository<LogsEntity>,
  ) {}

  async createLog(log: CreateLogsDto) {
    await this.logEntityRepository.save(log);
    return null;
  }

  async getLogs(pageNo: string, pageSize: string, params: SearchTypes) {
    const list = await this.logEntityRepository.find({
      skip: Number(pageSize) * (Number(pageNo) - 1),
      take: Number(pageSize),
      order: { createdTime: 'DESC' },
      where: params,
      select: [],
    });

    const total = await this.logEntityRepository.count({
      where: params,
    });

    return {
      list,
      pageNo,
      pageSize,
      total,
    };
  }

  async deleteLogs(ids: string[]) {
    return this.logEntityRepository.delete(ids);
  }
}
