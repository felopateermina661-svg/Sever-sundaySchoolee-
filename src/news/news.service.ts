import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNewsDto } from './dto/create-news.dto.js';
import { UpdateNewsDto } from './dto/update-news.dto.js';
import { News } from './entities/news.entity.js';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private readonly newsRepository: Repository<News>,
  ) {}

  async create(dto: CreateNewsDto): Promise<News> {
    const news = this.newsRepository.create(dto);
    return this.newsRepository.save(news);
  }

  async findAll(): Promise<News[]> {
    // الأحدث أولاً
    return this.newsRepository.find({ order: { createdAt: 'DESC' } });
  }

  async update(id: number, dto: UpdateNewsDto): Promise<News> {
    const news = await this.newsRepository.findOneBy({ id });
    if (!news) {
      throw new NotFoundException(`الخبر صاحب id ${id} مش موجود`);
    }
    Object.assign(news, dto);
    return this.newsRepository.save(news);
  }

  async updateImage(id: number, imageUrl: string): Promise<News> {
    const news = await this.newsRepository.findOneBy({ id });
    if (!news) {
      throw new NotFoundException(`الخبر صاحب id ${id} مش موجود`);
    }
    news.imageUrl = imageUrl;
    return this.newsRepository.save(news);
  }

  async remove(id: number): Promise<{ message: string }> {
    const news = await this.newsRepository.findOneBy({ id });
    if (!news) {
      throw new NotFoundException(`الخبر صاحب id ${id} مش موجود`);
    }
    await this.newsRepository.remove(news);
    return { message: `تم حذف الخبر صاحب id ${id}` };
  }
}
