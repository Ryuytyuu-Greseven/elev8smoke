import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PromotionsDocument = HydratedDocument<Promotion>;

@Schema({ timestamps: true })
export class Promotion {
  @Prop()
  imageUrl: string;

  @Prop()
  type: number;
}

export const PromotionSchema = SchemaFactory.createForClass(Promotion);
