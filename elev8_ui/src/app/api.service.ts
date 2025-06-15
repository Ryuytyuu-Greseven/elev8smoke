import { environment } from './../environments/environement';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  public productData = new Subject<any>();
  currentProduct: any = {};

  signinStatus = sessionStorage.getItem('elev8@user');
  public userSignin = new BehaviorSubject<boolean>(!!this.signinStatus);

  // Method to update product data
  setProduct(data: any) {
    this.currentProduct = data;
    // this.productData.next(data);
  }

  signedUrl = environment.url + '/user/file/';

  requestPost(body: any, url: string) {
    return this.http.post(environment.url + url, body);
  }

  requestGet(url: string) {
    return this.http.get(environment.url + url);
  }

  getCategories() {
    return this.requestGet('/admin/fetch-categories');
  }

  getItems(body: any) {
    return this.requestPost(body, '/admin/fetch-items');
  }

  getSingeItem(body: any) {
    return this.requestPost(body, '/user/fetch-single-item');
  }

  addCigars(body: any) {
    return this.requestPost(body, '/admin/create-items');
  }

  deleteitem(body: any) {
    return this.requestPost(body, '/admin/delete-item');
  }

  deletePromotion(body: any) {
    return this.requestPost(body, '/admin/delete-promotion');
  }

  // Request a pre-signed URL from the backend
  getPresignedUrl(body: any) {
    return this.requestPost(body, '/admin/generate-upload-url');
  }

  // Upload the file to AWS S3 using the pre-signed URL
  uploadFileToS3(url: string, file: File) {
    return this.http.put(url, file, {
      headers: {
        'Content-Type': file.type,
      },
    });
  }

  // fetch file signed url
  fetchSignedUrl(fileName: string) {
    return this.requestGet('/user/file/' + fileName);
  }

  // add promotion
  addPromotions(body: any) {
    return this.requestPost(body, '/admin/add-promotions');
  }

  // fetch all promotions
  getPromotions() {
    return this.requestGet('/admin/fetch-promotions');
  }

  // signin admin
  singInUser(body: any) {
    return this.requestPost(body, '/admin/signin');
  }

  // checkout order
  checkoutOrder(body: any) {
    return this.requestPost(body, '/user/place-order');
  }
}
