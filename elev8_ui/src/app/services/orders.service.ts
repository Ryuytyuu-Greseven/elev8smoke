import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environement';
import { Observable } from 'rxjs';

export interface Order {
  _id: string;
  mobileNumber: string;
  items: {
    _id: string;
    productname: string;
    price: number;
    quantity: number;
    imageUrl: string;
  }[];
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  constructor(private http: HttpClient) {}

  private requestGet(endpoint: string): Observable<any> {
    return this.http.get(`${environment.url}${endpoint}`);
  }

  private requestPost(body: any, endpoint: string): Observable<any> {
    return this.http.post(`${environment.url}${endpoint}`, body);
  }

  getAllOrders(): Observable<any> {
    return this.requestGet('/admin/fetch-orders');
  }

  getOrderDetails(orderId: string): Observable<any> {
    return this.requestPost({ orderId }, '/admin/fetch-order-details');
  }

  updateOrderStatus(orderId: string, status: Order['status']): Observable<any> {
    return this.requestPost({ orderId, status }, '/admin/update-order-status');
  }
}
