import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";

@Schema()
export class Box extends Document {

    @Prop({unique: true})
    set_name: string;

    @Prop()
    set_code: string;
    
    @Prop()
    set_image_url: string;

    @Prop()
    date: string;

    @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Card' }] })
    cards: MongooseSchema.Types.ObjectId[];
}

export const BoxSchema = SchemaFactory.createForClass(Box);