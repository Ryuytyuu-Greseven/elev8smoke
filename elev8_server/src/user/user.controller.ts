import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AdminService } from '../admin/admin.service';
import { UploadsService } from '../uploads/uploads.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly adminService: AdminService,
    private uploadService: UploadsService,
  ) {}

  @Post('fetch-single-item')
  fetchSingleItem(@Body() body: any) {
    return this.adminService.fetchSingleItem(body);
  }

  @Get('file/:path')
  fetchAllItems(@Param('path') path: string) {
    return this.uploadService.generatePresignedDownloadUrl(path);
  }
}
