import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  
  @Prop()
  fullName: string;


  @Prop({ unique: true })
  userName: string;
  
  @Prop({ unique: true })
  email: string;
  
  @Prop()
  password: string;
  
  @Prop({default: ['user']})
  roles: string[];

  @Prop({default: true})
  isActive: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);