import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

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
}

export const BoxSchema = SchemaFactory.createForClass(Box);