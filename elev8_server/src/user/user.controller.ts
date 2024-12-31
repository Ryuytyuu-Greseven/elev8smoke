import { Body, Controller, Post } from '@nestjs/common';
import { AdminService } from '../admin/admin.service';

@Controller('user')
export class UserController {
  constructor(private readonly adminService: AdminService) {}

  @Post('fetch-single-item')
  fetchSingleItem(@Body() body: any) {
    return this.adminService.fetchSingleItem(body);
  }
}
