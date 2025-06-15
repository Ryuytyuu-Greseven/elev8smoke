import { Component, OnInit } from '@angular/core';
import { CartService, CartItem } from '../services/cart.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
  standalone: false,
})
export class ShoppingCartComponent implements OnInit {
  cartItems: CartItem[] = [];
  total: number = 0;

  mobileNumber = '';
  userName = '';

  constructor(
    private cartService: CartService,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.cartService.cartItems$.subscribe((items) => {
      this.cartItems = items;
      this.total = this.cartService.getTotal();
    });
  }

  updateQuantity(item: CartItem, change: number) {
    const newQuantity = item.quantity + change;
    if (newQuantity > 0) {
      this.cartService.updateQuantity(item._id, newQuantity);
    }
  }

  removeItem(itemId: string) {
    this.cartService.removeFromCart(itemId);
  }

  clearCart() {
    this.cartService.clearCart();
  }

  checkOut() {
    if (this.mobileNumber.length > 8 && this.cartItems?.length) {
      const body = {
        mobileNumber: this.mobileNumber,
        name: this.userName,
        total: this.total,
        items: this.cartItems.map((item) => ({
          _id: item._id,
          productname: item.productname,
          price: item.price,
          qty: item.quantity,
          imageUrl: item.imageUrl,
        })),
      };

      this.apiService.checkoutOrder(body).subscribe({
        next: (response: any) => {
          console.log(response);
          if (response.success) {
            alert('Your order is placed! Team will reach to provided number soon!');
          } else {
            alert('Unable to place orders right now!');
          }
        },
        error: (error) => {
          console.log('Error of checkout', error);
        },
      });
    }
  }

  allowOnlyNumbers(event: KeyboardEvent): void {
    const key = event.key;

    // Allow only digits (0-9)
    if (!/^[0-9]$/.test(key)) {
      event.preventDefault();
    }
  }
}
