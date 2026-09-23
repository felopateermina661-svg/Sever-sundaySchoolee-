import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ServantsService } from './servants.service.js';
import { CreateServantDto } from './dto/create-servant.dto.js';
import { UpdateServantDto } from './dto/update-servant.dto.js';

@Controller('servants')
export class ServantsController {
  constructor(private readonly servantsService: ServantsService) {}

  @Post()
  create(@Body() createServantDto: CreateServantDto) {
    return this.servantsService.create(createServantDto);
  }

  @Get()
  findAll() {
    return this.servantsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.servantsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServantDto: UpdateServantDto) {
    return this.servantsService.update(+id, updateServantDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.servantsService.remove(+id);
  }
}
