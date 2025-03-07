import { UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "../interfaces/jwt-payload.interface";
import { User } from "../entities";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";


export class JwtStrategy extends PassportStrategy( Strategy ) {

    constructor(

        @InjectModel(User.name)
        private readonly userModel: Model<User>,
        private readonly configService: ConfigService

    )
    {
        super({
            secretOrKey: configService.get('JWT_SECRET'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    async validate( payload: JwtPayload ): Promise<User> {

        const { id } = payload;

        const user = await this.userModel.findById({id});

        if (!user)
            throw new UnauthorizedException('Token not valid');
            
        if (!user.isActive) 
            throw new UnauthorizedException('User not active');

        delete user.password;
        return user;
    }

}