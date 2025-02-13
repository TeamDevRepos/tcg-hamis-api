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
import { AddCardsDto } from './dto/add-cards.dto';
import axios, { AxiosInstance } from 'axios';

@Injectable()
export class CardsService {
  private readonly axios: AxiosInstance = axios;

  constructor(
    @InjectModel(Card.name)
    private readonly cardModel: Model<Card>,
  ) {}

  async findAll() {
    return this.cardModel.find().exec();
  }

  async findOne(code: number) {
    const card = await this.cardModel.findOne({ code }).exec();
    if (!card) throw new NotFoundException(`Card with ID ${code} not found`);
    return card;
  }

  async create(createCardDto: CreateCardDto) {
    try {
      const card = await this.cardModel.create(createCardDto);
      return card;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async addCards(addCardsDto: AddCardsDto) {
    const { cardCodes } = addCardsDto;

    try {
      const cards = await Promise.all(
        cardCodes.map(async (code) => {
          const { data } = await this.axios.get(
            `https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${code}`,
          );
          return {
            code: data.data[0].id,
            names: [data.data[0].name],
            descs: [data.data[0].desc],
            image_url: data.data[0].card_images[0].image_url,
          };
        }),
      );

      await this.cardModel.insertMany(cards);

      return cards;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async update(code: number, updateCardDto: UpdateCardDto) {
    const updateCard = await this.cardModel
      .findOneAndUpdate({ code }, updateCardDto, { new: true })
      .exec();
    if (!updateCard)
      throw new NotFoundException(`Card with ID ${code} not found`);
    return updateCard;
  }

  async remove(code: number) {
    const deletedCard = await this.cardModel.findOneAndDelete({ code }).exec();
    if (!deletedCard)
      throw new NotFoundException(`Card with ID ${code} not found`);
    return { mensaje: 'Card removed', deletedCard };
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
