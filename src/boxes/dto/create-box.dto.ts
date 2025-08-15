import { IsOptional, IsString, MinLength } from 'class-validator';

export class CreateBoxDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsString()
  @MinLength(1)
  code: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  image_url?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  date?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  type: string;
}
