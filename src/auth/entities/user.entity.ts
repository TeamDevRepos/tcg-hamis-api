import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  _id: string;

  @Prop()
  fullName: string;

  @Prop({ unique: true })
  userName: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop({ default: ['user'] })
  roles: string[];

  @Prop({ default: true })
  isActive: boolean;

  @Prop({
    default:
      'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/13714538-e319-4cce-9062-6941ce18525d/dim64ya-00fbd3f6-f07f-4ecd-9f91-e34a308d8421.png/v1/fill/w_894,h_894/blue_eyes_white_dragon__icon__by_nhociory_dim64ya-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTAyNCIsInBhdGgiOiJcL2ZcLzEzNzE0NTM4LWUzMTktNGNjZS05MDYyLTY5NDFjZTE4NTI1ZFwvZGltNjR5YS0wMGZiZDNmNi1mMDdmLTRlY2QtOWY5MS1lMzRhMzA4ZDg0MjEucG5nIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.DcnrDL0nH_D7qn1UjrwVVYUO0I0VHzJvQ1HFN36OPnc',
  })
  avatar_img: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
