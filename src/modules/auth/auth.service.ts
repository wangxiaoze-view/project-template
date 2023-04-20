import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthEntity } from './auth.entity';
import { CreateAuthDto } from './dto/create.auth.dto';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthEntity)
    private authEntityRepository?: Repository<AuthEntity>,
  ) {}

  async createAuth(auth: CreateAuthDto) {
    await this.authEntityRepository.save(auth);
    return null;
  }

  async getAuth(pageNo: string, pageSize: string, params = {}) {
    const list = await this.authEntityRepository.find({
      skip: Number(pageSize) * (Number(pageNo) - 1),
      take: Number(pageSize),
      order: { createdTime: 'DESC' },
      where: params,
      select: [],
    });

    const total = await this.authEntityRepository.count({
      where: params,
    });

    return {
      list,
      pageNo,
      pageSize,
      total,
    };
  }

  async getAuthAll() {
    const list = await this.authEntityRepository.find({
      order: { createdTime: 'DESC' },
    });

    return list;
  }

  async deleteAuth(ids: string[]) {
    return this.authEntityRepository.delete(ids);
  }
}
