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
    
    @Prop()
    rarity: string;

    @Prop()
    image_url: string;
}

export const CardSchema = SchemaFactory.createForClass(Card)