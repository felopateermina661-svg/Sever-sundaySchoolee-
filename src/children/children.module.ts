import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChildrenService } from './children.service.js';
import { ChildrenController } from './children.controller.js';
import { Child } from './entities/child.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Child])],
  controllers: [ChildrenController],
  providers: [ChildrenService],
  exports: [ChildrenService],
})
export class ChildrenModule {}
