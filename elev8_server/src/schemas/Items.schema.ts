import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ItemDocument = HydratedDocument<Item>;

@Schema({ timestamps: true })
export class Item {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  price: number;

  @Prop({ ref: 'Category' })
  category: string;

  @Prop()
  imageUrl: string;

  @Prop()
  stock: number;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
