import { AddCategoryDto } from './../dtos/AddCategory.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { Model } from 'mongoose';
import { AddCigarsDto } from '../dtos/AddCigars.dto';
import { Category } from '../schemas/Categories.schema';
import { Item } from '../schemas/Items.schema';
import { Promotion } from '../schemas/Promotions.schema';
import { UploadsService } from '../uploads/uploads.service';
import { UploadImageDto } from '../dtos/UploadImage.dto';
import { User } from '../schemas/Users.schema';
import { SigninUserDto } from '../dtos/Signin.dto';
import { ItemIdDto } from '../dtos/ItemId.dto';
import { Order } from '../schemas/Orders.schema';
import { CheckoutOrder } from '../dtos/CheckoutOrder';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
    @InjectModel(Item.name) private itemsModel: Model<Item>,
    @InjectModel(Promotion.name) private promotionsModel: Model<Promotion>,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Order.name) private orderModel: Model<Order>,
    private readonly uploadsService: UploadsService,
  ) {}

  // add categories by admin
  async addCategories(request: Request, body: AddCategoryDto) {
    const result = {
      success: true,
      message: '',
      data: [],
    };

    try {
      console.log('Body:', body);
      await this.categoryModel.updateOne(
        { code: body.code },
        { name: body.name, code: body.code, description: body.description },
        { upsert: true },
      );
      console.log('Updated in DB');
      result.message = 'Categories updated successfully';
    } catch (error) {
      console.error('Error: ', error);
      result.success = false;
      result.message = 'Unable to process at the moment!';
    }

    return result;
  }

  // add cigars by admin
  async addCigars(request: Request, body: AddCigarsDto) {
    const result = {
      success: true,
      message: '',
      data: [],
    };

    try {
      console.log('Body:', body);

      if (!body.itemId) {
        await this.itemsModel.insertMany([
          {
            productname: body.productname,
            category: body.category,
            description: body.description,
            brand: body.brand,
            origin: body.origin,
            shape: body.shape,
            length: body.length,
            girth: body.girth,
            manufacturer: body.manufacturer,
            wrapper: body.wrapper,
            binder: body.binder,
            filler: body.filler,
            price: body.price,
            bprice: body.bprice,
            qty: body.qty,
            puffs: body.puffs,
            flavour: body.flavour,
            capacity: body.capacity,
            weight: body.weight,
            imageUrl: body.imageUrl,
          },
        ]);
      } else {
        await this.itemsModel.updateOne(
          { _id: body.itemId },
          {
            productname: body.productname,
            description: body.description,
            category: body.category,
            brand: body.brand,
            origin: body.origin,
            shape: body.shape,
            length: body.length,
            girth: body.girth,
            manufacturer: body.manufacturer,
            wrapper: body.wrapper,
            binder: body.binder,
            filler: body.filler,
            price: body.price,
            bprice: body.bprice,
            qty: body.qty,
            puffs: body.puffs,
            flavour: body.flavour,
            capacity: body.capacity,
            weight: body.weight,
            imageUrl: body.imageUrl,
          },
          { upsert: true },
        );
      }
      console.log('Updated in DB');
      result.message = 'Items updated successfully';
    } catch (error) {
      console.error('Error: ', error);
      result.success = false;
      result.message = 'Unable to process at the moment!';
    }

    return result;
  }

  async deleteItem(request: Request, body: ItemIdDto) {
    const result = {
      success: true,
      message: '',
      data: [],
    };

    try {
      console.log('Body:', body);

      if (body.itemId) {
        await this.itemsModel.deleteOne({ _id: body.itemId });
        result.success = true;
        result.message = 'Item deleted successfully';
      } else {
        result.success = false;
        result.message = 'Unable to delete as item not found!';
      }
      console.log('Updated in DB');
    } catch (error) {
      console.error('Error: ', error);
      result.success = false;
      result.message = 'Unable to process at the moment!';
    }

    return result;
  }

  async deletePromotion(request: Request, body: ItemIdDto) {
    const result = {
      success: true,
      message: '',
      data: [],
    };

    try {
      console.log('Body:', body);

      if (body.itemId) {
        await this.promotionsModel.deleteOne({ _id: body.itemId });
        result.success = true;
        result.message = 'Promotion deleted  successfully';
      } else {
        result.success = false;
        result.message = 'Unable to delete as promotion not found!';
      }
      console.log('Updated in DB');
    } catch (error) {
      console.error('Error: ', error);
      result.success = false;
      result.message = 'Unable to process at the moment!';
    }

    return result;
  }

  // fetch categories
  async fetchCategories() {
    const result = {
      success: true,
      message: '',
      data: [],
    };

    try {
      result.data = (await this.categoryModel.find()) as any;
      result.message = 'Categories fetched successfully';
    } catch (error) {
      console.error('Error: ', error);
      result.success = false;
      result.message = 'Unable to process at the moment!';
    }
    return result;
  }

  // fetch cigars
  async fetchCigars(body: any) {
    const result = {
      success: true,
      message: '',
      data: [],
    };
    let category;

    try {
      console.log('Body:', body);
      if (body.category) {
        category = body.category;
      } else {
        category = 'cigar';
      }
      result.data = (await this.itemsModel.find({ category: category })) as any;
      result.message = 'Items fetched successfully';
    } catch (error) {
      console.error('Error: ', error);
      result.success = false;
      result.message = 'Unable to process at the momement!';
    }
    return result;
  }

  async fetchSingleItem(body: any) {
    const result = {
      success: true,
      message: '',
      data: [],
    };

    const { itemId } = body;

    try {
      if (itemId) {
        result.data = (await this.itemsModel.find({ _id: body.itemId })) as any;
        result.message = 'Items fetched successfully';
      } else {
        result.success = false;
        result.message = 'Unable to process at the moment!';
      }
    } catch (error) {
      console.log('Error: ', error);
      result.success = false;
      result.message = 'Unable to process at the moment!';
    }
    return result;
  }

  async addPromotions(body: UploadImageDto) {
    const result = {
      success: true,
      message: '',
      data: [],
      newFileName: '',
      url: '',
    };

    try {
      const filePath = body.fileName;
      const { url, newFileName } = await this.uploadsService.getPresignedUrl(
        body.fileName,
        body.fileType,
      );

      await new this.promotionsModel({ type: 1, imageUrl: newFileName }).save();
      result.message = 'Promotion added successfully';
      result.url = url;
      result.newFileName = newFileName;
    } catch (error) {
      console.log('Error  ', error);
      result.message = 'Promotion added successfully';
      result.success = false;
    }

    return result;
  }

  // fetch cigars
  async fetchPromotions() {
    const result = {
      success: true,
      message: '',
      data: [],
    };

    try {
      result.data = (await this.promotionsModel.find()) as any;
      result.message = 'Promotins fetched successfully';
    } catch (error) {
      console.error('Error: ', error);
      result.success = false;
      result.message = 'Unable to process at the momement!';
    }
    return result;
  }

  async loginUser(body: SigninUserDto) {
    const result = {
      success: true,
      message: '',
    };

    try {
      const { username, password } = body;

      const status = await this.userModel.findOne({ username, password });
      if (status.username) {
        result.message = 'Signin successful';
      } else {
        result.success = false;
        result.message = 'Invalid credentials';
      }
    } catch (error) {
      console.error('Error: ', error);
      result.success = false;
      result.message = 'Unable to signin at the momement!';
    }

    return result;
  }

  async fetchOrders(body: any) {
    const result = {
      success: true,
      message: '',
      data: [],
    };

    try {
      const ordersQuery = this.orderModel.find({});

      ordersQuery.limit(25);
      ordersQuery.sort({ createdAt: -1 });

      if (body.pageNo - 1) {
        ordersQuery.skip(body.pageNo * 25);
      }

      if (body?.search?.length) {
        ordersQuery.where({
          $or: [
            { mobileNumber: { $regex: body.search, $options: 'i' } },
            { name: { $regex: body.search, $options: 'i' } },
          ],
        });
      }

      const orders = await ordersQuery;
      result.data = orders;
    } catch (error) {
      console.log(error);
      result.success = false;
      result.message = 'Unable to process at the moment!';
    }

    return result;
  }

  async fetchSingleOrder(body: any) {
    const result = {
      success: true,
      message: '',
      data: {},
    };

    try {
      const order = await this.orderModel.findById({ _id: body.orderId });
      result.data = order;
    } catch (error) {
      console.log(error);
      result.success = false;
      result.message = 'Unable to process at the moment!';
    }

    return result;
  }

  async placeOrder(body: CheckoutOrder) {
    const result = {
      success: true,
      message: '',
    };

    try {
      const insertion = await new this.orderModel({
        mobileNumber: body.mobileNumber,
        items: body.items,
        total: body.total,
        status: 1,
        name: body.name,
      }).save();
      result.message = 'Order placed successfully';
      console.log('Insertion response', insertion);
    } catch (error) {
      console.log(error);
      result.message = 'Unable to process at the moment!';
      result.success = false;
    }

    return result;
  }
  async updateOrderDetails(body: any) {
    const result = {
      success: true,
      message: '',
    };

    try {
      const updation = await this.orderModel.updateOne(
        { _id: body.orderId },
        { status: body.status },
      );
      result.message = 'Order updated successfully';
      console.log('updation response', updation);
    } catch (error) {
      console.log(error);
      result.message = 'Unable to process at the moment!';
      result.success = false;
    }

    return result;
  }
}
