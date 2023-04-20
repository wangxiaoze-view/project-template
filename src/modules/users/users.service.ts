import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from './users.entity';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create.user.dto';
import { FilterUserSearch } from './dto/find.user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
  ) {}

  // 创建用户
  async createUser(user: CreateUserDto) {
    await this.usersRepository.save(user);
    return null;
  }

  // 根据用户id查询用户信息
  async getUserById(id: bigint) {
    return await this.usersRepository.findOneBy({ id });
  }

  async getUserByName(username: string) {
    return await this.usersRepository.findOneBy({ username });
  }

  // 查询所有用户分页查询
  async getUsers(pageNo: string, pageSize: string, params: FilterUserSearch) {
    const list = await this.usersRepository.find({
      skip: Number(pageSize) * (Number(pageNo) - 1),
      take: Number(pageSize),
      order: { createdTime: 'DESC' },
      where: params,
    });

    for (const usersEntity of list) {
      delete usersEntity.password;
    }

    const total = await this.usersRepository.count({
      where: params,
    });

    return {
      list,
      pageNo,
      pageSize,
      total,
    };
  }

  /**
   * @description 更新用户的状态
   * @param id { bigint}
   * @param status
   * @param code {string}
   * @param zh
   */
  async putUserStatus(id: bigint, status: number, code: string, zh: string) {
    return this.usersRepository.update(
      { id: id },
      {
        status: status,
        statusZh: code,
        statusCode: zh,
      },
    );
  }
}
