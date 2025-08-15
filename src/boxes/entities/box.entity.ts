import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Box extends Document {
  @Prop({ unique: true })
  name: string;

  @Prop()
  code: string;

  @Prop()
  image_url: string;

  @Prop({ default: 'main-box' })
  type: string;

  @Prop()
  date: string;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Card' }] })
  cards: MongooseSchema.Types.ObjectId[];

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Card' }] })
  topCards: MongooseSchema.Types.ObjectId[];
}

export const BoxSchema = SchemaFactory.createForClass(Box);
