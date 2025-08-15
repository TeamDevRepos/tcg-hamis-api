import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Deck } from './entities/deck.entity';
import { Model } from 'mongoose';
import { CreateDeckDto } from './dto/create-deck.dto';

@Injectable()
export class DeckService {
  constructor(@InjectModel(Deck.name) private deckModel: Model<Deck>) {}

  async create(createDeckDto: CreateDeckDto) {
    const createdDeck = new this.deckModel(createDeckDto);
    return createdDeck.save();
  }

  async findAll() {
    return this.deckModel
      .find()
      .populate({
        path: 'mainDeck.card',
        select: 'id rarity image_url frameType',
      })
      .populate({
        path: 'extraDeck.card',
        select: 'id rarity image_url frameType',
      })
      .populate({
        path: 'sideDeck.card',
        select: 'id rarity image_url frameType',
      })
      .exec();
  }

  async findOne(id: string) {
    const deck = await this.deckModel.findById(id);

    if (!deck) throw new NotFoundException(`Deck with ID ${id} not found`);

    return deck;
  }
}
