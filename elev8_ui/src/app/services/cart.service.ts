import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  _id: string;
  productname: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItems.asObservable();

  constructor() {
    // Load cart items from localStorage on service initialization
    const savedCart = localStorage.getItem('cart-elev8');
    if (savedCart) {
      this.cartItems.next(JSON.parse(savedCart));
    }
  }

  addToCart(item: any) {
    const currentItems = this.cartItems.value;
    const existingItem = currentItems.find(i => i._id === item._id);

    if (existingItem) {
      existingItem.quantity += 1;
      this.cartItems.next([...currentItems]);
    } else {
      this.cartItems.next([...currentItems, { ...item, quantity: 1 }]);
    }

    // Save to localStorage
    this.saveToLocalStorage();
  }

  removeFromCart(itemId: string) {
    const currentItems = this.cartItems.value;
    const updatedItems = currentItems.filter(item => item._id !== itemId);
    this.cartItems.next(updatedItems);
    this.saveToLocalStorage();
  }

  updateQuantity(itemId: string, quantity: number) {
    const currentItems = this.cartItems.value;
    const updatedItems = currentItems.map(item => {
      if (item._id === itemId) {
        return { ...item, quantity };
      }
      return item;
    });
    this.cartItems.next(updatedItems);
    this.saveToLocalStorage();
  }

  clearCart() {
    this.cartItems.next([]);
    this.saveToLocalStorage();
  }

  getTotal(): number {
    return this.cartItems.value.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  private saveToLocalStorage() {
    localStorage.setItem('cart-elev8', JSON.stringify(this.cartItems.value));
  }
}
