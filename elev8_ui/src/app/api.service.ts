import { environment } from './../environments/environement';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

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
}
