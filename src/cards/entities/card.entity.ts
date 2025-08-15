import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Card extends Document {
  @Prop({ unique: true })
  code: number;

  @Prop({ type: [String] })
  names: string[];

  @Prop({ type: [String] })
  descs: string[];

  @Prop()
  frameType: string;

  @Prop({ default: 'N' })
  rarity?: string;

  @Prop()
  image_url: string;

  @Prop({ type: String, ref: 'Box' })
  boxId: string;
}

export const CardSchema = SchemaFactory.createForClass(Card);
