import { Module } from '@nestjs/common';
import { BoxesService } from './boxes.service';
import { BoxesController } from './boxes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Box, BoxSchema } from './entities/box.entity';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  controllers: [BoxesController],
  providers: [BoxesService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Box.name,
        schema: BoxSchema,
      },
    ]),
    CloudinaryModule,
  ],
  exports: [MongooseModule],
})
export class BoxesModule {}
