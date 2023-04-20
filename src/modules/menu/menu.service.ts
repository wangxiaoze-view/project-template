import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMenuDto } from './dto/create.menu.dto';
import { MenuEntity } from './menu.entity';
@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(MenuEntity)
    private menuEntityRepository?: Repository<MenuEntity>,
  ) {}

  async createUser(menu: CreateMenuDto) {
    await this.menuEntityRepository.save(menu);
    return null;
  }

  async getMenuName(name: string) {
    return await this.menuEntityRepository.findOneBy({ name });
  }

  async getMenu() {
    const list = await this.menuEntityRepository.find();
    return list;
  }
}
