import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassesService } from './classes.service.js';
import { ClassesController } from './classes.controller.js';
import { Class } from './entities/class.entity.js';
import { Servant } from '../servants/entities/servant.entity.js';
import { ChildrenModule } from '../children/children.module.js';

@Module({
  imports: [TypeOrmModule.forFeature([Class, Servant]), ChildrenModule],
  controllers: [ClassesController],
  providers: [ClassesService],
})
export class ClassesModule {}
