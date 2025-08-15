import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DeckService } from './deck.service';
import { CreateDeckDto } from './dto/create-deck.dto';
import { ParseMongoIdPipe } from 'src/common/pipes';

@Controller('deck')
export class DeckController {
  constructor(private readonly deckService: DeckService) {}

  @Post()
  create(@Body() createDeckDto: CreateDeckDto) {
    return this.deckService.create(createDeckDto);
  }

  @Get()
  findAll() {
    return this.deckService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id', ParseMongoIdPipe) id: string) {
    return this.deckService.findOne(id);
  }
}
