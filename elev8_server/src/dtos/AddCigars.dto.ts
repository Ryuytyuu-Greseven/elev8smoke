import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class AddCigarsDto {
  @IsOptional()
  @IsString()
  itemId: string;

  @IsNotEmpty()
  @IsString()
  productname: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  brand: string;

  @IsOptional()
  @IsString()
  origin: string;

  @IsOptional()
  @IsString()
  shape: string;

  @IsOptional()
  @IsString()
  length: number;

  @IsOptional()
  @IsString()
  girth: string;

  @IsOptional()
  @IsString()
  manufacturer: string;

  @IsOptional()
  @IsString()
  wrapper: string;

  @IsOptional()
  @IsString()
  binder: string;
  
  @IsOptional()
  @IsString()
  filler: string;

  @IsOptional()
  @IsString()
  flavour: string;
  
  @IsOptional()
  @IsString()
  bprice: number;

  @IsOptional()
  @IsNumber()
  qty: number;

  @IsOptional()
  @IsNumber()
  puffs: number;

  @IsOptional()
  @IsString()
  capacity: string;

  @IsOptional()
  @IsNumber()
  weight: number;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsString()
  category: string;

  @IsNotEmpty()
  @IsString()
  imageUrl: string;

  @IsOptional()
  @IsNumber()
  stock: number;
}
