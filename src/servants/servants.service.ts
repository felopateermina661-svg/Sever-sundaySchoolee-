import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateServantDto } from './dto/create-servant.dto.js';
import { UpdateServantDto } from './dto/update-servant.dto.js';
import { Servant } from './entities/servant.entity.js';

@Injectable()
export class ServantsService {
  constructor(
    @InjectRepository(Servant)
    private readonly servantsRepository: Repository<Servant>,
  ) {}

  async create(dto: CreateServantDto): Promise<Servant> {
    const servant = this.servantsRepository.create(dto);
    return this.servantsRepository.save(servant);
  }

  async findAll(): Promise<Servant[]> {
    return this.servantsRepository.find({ order: { fullName: 'ASC' } });
  }

  async findOne(id: number): Promise<Servant> {
    const servant = await this.servantsRepository.findOneBy({ id });
    if (!servant) {
      throw new NotFoundException(`الخادم صاحب id ${id} مش موجود`);
    }
    return servant;
  }

  async update(id: number, dto: UpdateServantDto): Promise<Servant> {
    const servant = await this.findOne(id);
    Object.assign(servant, dto);
    return this.servantsRepository.save(servant);
  }

  async remove(id: number): Promise<{ message: string }> {
    const servant = await this.findOne(id);
    await this.servantsRepository.remove(servant);
    return { message: `تم حذف الخادم صاحب id ${id}` };
  }
}
