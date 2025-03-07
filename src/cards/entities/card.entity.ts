import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Card extends Document {

    @Prop({unique: true})
    code: number;

    @Prop({type: [String]})
    names: string[];

    @Prop({type: [String]})
    descs: string[];
    
    @Prop({default: 'N'})
    rarity?: string;

    @Prop()
    image_url: string;

    @Prop({default: false})
    topBoxCard: boolean;
}

export const CardSchema = SchemaFactory.createForClass(Card);