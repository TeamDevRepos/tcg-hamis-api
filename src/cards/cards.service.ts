import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Card } from './entities/card.entity';
import { Model } from 'mongoose';

@Injectable()
export class CardsService {
  constructor(
    @InjectModel(Card.name)
    private readonly cardModel: Model<Card>,
  ) {}

  async create(createCardDto: CreateCardDto) {
    try {
      const card = await this.cardModel.create(createCardDto);
      return card;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findAll() {
    return this.cardModel.find().exec();
  }

  async findOne(code: number) {
    const card = await this.cardModel.findOne({code}).exec();
    if (!card) throw new NotFoundException(`Card with ID ${code} not found`);
    return card;
  }

  async update(code: number, updateCardDto: UpdateCardDto) {
    const updateCard = await this.cardModel.findOneAndUpdate({code}, updateCardDto, { new: true }).exec();
    if (!updateCard) throw new NotFoundException(`Card with ID ${code} not found`);
    return updateCard;
  }

  async remove(code: number) {
    const deletedCard = await this.cardModel.findOneAndDelete({code}).exec();
    if (!deletedCard) throw new NotFoundException(`Card with ID ${code} not found`);
    return { mensaje: 'Post eliminado', deletedCard };
  }

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `Card exist in database ${JSON.stringify(error.keyValue)}`,
      );
    }
    console.log(error);
    throw new InternalServerErrorException('Check server error');
  }
}
