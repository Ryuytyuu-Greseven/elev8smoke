import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ApiService } from '../api.service';
import { Subscription } from 'rxjs';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAdminRoute: boolean = false;

  subscription!: Subscription;
  userLoggedIn = false;
  cartItemCount: number = 0;

  constructor(
    public router: Router,
    private apiService: ApiService,
    private cartService: CartService
  ) {
    this.subscription = this.apiService.userSignin.subscribe((value) => {
      if (value) {
        this.userLoggedIn = true;
      } else {
        this.userLoggedIn = false;
      }
    });
  }

  ngOnInit(): void {
    // Check initial route on component load
    this.checkAdminRoute(this.router.url);

    // Subscribe to router events to update isAdminRoute
    this.router.events
      .pipe(
        filter(
          (event: Event): event is NavigationEnd =>
            event instanceof NavigationEnd
        )
      )
      .subscribe((event: NavigationEnd) => {
        this.checkAdminRoute(event.urlAfterRedirects);
      });

    this.checkUserStatus();
    this.subscribeToCartChanges();
  }

  private checkAdminRoute(url: string): void {
    // Update isAdminRoute based on the current URL
    this.isAdminRoute = url.includes('/admin');
    console.log(this.isAdminRoute, 'isAdminRoute for URL:', url); // Debugging output
  }

  checkUserStatus() {
    this.apiService.userSignin.subscribe((status) => {
      this.userLoggedIn = status;
    });
  }

  subscribeToCartChanges() {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItemCount = items.reduce((total, item) => total + item.quantity, 0);
    });
  }

  signout() {
    sessionStorage.clear();
    // this.apiService.userSignin.next(false);
    this.userLoggedIn = false;
    this.router.navigate(['/admin']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
