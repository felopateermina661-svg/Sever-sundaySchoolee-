import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateChildDto } from './dto/create-child.dto.js';
import { UpdateChildDto } from './dto/update-child.dto.js';
import { Child } from './entities/child.entity.js';

@Injectable()
export class ChildrenService {
  constructor(
    @InjectRepository(Child)
    private readonly childrenRepository: Repository<Child>,
  ) {}

  async create(createChildDto: CreateChildDto): Promise<Child> {
    const newChild = this.childrenRepository.create(createChildDto);
    return this.childrenRepository.save(newChild);
  }

  async findAll(): Promise<Child[]> {
    return this.childrenRepository.find();
  }

  async findByClass(classId: number): Promise<Child[]> {
    return this.childrenRepository.find({ where: { classId } });
  }

  async findOne(id: number): Promise<Child> {
    const child = await this.childrenRepository.findOneBy({ id });
    if (!child) {
      throw new NotFoundException(`الطفل صاحب id ${id} مش موجود`);
    }
    return child;
  }

  async update(id: number, updateChildDto: UpdateChildDto): Promise<Child> {
    const child = await this.findOne(id); // هيرمي NotFoundException لو مش موجود
    Object.assign(child, updateChildDto);
    return this.childrenRepository.save(child);
  }

  async updatePhoto(id: number, photoUrl: string): Promise<Child> {
    const child = await this.findOne(id);
    child.photoUrl = photoUrl;
    return this.childrenRepository.save(child);
  }

  async remove(id: number): Promise<{ message: string }> {
    const child = await this.findOne(id); // هيرمي NotFoundException لو مش موجود
    await this.childrenRepository.remove(child);
    return { message: `تم حذف الطفل صاحب id ${id}` };
  }
}
