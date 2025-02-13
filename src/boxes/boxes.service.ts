import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateBoxDto } from './dto/create-box.dto';
import { UpdateBoxDto } from './dto/update-box.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Box } from './entities/box.entity';
import * as moment from 'moment';

@Injectable()
export class BoxesService {
  constructor(
    @InjectModel(Box.name)
    private readonly boxModel: Model<Box>,
  ) {}

  findAll() {
    return this.boxModel.find().populate('cards').exec();
  }

  async findOne(id: string) {
    const box = await this.boxModel.findById(id).exec();
    if (!box) throw new NotFoundException(`box with ID ${id} not found`);
    return box;
  }

  async create(createBoxDto: CreateBoxDto) {
    try {
      const box = await this.boxModel.create({
        ...createBoxDto,
        date: moment().format('l'),
      });

      return box;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async update(id: string, updateBoxDto: UpdateBoxDto) {
    const updateBox = await this.boxModel
      .findByIdAndUpdate(id, updateBoxDto, { new: true })
      .exec();
    if (!updateBox) throw new NotFoundException(`Box with ID ${id} not found`);
    return updateBox;
  }

  async remove(id: string) {
    const deletedBox = await this.boxModel.findByIdAndDelete(id).exec();
    if (!deletedBox) throw new NotFoundException(`Box with ID ${id} not found`);
    return { mensaje: 'Box removed', deletedBox };
  }

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `Box exist in database ${JSON.stringify(error.keyValue)}`,
      );
    }
    console.log(error);
    throw new InternalServerErrorException('Check server error');
  }
}
