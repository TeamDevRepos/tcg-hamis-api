import { ArrayMinSize, IsArray, IsInt, IsPositive, IsString, Min, MinLength } from "class-validator";

export class CreateCardDto {

    @IsInt()
    @IsPositive()
    @Min(1)
    code: number;

    @IsArray()
    @IsString({each: true})
    @ArrayMinSize(1)
    names: string[];

    @IsArray()
    @IsString({each: true})
    @ArrayMinSize(1)
    descs: string[];

    @IsString()
    @MinLength(1)
    rarity?: string;

    @IsString()
    @MinLength(1)
    image_url: string;
}
