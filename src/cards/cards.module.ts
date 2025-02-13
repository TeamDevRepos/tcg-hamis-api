import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Card, CardSchema } from './entities/card.entity';

@Module({
  controllers: [CardsController],
  providers: [CardsService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Card.name,
        schema: CardSchema
      }
    ])
  ]
})
export class CardsModule {}
