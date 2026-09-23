import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateClassDto } from './dto/create-class.dto.js';
import { UpdateClassDto } from './dto/update-class.dto.js';
import { Class } from './entities/class.entity.js';
import { Servant } from '../servants/entities/servant.entity.js';
import { ChildrenService } from '../children/children.service.js';

@Injectable()
export class ClassesService {
  constructor(
    @InjectRepository(Class)
    private readonly classesRepository: Repository<Class>,
    @InjectRepository(Servant)
    private readonly servantsRepository: Repository<Servant>,
    private readonly childrenService: ChildrenService,
  ) {}

  async create(dto: CreateClassDto): Promise<Class> {
    const newClass = this.classesRepository.create({
      name: dto.name,
      leadServantId: dto.leadServantId,
    });

    if (dto.servantIds && dto.servantIds.length > 0) {
      newClass.servants = await this.servantsRepository.findBy({
        id: In(dto.servantIds),
      });
    }

    return this.classesRepository.save(newClass);
  }

  async findAll(): Promise<Class[]> {
    return this.classesRepository.find({ relations: { servants: true } });
  }

  async findOne(id: number): Promise<Class> {
    const classItem = await this.classesRepository.findOne({
      where: { id },
      relations: { servants: true },
    });
    if (!classItem) {
      throw new NotFoundException(`الفصل صاحب id ${id} مش موجود`);
    }
    return classItem;
  }

  // بيرجع كل الأطفال المسجلين في الفصل ده
  async findChildren(id: number) {
    await this.findOne(id); // يتأكد إن الفصل موجود الأول
    return this.childrenService.findByClass(id);
  }

  async update(id: number, dto: UpdateClassDto): Promise<Class> {
    const classItem = await this.findOne(id);

    if (dto.name !== undefined) classItem.name = dto.name;
    if (dto.leadServantId !== undefined) {
      classItem.leadServantId = dto.leadServantId;
    }
    if (dto.servantIds) {
      classItem.servants = await this.servantsRepository.findBy({
        id: In(dto.servantIds),
      });
    }

    return this.classesRepository.save(classItem);
  }

  async remove(id: number): Promise<{ message: string }> {
    const classItem = await this.findOne(id);
    await this.classesRepository.remove(classItem);
    return { message: `تم حذف الفصل صاحب id ${id}` };
  }
}
