import { IsNotEmpty, IsString } from 'class-validator';

export class ItemIdDto {
  @IsNotEmpty()
  @IsString()
  itemId: string;
}
