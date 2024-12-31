import { IsNotEmpty, IsString } from 'class-validator';

export class itemCategory {
  @IsNotEmpty()
  @IsString()
  category: string;
  
}
