import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-view-cigars',
  templateUrl: './view-cigars.component.html',
  styleUrls: ['./view-cigars.component.css'],
})
export class ViewCigarsComponent implements OnInit, OnChanges {
  searchQuery: string = '';
  sortBy: string = 'mostViewed';
  filteredCigars: any[] = [];
  itemCategory = 'cigar';

  ogItems: any[] = [];

  @Input() category = '';

  adminLoggedIn = false;

  constructor(
    private apiService: ApiService,
    private Router: Router,
    private cartService: CartService
  ) {}

  ngOnInit() {
    console.log(this.Router.url, 'url');

    if(sessionStorage.getItem('elev8@user')){
      this.adminLoggedIn = true;
    }

    if (this.Router.url === '/viewcigars') {
      this.itemCategory = 'cigar';
    } else if (this.Router.url === '/viewvapes') {
      this.itemCategory = 'vape';
    } else if (this.Router.url === '/viewhumidors') {
      this.itemCategory = 'humidor';
    } else if (this.Router.url === '/viewaccess') {
      this.itemCategory = 'accessories';
    } else if (this.Router.url === '/viewtobacco') {
      this.itemCategory = 'tobacco';
    } else if (this.Router.url === '/viewhookah') {
      this.itemCategory = 'hookah';
    }
    this.fetchItems({ category: this.itemCategory });
  }

  // using for the list for admin
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['category'].currentValue) {
      switch (changes['category'].currentValue) {
        case 'cigars':
          this.itemCategory = 'cigar';
          break;
        case 'vapes':
          this.itemCategory = 'vape';
          break;
        case 'humidors':
          this.itemCategory = 'humidor';
          break;

        case 'tobaco':
          this.itemCategory = 'tobacco';
          break;

        case 'accessories':
          this.itemCategory = 'accessories';
          break;

        case 'hookah':
          this.itemCategory = 'hookah';
          break;
      }
      this.fetchItems({ category: this.itemCategory });
    }
  }

  filterCigars() {
    let result = [...this.ogItems];

    // Search filter
    if (this.searchQuery) {
      result = result.filter((cigar) =>
        cigar.productname.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }

    // Sorting
    if (this.sortBy === 'priceLowHigh') {
      result = result.sort((a, b) => a.price - b.price);
    } else if (this.sortBy === 'priceHighLow') {
      result = result.sort((a, b) => b.price - a.price);
    } else if (this.sortBy === 'mostViewed') {
      result = result.sort((a, b) => b.views - a.views);
    }

    this.filteredCigars = result;
  }

  filterCategory() {
    let result = [...this.ogItems];

    result = result.filter(
      (cigar) =>
        cigar.category.toLowerCase() === this.itemCategory.toLowerCase()
    );

    console.log(this.itemCategory, result);
    this.filteredCigars = result;
  }

  logoutput(item: any) {
    console.log(item);
  }

  // fetching cigars or essentials
  fetchItems(body: any) {
    try {
      console.log('Body:', body);
      this.apiService.getItems(body).subscribe({
        next: (response: any) => {
          console.log('All categories fetched', response);
          if (response.success) {
            console.log('All categories fetched', response);
            this.ogItems = response.data;
            this.filterCategory();
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  addToCart(event: any, product: any) {
    event.stopPropagation();
    this.cartService.addToCart(product);
  }
}
