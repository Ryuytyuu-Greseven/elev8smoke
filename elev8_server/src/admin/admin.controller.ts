import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Request } from 'express';
import { AddCategoryDto } from '../dtos/AddCategory.dto';
import { AddCigarsDto } from '../dtos/AddCigars.dto';
import { UploadsService } from '../uploads/uploads.service';
import { UploadImageDto } from '../dtos/UploadImage.dto';
import { itemCategory } from '../dtos/itemCategory.dto';
import { SigninUserDto } from 'src/dtos/Signin.dto';

@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly uploadsService: UploadsService,
  ) {}

  // creating a category by admin
  @Post('create-category')
  createCategory(@Req() request: Request, @Body() body: AddCategoryDto) {
    return this.adminService.addCategories(request, body);
  }

  @Post('create-items')
  createCigars(@Req() request: Request, @Body() body: AddCigarsDto) {
    return this.adminService.addCigars(request, body);
  }

  @Post('delete-item')
  deleteItem(@Req() request: Request, @Body() body) {
    return this.adminService.deleteItem(request, body);
  }

  @Post('delete-promotion')
  deletePromotion(@Req() request: Request, @Body() body) {
    return this.adminService.deletePromotion(request, body);
  }

  @Get('fetch-categories')
  fetchCategories() {
    return this.adminService.fetchCategories();
  }

  @Post('fetch-items')
  fetchCigars(@Body() body: itemCategory) {
    return this.adminService.fetchCigars(body);
  }

  @Post('generate-upload-url')
  generateUploadUrl(@Body() body: UploadImageDto) {
    return this.uploadsService.getPresignedUrl(body.fileName, body.fileType);
  }

  @Post('add-promotions')
  createPromotion(@Body() body: UploadImageDto) {
    return this.adminService.addPromotions(body);
  }

  @Get('fetch-promotions')
  getPromotions() {
    return this.adminService.fetchPromotions();
  }

  @Post('/signin')
  signinUser(@Body() body: SigninUserDto) {
    return this.adminService.loginUser(body);
  }
}
