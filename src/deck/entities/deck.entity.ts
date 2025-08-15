import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Card } from 'src/cards/entities/card.entity';

@Schema()
export class Deck extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  placement: string;

  @Prop()
  player: string;

  @Prop()
  team: string;

  @Prop()
  date: Date;

  @Prop()
  format: string;

  @Prop({
    type: [
      {
        card: { type: MongooseSchema.Types.ObjectId, ref: 'Card' },
        count: Number,
      },
    ],
  })
  mainDeck: { card: MongooseSchema.Types.ObjectId; count: number }[];

  @Prop({
    type: [
      {
        card: { type: MongooseSchema.Types.ObjectId, ref: 'Card' },
        count: Number,
      },
    ],
  })
  extraDeck: { card: MongooseSchema.Types.ObjectId; count: number }[];

  @Prop({
    type: [
      {
        card: { type: MongooseSchema.Types.ObjectId, ref: 'Card' },
        count: Number,
      },
    ],
  })
  sideDeck: { card: MongooseSchema.Types.ObjectId; count: number }[];

  @Prop()
  image: string;

  @Prop({ type: [String] })
  tags: string[];
}

export const DeckSchema = SchemaFactory.createForClass(Deck);
