import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ApiService } from '../api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAdminRoute: boolean = false;

  subscription!: Subscription;

  constructor(public router: Router, private apiService: ApiService) {
    this.subscription = this.apiService.userSignin.subscribe((value) => {
      if (value) {
        this.isAdminRoute = true;
      } else {
        this.isAdminRoute = false;
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
  }

  private checkAdminRoute(url: string): void {
    // Update isAdminRoute based on the current URL
    this.isAdminRoute = url.includes('/admin');
    console.log(this.isAdminRoute, 'isAdminRoute for URL:', url); // Debugging output
  }

  signout() {
    sessionStorage.clear();
    this.apiService.userSignin.next(false);
    this.router.navigate(['/admin']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
