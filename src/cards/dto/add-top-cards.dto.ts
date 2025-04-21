import { IsString, MinLength } from 'class-validator';

export class AddTopCardsDto {
  @IsString()
  @MinLength(1)
  cardCode: string;

  @IsString()
  @MinLength(1)
  boxId: string;
}
