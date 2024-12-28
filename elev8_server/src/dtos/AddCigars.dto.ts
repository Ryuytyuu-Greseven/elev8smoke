import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class AddCigarsDto {
  @IsOptional()
  @IsString()
  itemId: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsString()
  category: string;

  @IsNotEmpty()
  @IsString()
  imageUrl: string;

  @IsNotEmpty()
  @IsNumber()
  stock: number;
}
