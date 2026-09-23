import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  ValidationPipe,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ChildrenService } from './children.service.js';
import { CreateChildDto } from './dto/create-child.dto.js';
import { UpdateChildDto } from './dto/update-child.dto.js';
import { childPhotoStorage, imageFileFilter } from './multer.config.js';

@Controller('children')
export class ChildrenController {
  constructor(private readonly childrenService: ChildrenService) {}

  @Post()
  create(@Body(ValidationPipe) createChildDto: CreateChildDto) {
    return this.childrenService.create(createChildDto);
  }

  @Get()
  findAll() {
    return this.childrenService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.childrenService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateChildDto: UpdateChildDto,
  ) {
    return this.childrenService.update(id, updateChildDto);
  }

  @Post(':id/photo')
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: childPhotoStorage,
      fileFilter: imageFileFilter,
    }),
  )
  uploadPhoto(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }), // 5MB أقصى حجم
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    const photoUrl = `/uploads/children-photos/${file.filename}`;
    return this.childrenService.updatePhoto(id, photoUrl);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.childrenService.remove(id);
  }
}
