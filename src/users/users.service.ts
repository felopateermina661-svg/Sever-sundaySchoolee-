import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity.js';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }

  async findById(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async findOne(id: number): Promise<User | null> {
    return this.findById(id);
  }

  async create(data: Partial<User>): Promise<User> {
    const newUser = this.usersRepository.create(data);
    return this.usersRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async update(id: number, data: Partial<User>): Promise<User | null> {
    await this.usersRepository.update(id, data);
    return this.findById(id);
  }

  async remove(id: number): Promise<{ message: string }> {
    await this.usersRepository.delete(id);
    return { message: `تم حذف اليوزر صاحب id ${id}` };
  }
}
