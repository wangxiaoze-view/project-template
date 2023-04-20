import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuController } from './menu.controller';
import { MenuEntity } from './menu.entity';
import { MenuService } from './menu.service';

@Module({
  imports: [TypeOrmModule.forFeature([MenuEntity])],
  providers: [MenuService],
  exports: [MenuService],
  controllers: [MenuController],
})
export class MenuModule {}
