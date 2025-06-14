import { Component, OnInit } from '@angular/core';
import { CartService, CartItem } from '../services/cart.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
  standalone: false,
})
export class ShoppingCartComponent implements OnInit {
  cartItems: CartItem[] = [];
  total: number = 0;

  mobileNumber= '';

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.cartItems$.subscribe(items => {
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

  checkOut(){
    if(this.mobileNumber.length > 6){

    }
  }
}
