import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Param,
  ParseIntPipe,
  ValidationPipe,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { NewsService } from './news.service.js';
import { CreateNewsDto } from './dto/create-news.dto.js';
import { UpdateNewsDto } from './dto/update-news.dto.js';
import { newsPhotoStorage, newsImageFileFilter } from './news-multer.config.js';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post()
  create(@Body(ValidationPipe) dto: CreateNewsDto) {
    return this.newsService.create(dto);
  }

  @Get()
  findAll() {
    return this.newsService.findAll();
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) dto: UpdateNewsDto,
  ) {
    return this.newsService.update(id, dto);
  }

  @Post(':id/photo')
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: newsPhotoStorage,
      fileFilter: newsImageFileFilter,
    }),
  )
  uploadPhoto(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 })],
      }),
    )
    file: Express.Multer.File,
  ) {
    const imageUrl = `/uploads/news-photos/${file.filename}`;
    return this.newsService.updateImage(id, imageUrl);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.newsService.remove(id);
  }
}
