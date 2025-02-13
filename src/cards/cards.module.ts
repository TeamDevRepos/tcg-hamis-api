import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Card, CardSchema } from './entities/card.entity';
import { BoxesModule } from 'src/boxes/boxes.module';

@Module({
  controllers: [CardsController],
  providers: [CardsService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Card.name,
        schema: CardSchema
      }
    ]),
    BoxesModule
  ]
})
export class CardsModule {}
