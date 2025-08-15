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
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class BoxesService {
  constructor(
    @InjectModel(Box.name)
    private readonly boxModel: Model<Box>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  findAll() {
    return this.boxModel
      .find()
      .select('-date -set_code')
      .populate({
        path: 'topCards',
        select: 'code rarity image_url topBoxCard',
      })
      .sort({ _id: -1 })
      .exec();
  }

  async findOne(id: string) {
    const box = await this.boxModel
      .findById(id)
      .populate('cards')
      .sort({ _id: -1 })
      .exec();
    if (!box) throw new NotFoundException(`box with ID ${id} not found`);
    return box;
  }

  async create(createBoxDto: CreateBoxDto, file: Express.Multer.File) {
    let uploadedImage;

    try {
      uploadedImage = await this.cloudinaryService.uploadImage(file);

      const box = await this.boxModel.create({
        ...createBoxDto,
        image_url: uploadedImage.secure_url,
        date: moment().format('l'),
      });

      return box;
    } catch (error) {
      if (uploadedImage?.public_id) {
        await this.cloudinaryService.deleteImage(uploadedImage.public_id);
      }

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
