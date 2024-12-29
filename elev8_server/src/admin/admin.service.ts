import { AddCategoryDto } from './../dtos/AddCategory.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { Model } from 'mongoose';
import { AddCigarsDto } from 'src/dtos/AddCigars.dto';
import { Category } from 'src/schemas/Categories.schema';
import { Item } from 'src/schemas/Items.schema';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
    @InjectModel(Item.name) private itemsModel: Model<Item>,
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
      result.message = 'Unable to process at the movement!';
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
            name: body.name,
            description: body.description,
            price: body.price,
            category: body.category,
            imageUrl: body.imageUrl,
            stock: body.stock,
          },
        ]);
      } else {
        await this.itemsModel.updateOne(
          { _id: body.itemId },
          {
            name: body.name,
            description: body.description,
            price: body.price,
            category: body.category,
            imageUrl: body.imageUrl,
            stock: body.stock,
          },
          { upsert: true },
        );
      }
      console.log('Updated in DB');
      result.message = 'Items updated successfully';
    } catch (error) {
      console.error('Error: ', error);
      result.success = false;
      result.message = 'Unable to process at the movement!';
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
      result.message = 'Unable to process at the movement!';
    }
    return result;
  }

  // fetch cigars
  async fetchCigars() {
    const result = {
      success: true,
      message: '',
      data: [],
    };

    try {
      result.data = (await this.itemsModel.find()) as any;
      result.message = 'Items fetched successfully';
    } catch (error) {
      console.error('Error: ', error);
      result.success = false;
      result.message = 'Unable to process at the movement!';
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
        result.message = 'Unable to process at the movement!';
      }
    } catch (error) {
      console.log('Error: ', error);
      result.success = false;
      result.message = 'Unable to process at the movement!';
    }
    return result;
  }
}
