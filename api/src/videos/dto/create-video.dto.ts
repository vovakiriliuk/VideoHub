import { IsNumber, IsString, IsUrl, MinLength } from 'class-validator';

export class CreateVideoDto {
  @IsString()
  @MinLength(1)
  title!: string;

  @IsString()
  genre!: string;

  @IsString()
  name!: string;

  @IsNumber()
  year!: number;

  @IsString()
  @MinLength(10)
  description!: string;

  @IsString()
  @IsUrl()
  url!: string;
}
