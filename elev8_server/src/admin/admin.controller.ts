import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Request } from 'express';
import { AddCategoryDto } from 'src/dtos/AddCategory.dto';
import { AddCigarsDto } from 'src/dtos/AddCigars.dto';
import { UploadsService } from 'src/uploads/uploads.service';
import { UploadImageDto } from 'src/dtos/UploadImage.dto';
import { itemCategory } from 'src/dtos/itemCategory.dto';

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

  @Get('fetch-categories')
  fetchCategories() {
    return this.adminService.fetchCategories();
  }

  @Post('fetch-items')
  fetchCigars(@Body() body: itemCategory){
    return this.adminService.fetchCigars(body);
  }

  @Post('generate-upload-url')
  generateUploadUrl(@Body() body: UploadImageDto) {
    return this.uploadsService.getPresignedUrl(body.fileName, body.fileType);
  }
}
