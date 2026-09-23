import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServantsService } from './servants.service.js';
import { ServantsController } from './servants.controller.js';
import { Servant } from './entities/servant.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Servant])],
  controllers: [ServantsController],
  providers: [ServantsService],
})
export class ServantsModule {}
