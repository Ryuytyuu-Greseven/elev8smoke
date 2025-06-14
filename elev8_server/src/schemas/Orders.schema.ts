import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OrderDocument = HydratedDocument<Order>;

class Item {
  @Prop()
  id: string;

  @Prop()
  price: number;

  @Prop()
  qty: number;
}

@Schema({ timestamps: true })
export class Order {
  @Prop()
  total: string;

  @Prop()
  mobileNumber: string;

  @Prop()
  items: Array<Item>;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
