import {
  IsArray,
  IsDateString,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
  IsNumber,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

class DeckCardDto {
  @IsMongoId()
  card: string;

  @IsNumber()
  @Min(1)
  count: number;
}

export class CreateDeckDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  placement?: string;

  @IsOptional()
  @IsString()
  player?: string;

  @IsOptional()
  @IsString()
  team?: string;

  @IsOptional()
  @IsDateString()
  date?: Date;

  @IsOptional()
  @IsString()
  format?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DeckCardDto)
  mainDeck: DeckCardDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DeckCardDto)
  extraDeck: DeckCardDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DeckCardDto)
  sideDeck: DeckCardDto[];

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}
