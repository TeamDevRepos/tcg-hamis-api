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
import { Model, Schema } from 'mongoose';
import { AddCardsDto } from './dto/add-cards.dto';
import axios, { AxiosInstance } from 'axios';
import { Box } from 'src/boxes/entities/box.entity';

@Injectable()
export class CardsService {
  private readonly axios: AxiosInstance = axios;

  constructor(
    @InjectModel(Card.name)
    private readonly cardModel: Model<Card>,
    @InjectModel(Box.name)
    private readonly boxModel: Model<Box>,
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
      const box = await this.boxModel.findById(createCardDto.boxId);
      if (!box) {
        throw new NotFoundException('Box not found');
      }

      const card = await this.cardModel.create(createCardDto);

      const cardId = card._id as Schema.Types.ObjectId;

      box.cards.push(cardId);
      await box.save();

      return card;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async addCards(addCardsDto: AddCardsDto) {
    const { cardCodes, boxId, rarity } = addCardsDto;

    try {
      const box = await this.boxModel.findById(boxId);
      if (!box) {
        throw new NotFoundException('Box not found');
      }

      const cardsData = await Promise.all(
        cardCodes.map(async (code) => {
          const { data } = await this.axios.get(
            `https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${code}`,
          );

          return {
            code: data.data[0].id,
            names: [data.data[0].name],
            descs: [data.data[0].desc],
            image_url: data.data[0].card_images[0].image_url,
            rarity
          };
        }),
      );

      const createdCards = await this.cardModel.insertMany(cardsData);

      const cardIds = createdCards.map(
        (card) => card._id as Schema.Types.ObjectId,
      );

      box.cards.push(...cardIds);
      await box.save();

      return createdCards;
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
