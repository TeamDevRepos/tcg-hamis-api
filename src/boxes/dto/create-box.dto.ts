import { IsOptional, IsString, MinLength } from 'class-validator';

export class CreateBoxDto {
  @IsString()
  @MinLength(1)
  set_name: string;

  @IsString()
  @MinLength(1)
  set_code: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  set_image_url?: string;
  
  @IsOptional()
  @IsString()
  @MinLength(1)
  date?: string;
}
