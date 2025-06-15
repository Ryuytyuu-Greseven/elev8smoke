import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminController } from './admin/admin.controller';
import { AdminService } from './admin/admin.service';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';
import { CategorySchema } from './schemas/Categories.schema';
import { ItemSchema } from './schemas/Items.schema';
import { UploadsService } from './uploads/uploads.service';
import { UserController } from './user/user.controller';
import { PromotionSchema } from './schemas/Promotions.schema';
import { UsersSchema } from './schemas/Users.schema';
import { OrderSchema } from './schemas/Orders.schema';

config();
@Module({
  imports: [
    MongooseModule.forRoot(process.env.CONNECTION),
    MongooseModule.forFeature([
      {
        name: 'Category',
        schema: CategorySchema,
      },
      {
        name: 'Item',
        schema: ItemSchema,
      },
      {
        name: 'Promotion',
        schema: PromotionSchema,
      },
      { name: 'User', schema: UsersSchema },
      { name: 'Order', schema: OrderSchema },
    ]),
  ],
  controllers: [AppController, AdminController, UserController],
  providers: [AppService, AdminService, UploadsService],
})
export class AppModule {}
