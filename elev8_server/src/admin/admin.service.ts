import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminService {
  constructor() {}

  // add categories by admin
  addCategories() {
    return true;
  }

  // add cigars by admin
  addCigars() {
    return true;
  }

  // fetch categories
  fetchCategories() {
    return true;
  }

  // fetch cigars
  fetchCigars() {
    return true;
  }
}
