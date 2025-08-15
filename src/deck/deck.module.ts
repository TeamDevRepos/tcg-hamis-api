import { Module } from '@nestjs/common';
import { DeckService } from './deck.service';
import { DeckController } from './deck.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Deck, DeckSchema } from './entities/deck.entity';

@Module({
  controllers: [DeckController],
  providers: [DeckService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Deck.name,
        schema: DeckSchema,
      },
    ]),
  ],
})
export class DeckModule {}
