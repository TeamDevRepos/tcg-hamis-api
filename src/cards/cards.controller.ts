import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { AddCardsDto } from './dto/add-cards.dto';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  create(@Body() createCardDto: CreateCardDto) {
    return this.cardsService.create(createCardDto);
  }

  @Post('/add-cards')
  addCards(@Body() addCardsDto: AddCardsDto) {
    return this.cardsService.addCards(addCardsDto);
  }

  @Get()
  findAll() {
    return this.cardsService.findAll();
  }

  @Get(':code')
  findOne(@Param('code') code: string) {
    return this.cardsService.findOne(+code);
  }

  @Patch(':code')
  update(@Param('code') code: string, @Body() updateCardDto: UpdateCardDto) {
    return this.cardsService.update(+code, updateCardDto);
  }

  @Delete(':code')
  remove(@Param('code') code: string) {
    return this.cardsService.remove(+code);
  }
}
