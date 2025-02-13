import { ArrayMinSize, IsArray, IsString } from "class-validator";

export class AddCardsDto {

    @IsArray()
    @IsString({each: true})
    @ArrayMinSize(1)
    cardCodes: string[];

}