import { ArrayMinSize, IsArray, IsOptional, IsString, MinLength } from 'class-validator';

export class AddCardsDto {
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  cardCodes: string[];

  @IsString()
  @MinLength(1)
  boxId: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  rarity?: string;
}
