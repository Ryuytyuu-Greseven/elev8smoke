import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ItemDocument = HydratedDocument<Item>;

@Schema({ timestamps: true })
export class Item {
  @Prop()
  productname: string;

  @Prop()
  description: string;

  @Prop()
  brand: string;

  @Prop()
  origin: string;

  @Prop()
  shape: string;

  @Prop()
  length: number;

  @Prop()
  girth: number;

  @Prop()
  manufacturer: string;

  @Prop()
  wrapper: string;

  @Prop()
  binder: string;

  @Prop()
  filler: string;

  @Prop()
  price: number;

  @Prop()
  bprice: number;

  @Prop()
  qty: number;

  @Prop()
  puffs: number;

  @Prop()
  flavour: string;
  
  @Prop()
  capacity: number;
  
  @Prop()
  weight: number;

  @Prop({ ref: 'Category' })
  category: string;

  @Prop()
  imageUrl: string;

  @Prop()
  stock: number;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
