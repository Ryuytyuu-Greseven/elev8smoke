import { Controller, Get, Post } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // creating a category by admin
  @Post('create-category')
  createCategory() {
    return this.adminService.addCategories();
  }

  @Post('create-cigars')
  createCigars() {
    return this.adminService.addCigars();
  }

  @Get('fetch-categories')
  fetchCategories() {
    return this.adminService.fetchCategories();
  }

  @Get('fetch-cigars')
  fetchCigars() {
    return this.adminService.fetchCigars();
  }
}
