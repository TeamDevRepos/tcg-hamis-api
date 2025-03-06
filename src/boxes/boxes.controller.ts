import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BoxesService } from './boxes.service';
import { CreateBoxDto } from './dto/create-box.dto';
import { UpdateBoxDto } from './dto/update-box.dto';
import { ParseMongoIdPipe } from '../common/pipes';

@Controller('boxes')
export class BoxesController {
  constructor(private readonly boxesService: BoxesService) {}

  @Post()
  create(@Body() createBoxDto: CreateBoxDto) {
    return this.boxesService.create(createBoxDto);
  }

  @Get()
  findAll() {
    return this.boxesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id',ParseMongoIdPipe) id: string) {
    return this.boxesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseMongoIdPipe) id: string, @Body() updateBoxDto: UpdateBoxDto) {
    return this.boxesService.update(id, updateBoxDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.boxesService.remove(id);
  }
}
